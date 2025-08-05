package com.notrika.gympin.domain.finance.Invoice;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceExtraDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceExtraParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceExtraQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceExtraService;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.InvoiceConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceExtraItemRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlacePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.BuyableRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceExtraItemEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceExtraServiceImpl extends AbstractBaseService<InvoiceExtraParam, InvoiceExtraDto, InvoiceExtraQuery, InvoiceExtraItemEntity> implements InvoiceExtraService {

    @Autowired
    UserService userService;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    BuyableRepository buyableRepository;

    @Autowired
    FinanceSerialRepository serialRepository;

    @Autowired
    InvoiceServiceHelper invoiceServiceHelper;

    @Autowired
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    PlacePersonnelRepository placePersonnelRepository;

    @Autowired
    TicketSubscribeRepository ticketSubscribeRepository;

    @Autowired
    InvoiceExtraItemRepository invoiceExtraItemRepository;

    @Autowired
    InvoiceSubscribeRepository invoiceSubscribeRepository;

    @Override
    public InvoiceExtraDto add(@NonNull InvoiceExtraParam param) {

        PlaceEntity place = placeRepository.getById(param.getPlace().getId());
        InvoiceEntity invoice = invoiceRepository.getById(param.getInvoice().getId());


        InvoiceExtraItemEntity invoiceExtra = add(InvoiceExtraItemEntity.builder()
                .name(param.getName())
                .beneficiary((PlacePersonnelEntity) place.getPlaceOwners().stream().filter(pp -> !((PlacePersonnelEntity) pp).isDeleted()).findFirst().get())
                .count(param.getCount())
                .description(param.getDescription())
                .placePrice(param.getPlacePrice())
                .unitPrice(param.getUnitPrice())
                .place(place)
                .invoice(invoice)
                .build());

        invoiceServiceHelper.updateInvoicePrice(invoiceExtra.getInvoice());

        return InvoiceConvertor.toDto(invoiceExtra);
    }

    @Override
    public InvoiceExtraDto update(@NonNull InvoiceExtraParam param) {

        InvoiceExtraItemEntity invoiceExtra = invoiceExtraItemRepository.getById(param.getId());
        invoiceExtra.setCount(param.getCount());
        invoiceExtra.setDescription(param.getDescription());
        invoiceExtra.setName(param.getName());
        invoiceExtra.setPlacePrice(param.getPlacePrice());
        invoiceExtra.setUnitPrice(param.getUnitPrice());

        invoiceExtraItemRepository.update(invoiceExtra);
        invoiceServiceHelper.updateInvoicePrice(invoiceExtra.getInvoice());

        return InvoiceConvertor.toDto(invoiceExtra);
    }

    @Override
    public InvoiceExtraDto delete(@NonNull InvoiceExtraParam param) {
        InvoiceExtraItemEntity invoiceExtra = invoiceExtraItemRepository.getById(param.getId());
        return InvoiceConvertor.toDto(delete(invoiceExtra));
    }

    @Override
    public InvoiceExtraDto getById(long id) {
        var invoiceExtra = invoiceExtraItemRepository.getById(id);
        return InvoiceConvertor.toDto(invoiceExtra);
    }

    @Override
    public InvoiceExtraItemEntity add(InvoiceExtraItemEntity entity) {
        return invoiceExtraItemRepository.add(entity);
    }

    @Override
    public InvoiceExtraItemEntity update(InvoiceExtraItemEntity entity) {
        return invoiceExtraItemRepository.update(entity);
    }

    @Override
    public InvoiceExtraItemEntity delete(InvoiceExtraItemEntity entity) {
        return invoiceExtraItemRepository.deleteById2(entity);
    }

    @Override
    public InvoiceExtraItemEntity getEntityById(long id) {
        return invoiceExtraItemRepository.getById(id);
    }


    @Override
    public List<InvoiceExtraItemEntity> getAll(Pageable pageable) {
        return invoiceExtraItemRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<InvoiceExtraItemEntity> findAll(Specification<InvoiceExtraItemEntity> specification, Pageable pageable) {
        return invoiceExtraItemRepository.findAll(specification, pageable);
    }

    @Override
    public List<InvoiceExtraDto> convertToDtos(List<InvoiceExtraItemEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<InvoiceExtraDto> convertToDtos(Page<InvoiceExtraItemEntity> entities) {
        return entities.map(InvoiceConvertor::toDto);
    }

}
