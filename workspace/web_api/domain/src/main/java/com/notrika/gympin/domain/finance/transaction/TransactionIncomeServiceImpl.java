package com.notrika.gympin.domain.finance.transaction;

import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.IncomeTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.IncomeTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.IncomeTransactionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceIncomeTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionIncomeServiceImpl extends AbstractBaseService<IncomeTransactionParam, IncomeTransactionDto, IncomeTransactionQuery, FinanceIncomeTransactionEntity> implements IncomeTransactionService {


    @Autowired
    FinanceIncomeTransactionRepository financeIncomeTransactionRepository;


    @Override
    public IncomeTransactionDto add(@NonNull IncomeTransactionParam param) {
        return null;
    }

    @Override
    public IncomeTransactionDto update(@NonNull IncomeTransactionParam param) {
        return null;
    }

    @Override
    public IncomeTransactionDto delete(@NonNull IncomeTransactionParam param) {
        return null;
    }

    @Override
    public IncomeTransactionDto getById(long id) {
        return null;
    }

    @Override
    public FinanceIncomeTransactionEntity add(FinanceIncomeTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceIncomeTransactionEntity update(FinanceIncomeTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceIncomeTransactionEntity delete(FinanceIncomeTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceIncomeTransactionEntity getEntityById(long id) {
        return financeIncomeTransactionRepository.getById(id);
    }

    @Override
    public List<FinanceIncomeTransactionEntity> getAll(Pageable pageable) {
        return financeIncomeTransactionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceIncomeTransactionEntity> findAll(Specification<FinanceIncomeTransactionEntity> specification, Pageable pageable) {
        return financeIncomeTransactionRepository.findAll(specification,pageable);
    }

    @Override
    public List<IncomeTransactionDto> convertToDtos(List<FinanceIncomeTransactionEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<IncomeTransactionDto> convertToDtos(Page<FinanceIncomeTransactionEntity> entities) {
        return entities.map(TransactionConvertor::toDto);
    }
}
