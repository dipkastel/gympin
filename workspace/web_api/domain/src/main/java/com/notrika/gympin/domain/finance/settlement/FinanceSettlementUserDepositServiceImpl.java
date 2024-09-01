package com.notrika.gympin.domain.finance.settlement;

import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.settlement.enums.SettlementStatus;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.finance.settlement.service.FinanceSettlementUserDepositService;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.exception.user.LowDepositException;
import com.notrika.gympin.common.util.exception.user.UserHasOpenSettlementRequest;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.SettlementConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceSettlementUserDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceSettlementUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
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
public class FinanceSettlementUserDepositServiceImpl extends AbstractBaseService<FinanceSettlementUserDepositParam, FinanceSettlementUserDepositDto, FinanceSettlementUserDepositQuery, FinanceSettlementUserDepositRequestEntity> implements FinanceSettlementUserDepositService {

    @Autowired
    private FinanceSettlementUserDepositRequestRepository financeSettlementUserDepositRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private FinanceSerialRepository financeSerialRepository;
    @Autowired
    private FinanceUserRepository financeUserRepository;

    @Autowired
    private FinanceUserTransactionRepository financeUserTransactionRepository;

    @Autowired
    FinanceHelper financeHelper;


    @Override
    public List<FinanceSettlementUserDepositDto> getSettlementUserDeposits(Long userId) {
        List<FinanceSettlementUserDepositRequestEntity> settelmentRequests = financeSettlementUserDepositRepository.getAllUserRequest(userId);
        return convertToDtos(settelmentRequests);
    }

    @Override
    @Transactional
    public FinanceSettlementUserDepositDto confirmSettlementRequest(FinanceSettlementUserDepositParam param) {
        return null;
//        FinanceSettlementUserDepositRequestEntity Settlement = financeSettlementUserDepositRepository.getById(param.getId());
//        Settlement.setSettlementStatus(param.getAccept() ? SettlementStatus.CONFIRMED : SettlementStatus.REJECTED);
//        var userFinance = financeUserRepository.findByUserIdAndDeletedFalse(Settlement.getUser());
//        FinanceUserTransactionEntity userTransaction = FinanceUserTransactionEntity.builder()
//                .serial(Settlement.getSerial())
//                .amount(Settlement.getAmount())
//                .description(param.getDescription())
//                .latestBalance(userFinance.getTotalDeposit())
//                .financeUser(userFinance)
//                .transactionStatus(param.getAccept() ? TransactionStatus.COMPLETE : TransactionStatus.CANCEL)
//                .transactionType(TransactionBaseType.USER)
//                .isChecked(false)
//                .build();
//        if (param.getAccept()) {
//            if(userFinance.getTotalDeposit().add(Settlement.getAmount()).compareTo(BigDecimal.ZERO)<0)
//                throw new LowDepositException();
//            var newDeposit = userFinance.getTotalDeposit().add(Settlement.getAmount());
//            userFinance.setTotalDeposit(newDeposit);
//            financeUserRepository.update(userFinance);
//        }
//        financeUserTransactionRepository.add(userTransaction);
//        financeSettlementUserDepositRepository.update(Settlement);
//        return SettlementConvertor.ToDto(Settlement);
    }

    @Override
    @Transactional
    public FinanceSettlementUserDepositDto add(@NonNull FinanceSettlementUserDepositParam param) {
        //TODO seprate chachouts by wallet on serial
        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.CASH_OUT_PLACE)
                .build());
        FinanceUserEntity financeUser = financeUserRepository.getById(param.getUserFinanceID());
        if(financeUserRepository.getById(param.getUserFinanceID()).getTotalDeposit().compareTo(param.getAmount())<0)
            throw new LowDepositException();

        if(financeUser.getUserSettlements().stream().anyMatch(settle->settle.getSettlementStatus()==SettlementStatus.REQUESTED))
            throw new UserHasOpenSettlementRequest();

        var settlementUserDeposit = add(FinanceSettlementUserDepositRequestEntity.builder()
                .financeUser(financeUser)
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
    public FinanceSettlementUserDepositRequestEntity add(FinanceSettlementUserDepositRequestEntity entity) {
        return financeSettlementUserDepositRepository.add(entity);
    }

    @Override
    public FinanceSettlementUserDepositRequestEntity update(FinanceSettlementUserDepositRequestEntity entity) {
        return financeSettlementUserDepositRepository.update(entity);
    }

    @Override
    public FinanceSettlementUserDepositRequestEntity delete(FinanceSettlementUserDepositRequestEntity entity) {
        return null;
    }

    @Override
    public FinanceSettlementUserDepositRequestEntity getEntityById(long id) {
        return financeSettlementUserDepositRepository.getById(id);
    }

    @Override
    public List<FinanceSettlementUserDepositRequestEntity> getAll(Pageable pageable) {
        return financeSettlementUserDepositRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceSettlementUserDepositRequestEntity> findAll(Specification<FinanceSettlementUserDepositRequestEntity> specification, Pageable pageable) {
        return financeSettlementUserDepositRepository.findAll(specification, pageable);
    }

    @Override
    public List<FinanceSettlementUserDepositDto> convertToDtos(List<FinanceSettlementUserDepositRequestEntity> entities) {
        return entities.stream().map(SettlementConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceSettlementUserDepositDto> convertToDtos(Page<FinanceSettlementUserDepositRequestEntity> entities) {
        return entities.map(SettlementConvertor::ToDto);
    }
}
