package com.notrika.gympin.domain.finance.Invoice;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.enums.UserCheckoutTypes;
import com.notrika.gympin.common.finance.invoice.param.CheckoutDetailParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceService;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.purchased.GenderIsNotCompatible;
import com.notrika.gympin.common.util.exception.purchased.IsAlreadyPayedException;
import com.notrika.gympin.common.util.exception.purchased.PriceConflictException;
import com.notrika.gympin.common.util.exception.purchased.PriceTotalConflictException;
import com.notrika.gympin.common.util.exception.transactions.*;
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
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.CannotProceedException;
import java.math.BigDecimal;
import java.util.ArrayList;
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
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    UserService userService;

    @Autowired
    InvoiceServiceHelper helper;

    @Override
    public InvoiceDto add(@NonNull InvoiceParam invoiceParam) {
        var user = userRepository.getById(invoiceParam.getUser().getId());
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_CHECKOUT_BASKET)
                .build());
        helper.CancellAllDrafts(invoiceParam.getUser().getId());
        InvoiceEntity invoice = helper.AddNewInvoice(user, serial);
        return InvoiceConvertor.toDto(invoice);
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
        helper.updateInvoicePrice(invoice);
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
        return entities.stream().filter(o->!o.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<InvoiceDto> convertToDtos(Page<InvoiceEntity> entities) {
        return entities.map(InvoiceConvertor::toDto);
    }

    @Override
    public InvoiceDto changeStatus(InvoiceParam param) {
        InvoiceEntity invoice = invoiceRepository.getById(param.getId());
        if(invoice.getStatus()==InvoiceStatus.COMPLETED)
            throw new CannotChangeCompletedInvoicesException();
        if(param.getStatus()==InvoiceStatus.COMPLETED)
            throw new CannotChangeToCompletedInvoicesException();
        if(param.getStatus()==InvoiceStatus.DRAFT){
            var lastDraft = invoice.getUser().getInvoices().stream().filter(in->in.getStatus()==InvoiceStatus.DRAFT&&!in.isDeleted()).findAny().orElse(null);
            if (lastDraft!=null)
                throw new UserHasOpenBasketException();
        }
        String note = "تغییر وضعیت از " + invoice.getStatus() + " به " + param.getStatus();
        invoice.setStatus(param.getStatus());
        helper.addNote(invoice, note);
        return InvoiceConvertor.toDto(invoiceRepository.update(invoice));
    }

    @Override
    public InvoiceDto changeInvoiceBuyableCount(InvoiceBuyableParam param) {
        InvoiceBuyableEntity invoiceBuyable = invoiceBuyableRepository.getById(param.getId());
        var note = "تغییر تعداد آیتم " + invoiceBuyable.getName() + " از " + invoiceBuyable.getCount() + " به " + param.getCount();
        invoiceBuyable.setCount(param.getCount());
        invoiceBuyableRepository.update(invoiceBuyable);
        helper.updateInvoicePrice(invoiceBuyable.getInvoice());
        helper.addNote(invoiceBuyable.getInvoice(), note);
        return InvoiceConvertor.toDto(invoiceBuyable.getInvoice());
    }

    @Override
    @Transactional
    public InvoiceDto addBuyable(InvoiceBuyableParam param) {

        BuyableEntity buyable = buyableRepository.getById(param.getBuyable().getId());
        InvoiceEntity invoice = helper.getUserBasket(param.getInvoice());


        //if buyable exist add +1
        InvoiceBuyableEntity userBuyable = null;
        try {
            userBuyable = invoice.getInvoiceBuyables().stream().filter(b -> b.getBuyable().getId().equals(buyable.getId()) && !b.isDeleted()).findFirst().orElse(null);
            if (userBuyable != null) {
                userBuyable.setCount((short) (userBuyable.getCount() + param.getCount()));
                var resultInvoice = invoiceBuyableRepository.update(userBuyable).getInvoice();
                helper.updateInvoicePrice(resultInvoice, buyable);
                return InvoiceConvertor.toDto(resultInvoice);
            }
        } catch (Exception e) {
        }

        //add buyable to invoice

        var result = helper.addBuyableToInvoice(invoice, buyable, param.getCount());

        //update invoice
        helper.updateInvoicePrice(invoice, buyable);
        helper.addNote(result.getInvoice(), "افزودن آیتم " + result.getName());
        return InvoiceConvertor.toDto(result.getInvoice());
    }

    @Override
    public InvoiceDto deleteBuyable(InvoiceBuyableParam param) {
        InvoiceBuyableEntity invoiceBuyable = invoiceBuyableRepository.getById(param.getId());
        InvoiceEntity entity = invoiceBuyableRepository.deleteById2(invoiceBuyable).getInvoice();
        helper.updateInvoicePrice(entity);
        helper.addNote(invoiceBuyable.getInvoice(), "حذف آیتم " + invoiceBuyable.getName());
        return InvoiceConvertor.toDto(entity);
    }


    @Override
    @Transactional
    public InvoiceDto simpleCheckout(InvoiceCheckoutParam param) throws Exception {
        //init
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());
        UserEntity user = invoice.getUser();
        UserHowToPayDto howToPay = helper.getSimpleHowToPay(invoice);
        //checks
        if (invoice.getStatus() != InvoiceStatus.PROCESSING)
            throw new IsAlreadyPayedException();
        if (invoice.getPriceToPay().compareTo(param.getPrice()) != 0)
            throw new PriceConflictException();
        if(!howToPay.getCreditCovrage())
            throw new RequestOverCreditLimit();
        helper.checkBuyableCanPurchase(invoice.getInvoiceBuyables());

        for (InvoiceBuyableEntity buyable : invoice.getInvoiceBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList())) {
            if (!GeneralUtil.isGenderCompatible(buyable.getGender(), invoice.getUser().getGender()))
                throw new GenderIsNotCompatible();
        }

        if (invoice.getPriceToPay().compareTo(param.getCheckout().stream().filter(o->!o.isDeleted()).map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)) != 0)
            throw new PriceTotalConflictException();

        //calculation
        helper.calculateCheckout(invoice,howToPay,user);

        //change subscribe status and serial
        InvoiceEntity result = helper.createPurchasedItems(invoice);

        helper.sendSms(invoice);
        helper.addNote(invoice, "پرداخت سبد خرید و ایجاد بلیط ها ");
        return InvoiceConvertor.toDto(result);
    }

    @Override
    @Transactional
    public InvoiceDto moderateCheckout(InvoiceCheckoutParam param) throws Exception {
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());
        UserEntity user = invoice.getUser();
        UserHowToPayDto howToPay = helper.getModerateHowToPay(invoice,param);
        //checks
        if (invoice.getStatus() != InvoiceStatus.PROCESSING)
            throw new IsAlreadyPayedException();
        if (invoice.getPriceToPay().compareTo(param.getPrice()) != 0)
            throw new PriceConflictException();
        if(!howToPay.getCreditCovrage())
            throw new RequestOverCreditLimit();
        helper.checkBuyableCanPurchase(invoice.getInvoiceBuyables());
        for (InvoiceBuyableEntity buyable : invoice.getInvoiceBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList())) {
            if (!GeneralUtil.isGenderCompatible(buyable.getGender(), invoice.getUser().getGender()))
                throw new GenderIsNotCompatible();
        }

        if (invoice.getPriceToPay().compareTo(param.getCheckout().stream().filter(o->!o.isDeleted()).map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)) != 0)
            throw new PriceTotalConflictException();

        //calculation
        helper.calculateCheckout(invoice,howToPay,user);

        //change subscribe status and serial
        InvoiceEntity result = helper.createPurchasedItems(invoice);

        helper.sendSms(invoice);
        helper.addNote(invoice, "پرداخت سبد خرید و ایجاد بلیط ها ");
        return InvoiceConvertor.toDto(result);
    }

    @Override
    @Transactional
    public InvoiceDto advancedCheckout(InvoiceCheckoutParam param) throws Exception {
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());
        UserEntity user = invoice.getUser();
        UserHowToPayDto howToPay = helper.getAdvancedHowToPay(invoice,param);
        //checks
        if (invoice.getStatus() != InvoiceStatus.PROCESSING)
            throw new IsAlreadyPayedException();
        if (invoice.getPriceToPay().compareTo(param.getPrice()) != 0)
            throw new PriceConflictException();
        if(!howToPay.getCreditCovrage())
            throw new RequestOverCreditLimit();
        helper.checkBuyableCanPurchase(invoice.getInvoiceBuyables());
        for (InvoiceBuyableEntity buyable : invoice.getInvoiceBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList())) {
            if (!GeneralUtil.isGenderCompatible(buyable.getGender(), invoice.getUser().getGender()))
                throw new GenderIsNotCompatible();
        }

        if (invoice.getPriceToPay().compareTo(param.getCheckout().stream().filter(o->!o.isDeleted()).map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)) != 0)
            throw new PriceTotalConflictException();

        //calculation
        helper.calculateCheckout(invoice,howToPay,user);

        //change subscribe status and serial
        InvoiceEntity result = helper.createPurchasedItems(invoice);

        helper.sendSms(invoice);
        helper.addNote(invoice, "پرداخت سبد خرید و ایجاد بلیط ها ");
        return InvoiceConvertor.toDto(result);
    }

    @Override
    @Transactional
    public InvoiceDto userCheckout(InvoiceCheckoutParam param) throws Exception {
        changeStatus(InvoiceParam.builder().id(param.getInvoice().getId()).status(InvoiceStatus.PROCESSING).build());
        if (param.getCheckoutType() == UserCheckoutTypes.SIMPLE)
            return simpleCheckout(param);
        if (param.getCheckoutType() == UserCheckoutTypes.MODERATE)
            return moderateCheckout(param);
        if (param.getCheckoutType() == UserCheckoutTypes.ADVANCED)
            return advancedCheckout(param);
        else
            throw new CheckoutHasNotTypeException();

    }

    @Override
    @Transactional
    public UserHowToPayDto getHowToPay(InvoiceCheckoutParam param) {
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());
        return helper.getSimpleHowToPay(invoice);
    }

    @Override
    public InvoiceDto getBasketByUserId(UserParam param) {
        var invoice = invoiceRepository.findByUserIdAndStatusAndDeletedIsFalse(param.getId(),InvoiceStatus.DRAFT).stream().findFirst().orElse(null);
        if(invoice==null)
            return add(InvoiceParam.builder().user(param).build());
        return InvoiceConvertor.toDto(invoice);
    }
}
