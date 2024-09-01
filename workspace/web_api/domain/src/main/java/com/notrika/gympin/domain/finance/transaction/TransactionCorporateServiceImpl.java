package com.notrika.gympin.domain.finance.transaction;

import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.CorporateTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.CorporateTransactionService;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionCorporateServiceImpl extends AbstractBaseService<CorporateTransactionParam, CorporateTransactionDto, CorporateTransactionQuery, FinanceCorporateTransactionEntity> implements CorporateTransactionService {


    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FinanceCorporateTransactionRepository corporatetransactionRepository;
    @Autowired
    CorporateRepository corporateRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    SmsInService smsService;


    @Override
    public CorporateTransactionDto add(@NonNull CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public CorporateTransactionDto update(@NonNull CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public CorporateTransactionDto delete(@NonNull CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public CorporateTransactionDto getById(long id) {
        return null;
    }

    @Override
    public List<CorporateTransactionDto> getByCorporate(Long corporateId) {
        List<CorporateTransactionDto> resultList = new ArrayList<>();
        try {
            resultList.addAll(convertToDtos(corporateRepository.findById(corporateId).get().getFinanceCorporate().getCorporateFinanceTransactions()));
        } catch (Exception e) {
        }
        return resultList;
    }

    @Override
    public List<CorporateTransactionDto> getByPersonel(Long personnelId) {

        List<CorporateTransactionDto> resultList = new ArrayList<>();
        try {
            CorporatePersonnelEntity cp =  corporatePersonnelRepository.getById(personnelId);
            resultList.addAll(convertToDtos(cp.getCorporate().getFinanceCorporate().getCorporateFinanceTransactions()));
        } catch (Exception e) {
        }
        return resultList;
    }

    @Override
    public FinanceCorporateTransactionEntity add(FinanceCorporateTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporateTransactionEntity update(FinanceCorporateTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporateTransactionEntity delete(FinanceCorporateTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporateTransactionEntity getEntityById(long id) {
        return corporatetransactionRepository.getById(id);
    }

    @Override
    public List<FinanceCorporateTransactionEntity> getAll(Pageable pageable) {
        return corporatetransactionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceCorporateTransactionEntity> findAll(Specification<FinanceCorporateTransactionEntity> specification, Pageable pageable) {
        return corporatetransactionRepository.findAll(specification, pageable);
    }

    @Override
    public List<CorporateTransactionDto> convertToDtos(List<FinanceCorporateTransactionEntity> entities) {
        return entities.stream().map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporateTransactionDto> convertToDtos(Page<FinanceCorporateTransactionEntity> entities) {
        return entities.map(p->TransactionConvertor.toDto(p));
    }
}
