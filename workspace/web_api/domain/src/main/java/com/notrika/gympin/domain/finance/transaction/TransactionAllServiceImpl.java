package com.notrika.gympin.domain.finance.transaction;

import com.notrika.gympin.common.finance.transaction.dto.TransactionAllDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionAllParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionAllQuery;
import com.notrika.gympin.common.finance.transaction.service.TransactionAllService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceTransactionBaseRepository;
import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionAllServiceImpl extends AbstractBaseService<TransactionAllParam, TransactionAllDto, TransactionAllQuery, BaseTransactionEntity> implements TransactionAllService {

    @Autowired
    FinanceTransactionBaseRepository financeTransactionBaseRepository;


    @Override
    public TransactionAllDto add(@NonNull TransactionAllParam param) {
        return null;
    }

    @Override
    public TransactionAllDto update(@NonNull TransactionAllParam param) {
        return null;
    }

    @Override
    public TransactionAllDto delete(@NonNull TransactionAllParam param) {
        return null;
    }

    @Override
    public TransactionAllDto getById(long id) {
        return null;
    }

    @Override
    public BaseTransactionEntity add(BaseTransactionEntity entity) {
        return null;
    }

    @Override
    public BaseTransactionEntity update(BaseTransactionEntity entity) {
        return null;
    }

    @Override
    public BaseTransactionEntity delete(BaseTransactionEntity entity) {
        return null;
    }

    @Override
    public BaseTransactionEntity getEntityById(long id) {
        return financeTransactionBaseRepository.getById(id);
    }

    @Override
    public List<BaseTransactionEntity> getAll(Pageable pageable) {
        return financeTransactionBaseRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<BaseTransactionEntity> findAll(Specification<BaseTransactionEntity> specification, Pageable pageable) {
        return financeTransactionBaseRepository.findAll(specification, pageable);
    }

    @Override
    public List<TransactionAllDto> convertToDtos(List<BaseTransactionEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TransactionAllDto> convertToDtos(Page<BaseTransactionEntity> entities) {
        return entities.map(d->TransactionConvertor.toDto(d));
    }
}
