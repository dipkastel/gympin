package com.notrika.gympin.domain.finance.settlement;

import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.settlement.enums.SettlementStatus;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.finance.settlement.service.FinanceSettlementUserDepositService;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
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
        //init
        FinanceSettlementUserDepositRequestEntity settlementRequest = financeSettlementUserDepositRepository.getById(param.getId());

        settlementRequest.setSettlementStatus(param.getAccept() ? SettlementStatus.CONFIRMED : SettlementStatus.REJECTED);
        settlementRequest.setDescription(param.getDescription());
        var userFinance = settlementRequest.getFinanceUser();
        BigDecimal lastDeposit = userFinance.getTotalDeposit();
        //subtract from wallet
        if (param.getAccept()) {
            if(userFinance.getTotalDeposit().add(settlementRequest.getAmount()).compareTo(BigDecimal.ZERO)<0)
                throw new LowDepositException();
            var newDeposit = userFinance.getTotalDeposit().add(settlementRequest.getAmount());
            userFinance.setTotalDeposit(newDeposit);
            financeUserRepository.update(userFinance);
        }
        //wallet transaction
        FinanceUserTransactionEntity userTransaction = FinanceUserTransactionEntity.builder()
                .serial(settlementRequest.getSerial())
                .amount(param.getAccept() ? settlementRequest.getAmount():BigDecimal.ZERO)
                .latestBalance(lastDeposit)
                .financeUser(userFinance)
                .transactionStatus(param.getAccept() ? TransactionStatus.COMPLETE : TransactionStatus.CANCEL)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .build();
        financeUserTransactionRepository.add(userTransaction);
        financeSettlementUserDepositRepository.update(settlementRequest);
        return SettlementConvertor.ToDto(settlementRequest);
    }

    @Override
    @Transactional
    public FinanceSettlementUserDepositDto add(@NonNull FinanceSettlementUserDepositParam param) {

        FinanceUserEntity financeUser = financeUserRepository.getById(param.getUserFinanceID());

        ProcessTypeEnum serialType = ProcessTypeEnum.NOT_DEFINE;
        if(financeUser.getUserFinanceType()== UserFinanceType.NON_WITHDRAWABLE_WALLET)
            serialType = ProcessTypeEnum.CASH_OUT_PERSONAL;
        if(financeUser.getUserFinanceType()== UserFinanceType.PERSONAL_WALLET)
            serialType = ProcessTypeEnum.CASH_OUT_PERSONAL;
        if(financeUser.getUserFinanceType()== UserFinanceType.INCOME_WALLET)
            serialType = ProcessTypeEnum.CASH_OUT_PLACE;

        FinanceSerialEntity serial = FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(serialType)
                .build();
        if(financeUserRepository.getById(param.getUserFinanceID()).getTotalDeposit().compareTo(param.getAmount())<0)
            throw new LowDepositException();

        if(financeUser.getUserSettlements().stream().filter(o->!o.isDeleted()).anyMatch(settle->settle.getSettlementStatus()==SettlementStatus.REQUESTED))
            throw new UserHasOpenSettlementRequest();

        financeSerialRepository.add(serial);

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
        throw new FunctionNotAvalable();
    }

    @Override
    public FinanceSettlementUserDepositDto delete(@NonNull FinanceSettlementUserDepositParam param) {
        throw new FunctionNotAvalable();
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
        throw new FunctionNotAvalable();
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
        return entities.stream().filter(o->!o.isDeleted()).map(SettlementConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceSettlementUserDepositDto> convertToDtos(Page<FinanceSettlementUserDepositRequestEntity> entities) {
        return entities.map(SettlementConvertor::ToDto);
    }
}
