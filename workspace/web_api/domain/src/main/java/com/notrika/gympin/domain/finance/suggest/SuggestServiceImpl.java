package com.notrika.gympin.domain.finance.suggest;

import com.notrika.gympin.common.finance.suggest.dto.SuggestDto;
import com.notrika.gympin.common.finance.suggest.param.SuggestParam;
import com.notrika.gympin.common.finance.suggest.query.SuggestQuery;
import com.notrika.gympin.common.finance.suggest.service.SuggestService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SuggestConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.gateway.FinancePaymentSuggestRepository;
import com.notrika.gympin.persistence.entity.finance.gateway.FinancePaymentSuggestEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuggestServiceImpl extends AbstractBaseService<SuggestParam, SuggestDto, SuggestQuery, FinancePaymentSuggestEntity> implements SuggestService {


    @Autowired
    FinancePaymentSuggestRepository financePaymentSuggestRepository;


    @Override
    public SuggestDto add(@NonNull SuggestParam param) {
        FinancePaymentSuggestEntity entity = FinancePaymentSuggestEntity.builder()
                .amount(param.getAmount())
                .application(param.getApplication())
                .priority(param.getPriority())
                .build();
        return SuggestConvertor.ToDto(add(entity));
    }

    @Override
    public SuggestDto update(@NonNull SuggestParam param) {
        FinancePaymentSuggestEntity entity = financePaymentSuggestRepository.getById(param.getId());
        entity.setAmount(param.getAmount());
        entity.setPriority(param.getPriority());
        entity.setApplication(param.getApplication());
        return SuggestConvertor.ToDto(update(entity));
    }

    @Override
    public SuggestDto delete(@NonNull SuggestParam param) {
        FinancePaymentSuggestEntity entity = financePaymentSuggestRepository.getById(param.getId());
        return SuggestConvertor.ToDto(delete(entity));
    }

    @Override
    public SuggestDto getById(long id) {
        return SuggestConvertor.ToDto(financePaymentSuggestRepository.getById(id));
    }

    @Override
    public FinancePaymentSuggestEntity add(FinancePaymentSuggestEntity entity) {
        return financePaymentSuggestRepository.add(entity);
    }

    @Override
    public FinancePaymentSuggestEntity update(FinancePaymentSuggestEntity entity) {
        return financePaymentSuggestRepository.update(entity);
    }

    @Override
    public FinancePaymentSuggestEntity delete(FinancePaymentSuggestEntity entity) {
        return financePaymentSuggestRepository.deleteById2(entity);
    }

    @Override
    public FinancePaymentSuggestEntity getEntityById(long id) {
        return financePaymentSuggestRepository.getById(id);
    }

    @Override
    public List<FinancePaymentSuggestEntity> getAll(Pageable pageable) {
        return financePaymentSuggestRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinancePaymentSuggestEntity> findAll(Specification<FinancePaymentSuggestEntity> specification, Pageable pageable) {
        return financePaymentSuggestRepository.findAll(specification, pageable);
    }

    @Override
    public List<SuggestDto> convertToDtos(List<FinancePaymentSuggestEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(SuggestConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<SuggestDto> convertToDtos(Page<FinancePaymentSuggestEntity> entities) {
        return entities.map(SuggestConvertor::ToDto);
    }

}
