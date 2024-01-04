package com.notrika.gympin.domain.finance.settlement;

import com.notrika.gympin.common.finance.settlement.enums.SettlementStatus;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.finance.settlement.service.FinanceSettlementUserDepositService;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.exception.corporate.LowCreditException;
import com.notrika.gympin.common.util.exception.user.LowDepositException;
import com.notrika.gympin.common.util.exception.user.UserHasOpenSettlementRequest;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.SettlementConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSettlementUserDepositRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.settlement.FinanceSettlementUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
public class FinanceSettlementUserDepositServiceImpl extends AbstractBaseService<FinanceSettlementUserDepositParam, FinanceSettlementUserDepositDto, FinanceSettlementUserDepositQuery, FinanceSettlementUserDepositEntity> implements FinanceSettlementUserDepositService {

    @Autowired
    private FinanceSettlementUserDepositRepository financeSettlementUserDepositRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private FinanceSerialRepository financeSerialRepository;

    @Autowired
    private FinanceUserTransactionRepository financeUserTransactionRepository;


    @Override
    public List<FinanceSettlementUserDepositDto> getSettlementUserDeposits(Long userId) {
        UserEntity user = userService.getEntityById(userId);
        List<FinanceSettlementUserDepositDto> UserSettlements = user.getUserSettlements().stream().map(SettlementConvertor::ToDto).collect(Collectors.toList());
        return UserSettlements;
    }

    @Override
    @Transactional
    public FinanceSettlementUserDepositDto confirmSettlementRequest(FinanceSettlementUserDepositParam param) {
        FinanceSettlementUserDepositEntity Settlement = financeSettlementUserDepositRepository.getById(param.getId());
        Settlement.setSettlementStatus(param.getAccept() ? SettlementStatus.CONFIRMED : SettlementStatus.REJECTED);
        var userFinance = Settlement.getUser().getFinanceUser();
        FinanceUserTransactionEntity userTransaction = FinanceUserTransactionEntity.builder()
                .serial(Settlement.getSerial())
                .amount(Settlement.getAmount())
                .description(param.getDescription())
                .latestBalance(userFinance.getTotalDeposit())
                .financeUser(userFinance)
                .transactionStatus(param.getAccept() ? TransactionStatus.COMPLETE : TransactionStatus.CANCEL)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .build();
        if (param.getAccept()) {
            if(userFinance.getTotalDeposit().add(Settlement.getAmount()).compareTo(BigDecimal.ZERO)<0)
                throw new LowDepositException();
            var newDeposit = userFinance.getTotalDeposit().add(Settlement.getAmount());
            userFinance.setTotalDeposit(newDeposit);
            Settlement.getUser().setFinanceUser(userFinance);
        }
        financeUserTransactionRepository.add(userTransaction);
        financeSettlementUserDepositRepository.update(Settlement);
        return SettlementConvertor.ToDto(Settlement);
    }

    @Override
    @Transactional
    public FinanceSettlementUserDepositDto add(@NonNull FinanceSettlementUserDepositParam param) {
        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build());
        UserEntity user = userService.getEntityById(param.getUserID());
        if(user.getFinanceUser().getTotalDeposit().compareTo(param.getAmount())<0)
            throw new LowDepositException();

        if(user.getUserSettlements().stream().anyMatch(settle->settle.getSettlementStatus()==SettlementStatus.REQUESTED))
            throw new UserHasOpenSettlementRequest();

        var settlementUserDeposit = add(FinanceSettlementUserDepositEntity.builder()
                .user(user)
                .amount(param.getAmount().negate())
                .serial(serial)
                .settlementStatus(SettlementStatus.REQUESTED)
                .build());
        return SettlementConvertor.ToDto(settlementUserDeposit);
    }

    @Override
    public FinanceSettlementUserDepositDto update(@NonNull FinanceSettlementUserDepositParam param) {
        return null;
    }

    @Override
    public FinanceSettlementUserDepositDto delete(@NonNull FinanceSettlementUserDepositParam param) {
        return null;
    }

    @Override
    public FinanceSettlementUserDepositDto getById(long id) {
        return SettlementConvertor.ToDto(financeSettlementUserDepositRepository.getById(id));
    }

    @Override
    public FinanceSettlementUserDepositEntity add(FinanceSettlementUserDepositEntity entity) {
        return financeSettlementUserDepositRepository.add(entity);
    }

    @Override
    public FinanceSettlementUserDepositEntity update(FinanceSettlementUserDepositEntity entity) {
        return financeSettlementUserDepositRepository.update(entity);
    }

    @Override
    public FinanceSettlementUserDepositEntity delete(FinanceSettlementUserDepositEntity entity) {
        return null;
    }

    @Override
    public FinanceSettlementUserDepositEntity getEntityById(long id) {
        return financeSettlementUserDepositRepository.getById(id);
    }

    @Override
    public List<FinanceSettlementUserDepositEntity> getAll(Pageable pageable) {
        return financeSettlementUserDepositRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceSettlementUserDepositEntity> findAll(Specification<FinanceSettlementUserDepositEntity> specification, Pageable pageable) {
        return financeSettlementUserDepositRepository.findAll(specification, pageable);
    }

    @Override
    public List<FinanceSettlementUserDepositDto> convertToDtos(List<FinanceSettlementUserDepositEntity> entities) {
        return entities.stream().map(SettlementConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceSettlementUserDepositDto> convertToDtos(Page<FinanceSettlementUserDepositEntity> entities) {
        return entities.map(SettlementConvertor::ToDto);
    }
}
