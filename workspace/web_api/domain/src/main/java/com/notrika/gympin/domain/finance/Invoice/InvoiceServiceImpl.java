package com.notrika.gympin.domain.finance.Invoice;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.param.CheckoutDetailParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceService;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.purchased.GenderIsNotCompatible;
import com.notrika.gympin.common.util.exception.purchased.IsAlreadyPayedException;
import com.notrika.gympin.common.util.exception.purchased.PriceConflictException;
import com.notrika.gympin.common.util.exception.purchased.PriceTotalConflictException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.InvoiceConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceBuyableRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.BuyableRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl extends AbstractBaseService<InvoiceParam, InvoiceDto, InvoiceQuery, InvoiceEntity> implements InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FinanceSerialRepository serialRepository;

    @Autowired
    InvoiceBuyableRepository invoiceBuyableRepository;

    @Autowired
    BuyableRepository buyableRepository;


    @Autowired
    InvoiceServiceHelper invoiceServiceHelper;

    @Override
    public InvoiceDto add(@NonNull InvoiceParam invoiceParam) {
        var user = userRepository.getById(invoiceParam.getUser().getId());
        var serrial = FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_CHECKOUT_BASKET)
                .build();
        var userDraftInvoices = invoiceRepository.findByUserIdAndStatusAndDeletedIsFalse(invoiceParam.getUser().getId(), InvoiceStatus.DRAFT);
        for (InvoiceEntity invoice : userDraftInvoices) {
            invoice.setStatus(InvoiceStatus.CANCELLED);
        }
        if (userDraftInvoices.size() > 0)
            invoiceRepository.updateAll(userDraftInvoices);
        InvoiceEntity invoice = InvoiceEntity.builder()
                .status(InvoiceStatus.DRAFT)
                .fullName(user.getFullName())
                .user(user)
                .serial(serrial)
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .nationalCode(user.getNationalCode())
                .totalPrice(BigDecimal.ZERO)
                .priceToPay(BigDecimal.ZERO)
                .build();
        return InvoiceConvertor.toDto(add(invoice));
    }

    @Override
    public InvoiceDto update(@NonNull InvoiceParam invoiceParam) {
        InvoiceEntity invoice = invoiceRepository.getById(invoiceParam.getId());
        return InvoiceConvertor.toDto(update(invoice));
    }

    @Override
    public InvoiceDto delete(@NonNull InvoiceParam invoiceParam) {
        InvoiceEntity invoice = invoiceRepository.getById(invoiceParam.getId());
        return InvoiceConvertor.toDto(delete(invoice));
    }

    @Override
    public InvoiceDto getById(long id) {
        var invoice = invoiceRepository.getById(id);
        invoiceServiceHelper.updateInvoicePrice(invoice);
        return InvoiceConvertor.toDto(invoice);
    }

    @Override
    public InvoiceEntity add(InvoiceEntity entity) {
        return invoiceRepository.add(entity);
    }

    @Override
    public InvoiceEntity update(InvoiceEntity entity) {
        return invoiceRepository.update(entity);
    }

    @Override
    public InvoiceEntity delete(InvoiceEntity entity) {
        return invoiceRepository.deleteById2(entity);
    }

    @Override
    public InvoiceEntity getEntityById(long id) {
        return invoiceRepository.getById(id);
    }

    @Override
    public List<InvoiceEntity> getAll(Pageable pageable) {
        return invoiceRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<InvoiceEntity> findAll(Specification<InvoiceEntity> specification, Pageable pageable) {
        return invoiceRepository.findAll(specification, pageable);
    }

    @Override
    public List<InvoiceDto> convertToDtos(List<InvoiceEntity> entities) {
        return entities.stream().map(InvoiceConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<InvoiceDto> convertToDtos(Page<InvoiceEntity> entities) {
        return entities.map(InvoiceConvertor::toDto);
    }

    @Override
    public InvoiceDto changeStatus(InvoiceParam param) {
        InvoiceEntity invoice = invoiceRepository.getById(param.getId());
        String note = "تغییر وضعیت از "+invoice.getStatus()+" به "+param.getStatus();
        invoice.setStatus(param.getStatus());
        invoiceServiceHelper.addNote(invoice,note);
        return InvoiceConvertor.toDto(invoiceRepository.update(invoice));
    }

    @Override
    public InvoiceDto changeInvoiceBuyableCount(InvoiceBuyableParam param) {
        InvoiceBuyableEntity invoiceBuyable = invoiceBuyableRepository.getById(param.getId());
        var note = "تغییر تعداد آیتم "+invoiceBuyable.getName()+" از "+invoiceBuyable.getCount()+" به "+param.getCount();
        invoiceBuyable.setCount(param.getCount());
        invoiceBuyableRepository.update(invoiceBuyable);
        invoiceServiceHelper.updateInvoicePrice(invoiceBuyable.getInvoice());
        invoiceServiceHelper.addNote(invoiceBuyable.getInvoice(),note);
        return InvoiceConvertor.toDto(invoiceBuyable.getInvoice());
    }

    @Override
    @Transactional
    public InvoiceDto addBuyable(InvoiceBuyableParam param) {

        BuyableEntity buyable = buyableRepository.getById(param.getBuyable().getId());
        InvoiceEntity invoice = invoiceServiceHelper.getUserBasket(param.getInvoice());


        //if buyable exist add +1
        InvoiceBuyableEntity userBuyable = null;
        try {
            userBuyable = invoice.getInvoiceBuyables().stream().filter(b-> b.getBuyable().getId().equals(buyable.getId())&&!b.isDeleted()).findFirst().orElse(null);
            if(userBuyable!=null){
                userBuyable.setCount((short)(userBuyable.getCount()+param.getCount()));
                var resultInvoice = invoiceBuyableRepository.update(userBuyable).getInvoice();
                invoiceServiceHelper.updateInvoicePrice(resultInvoice,buyable);
                return InvoiceConvertor.toDto(resultInvoice);
            }
        }catch (Exception e){
        }

        //add buyable to invoice

        var result = invoiceServiceHelper.addBuyableToInvoice(invoice,buyable,param.getCount());

        //update invoice
        invoiceServiceHelper.updateInvoicePrice(invoice,buyable);
        invoiceServiceHelper.addNote(result.getInvoice(),"افزودن آیتم "+result.getName());
        return InvoiceConvertor.toDto(result.getInvoice());
    }

    @Override
    public InvoiceDto deleteBuyable(InvoiceBuyableParam param) {
        InvoiceBuyableEntity invoiceBuyable = invoiceBuyableRepository.getById(param.getId());
        InvoiceEntity entity =invoiceBuyableRepository.deleteById2(invoiceBuyable).getInvoice();
        invoiceServiceHelper.updateInvoicePrice(entity);
        invoiceServiceHelper.addNote(invoiceBuyable.getInvoice(),"حذف آیتم "+invoiceBuyable.getName());
        return InvoiceConvertor.toDto(entity);
    }


    @Override
    @Transactional
    public InvoiceDto checkout(InvoiceCheckoutParam param) throws Exception {
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());

        if (invoice.getStatus() != InvoiceStatus.PROCESSING)
            throw new IsAlreadyPayedException();
        if (invoice.getPriceToPay().compareTo(param.getPrice()) != 0)
            throw new PriceConflictException();
        for(InvoiceBuyableEntity buyable:invoice.getInvoiceBuyables().stream().filter(b->!b.isDeleted()).collect(Collectors.toList())){
            if (!GeneralUtil.isGenderCompatible(buyable.getGender(), invoice.getUser().getGender()))
                throw new GenderIsNotCompatible();
        }
        if (invoice.getPriceToPay().compareTo(param.getCheckout().stream().map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)) != 0)
            throw new PriceTotalConflictException();

        InvoiceEntity result = invoiceServiceHelper.calculateCheckout(invoice,param);

        invoiceServiceHelper.addNote(invoice,"پرداخت سبد خرید و ایجاد بلیط ها ");
        return InvoiceConvertor.toDto(result);
    }

    @Override
    @Transactional
    public InvoiceDto userCheckout(InvoiceCheckoutParam param) throws Exception {
        changeStatus(InvoiceParam.builder().id(param.getInvoice().getId()).status(InvoiceStatus.PROCESSING).build());
        return checkout(param);
    }
}
