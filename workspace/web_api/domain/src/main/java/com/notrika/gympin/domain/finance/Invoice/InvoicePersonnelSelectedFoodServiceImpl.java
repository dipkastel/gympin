package com.notrika.gympin.domain.finance.Invoice;

import com.notrika.gympin.common.finance.invoice.dto.InvoicePersonnelSelectedFoodDto;
import com.notrika.gympin.common.finance.invoice.param.InvoicePersonnelSelectedFoodParam;
import com.notrika.gympin.common.finance.invoice.query.InvoicePersonnelSelectedFoodQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoicePersonnelSelectedFoodService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.InvoiceConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoicePersonnelSelectedFoodsRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.food.TicketFoodMenuRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoicePersonnelSelectedFoodEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoicePersonnelSelectedFoodServiceImpl extends AbstractBaseService<InvoicePersonnelSelectedFoodParam, InvoicePersonnelSelectedFoodDto, InvoicePersonnelSelectedFoodQuery, InvoicePersonnelSelectedFoodEntity> implements InvoicePersonnelSelectedFoodService {

    @Autowired
    InvoicePersonnelSelectedFoodsRepository invoicePersonnelSelectedFoodRepository;

    @Autowired
    TicketFoodMenuRepository ticketFoodMenuRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;


    @Override
    public InvoicePersonnelSelectedFoodDto add(InvoicePersonnelSelectedFoodParam param) {

        InvoicePersonnelSelectedFoodEntity food = invoicePersonnelSelectedFoodRepository.findByPersonnelIdAndFoodMenuIdAndDeletedIsFalse(param.getPersonnelId(), param.getFoodMenuId());
        TicketFoodMenuEntity foodMenu = ticketFoodMenuRepository.getById(param.getFoodMenuId());
        CorporatePersonnelEntity personnel = corporatePersonnelRepository.getById(param.getPersonnelId());
        if (food == null) {
            food = InvoicePersonnelSelectedFoodEntity.builder()
                    .foodMenu(foodMenu)
                    .corporate(personnel.getCorporate())
                    .personnel(personnel)
                    .ordered(false)
                    .count((short) 1)
                    .price(foodMenu.getFoodItem().getPrice())
                    .fullName(personnel.getUser().getFullName())
                    .date(foodMenu.getDate())
                    .build();
            add(food);

        } else {
            food.setCount((short) (food.getCount() + 1));
            update(food);
        }
        return InvoiceConvertor.toDto(food);
    }

    @Override
    public InvoicePersonnelSelectedFoodDto update(@NonNull InvoicePersonnelSelectedFoodParam param) {
        InvoicePersonnelSelectedFoodEntity food = invoicePersonnelSelectedFoodRepository.getById(param.getId());
        food.setDescription(param.getDescription());
        return InvoiceConvertor.toDto(food);
    }

    @Override
    public InvoicePersonnelSelectedFoodDto delete(@NonNull InvoicePersonnelSelectedFoodParam param) {
        InvoicePersonnelSelectedFoodEntity food = invoicePersonnelSelectedFoodRepository.getById(param.getId());
        if(food.getCount()>1){
            food.setCount((short) (food.getCount()-1));
            update(food);
        }else{
            delete(food);
        }
        return InvoiceConvertor.toDto(food);
    }

    @Override
    public InvoicePersonnelSelectedFoodDto getById(long id) {
        var InvoicePersonnelSelectedFood = invoicePersonnelSelectedFoodRepository.getById(id);
        return InvoiceConvertor.toDto(InvoicePersonnelSelectedFood);
    }

    @Override
    public InvoicePersonnelSelectedFoodEntity add(InvoicePersonnelSelectedFoodEntity entity) {
        return invoicePersonnelSelectedFoodRepository.add(entity);
    }

    @Override
    public InvoicePersonnelSelectedFoodEntity update(InvoicePersonnelSelectedFoodEntity entity) {
        return invoicePersonnelSelectedFoodRepository.update(entity);
    }

    @Override
    public InvoicePersonnelSelectedFoodEntity delete(InvoicePersonnelSelectedFoodEntity entity) {
        return invoicePersonnelSelectedFoodRepository.deleteById2(entity);
    }

    @Override
    public InvoicePersonnelSelectedFoodEntity getEntityById(long id) {
        return invoicePersonnelSelectedFoodRepository.getById(id);
    }


    @Override
    public List<InvoicePersonnelSelectedFoodEntity> getAll(Pageable pageable) {
        return invoicePersonnelSelectedFoodRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<InvoicePersonnelSelectedFoodEntity> findAll(Specification<InvoicePersonnelSelectedFoodEntity> specification, Pageable pageable) {
        return invoicePersonnelSelectedFoodRepository.findAll(specification, pageable);
    }

    @Override
    public List<InvoicePersonnelSelectedFoodDto> convertToDtos(List<InvoicePersonnelSelectedFoodEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<InvoicePersonnelSelectedFoodDto> convertToDtos(Page<InvoicePersonnelSelectedFoodEntity> entities) {
        return entities.map(InvoiceConvertor::toDto);
    }

}
