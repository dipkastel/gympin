package com.notrika.gympin.domain.finance.transaction;

import com.notrika.gympin.common.finance.transaction.dto.TransactionPersonnelCreditDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionPersonnelCreditParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionPersonnelCreditQuery;
import com.notrika.gympin.common.finance.transaction.service.TransactionPersonnelCreditService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionPersonnelCreditServiceImpl extends AbstractBaseService<TransactionPersonnelCreditParam, TransactionPersonnelCreditDto, TransactionPersonnelCreditQuery, FinanceCorporatePersonnelCreditTransactionEntity> implements TransactionPersonnelCreditService {


    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;


    @Override
    public TransactionPersonnelCreditDto add(@NonNull TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public TransactionPersonnelCreditDto update(@NonNull TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public TransactionPersonnelCreditDto delete(@NonNull TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public TransactionPersonnelCreditDto getById(long id) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditTransactionEntity add(FinanceCorporatePersonnelCreditTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditTransactionEntity update(FinanceCorporatePersonnelCreditTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditTransactionEntity delete(FinanceCorporatePersonnelCreditTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditTransactionEntity getEntityById(long id) {
        return financeCorporatePersonnelCreditTransactionRepository.getById(id);
    }

    @Override
    public List<FinanceCorporatePersonnelCreditTransactionEntity> getAll(Pageable pageable) {
        return financeCorporatePersonnelCreditTransactionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceCorporatePersonnelCreditTransactionEntity> findAll(Specification<FinanceCorporatePersonnelCreditTransactionEntity> specification, Pageable pageable) {
        return financeCorporatePersonnelCreditTransactionRepository.findAll(specification, pageable);
    }

    @Override
    public List<TransactionPersonnelCreditDto> convertToDtos(List<FinanceCorporatePersonnelCreditTransactionEntity> entities) {
        return entities.stream().map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TransactionPersonnelCreditDto> convertToDtos(Page<FinanceCorporatePersonnelCreditTransactionEntity> entities) {
        return entities.map(p->TransactionConvertor.toDto(p));
    }
}
