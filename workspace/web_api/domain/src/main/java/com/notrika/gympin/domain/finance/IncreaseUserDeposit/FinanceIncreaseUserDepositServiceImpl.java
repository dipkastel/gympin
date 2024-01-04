package com.notrika.gympin.domain.finance.IncreaseUserDeposit;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.RequestIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.service.FinanceIncreaseUserDepositService;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.transactions.RequestUnderLimit;
import com.notrika.gympin.common.util.exception.transactions.unknownPaymentBuyer;
import com.notrika.gympin.common.util.exception.transactions.unknownPaymentType;
import com.notrika.gympin.common.util.exception.transactions.unsupportedTransactionType;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.finance.gateways.GatewayServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.IncreaseConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceApplicationGatewayRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceIncreaseUserDepositRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseCorporateDepositEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
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
public class FinanceIncreaseUserDepositServiceImpl extends AbstractBaseService<FinanceIncreaseUserDepositParam, FinanceIncreaseUserDepositDto, FinanceIncreaseUserDepositQuery, FinanceIncreaseUserDepositEntity> implements FinanceIncreaseUserDepositService {

    @Autowired
    private FinanceIncreaseUserDepositRepository financeIncreaseUserDepositRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private FinanceSerialRepository financeSerialRepository;

    @Autowired
    private FinanceUserTransactionRepository financeUserTransactionRepository;
    @Autowired
    private FinanceApplicationGatewayRepository financeApplicationGatewayRepository;
    @Autowired
    private GatewayServiceImpl gatewayService;

    @Override
    public List<FinanceIncreaseUserDepositDto> getIncreaseUserDeposits(Long userId) {
        UserEntity user = userService.getEntityById(userId);
        List<FinanceIncreaseUserDepositDto> UserIncreases = user.getUserIncreases().stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList());
        return UserIncreases;
    }

    @Override
    @Transactional
    public FinanceIncreaseUserDepositDto confirmIncreaseRequest(FinanceIncreaseUserDepositParam param) {
        FinanceIncreaseUserDepositEntity increase = financeIncreaseUserDepositRepository.getById(param.getId());
        increase.setDepositStatus(param.getAccept()? DepositStatus.CONFIRMED:DepositStatus.REJECTED);
        var userFinance = increase.getUser().getFinanceUser();
        FinanceUserTransactionEntity userTransaction = FinanceUserTransactionEntity.builder()
                .serial(increase.getSerial())
                .amount(increase.getAmount())
                .description(param.getDescription())
                .latestBalance(userFinance.getTotalDeposit())
                .financeUser(userFinance)
                .transactionStatus(param.getAccept()?TransactionStatus.COMPLETE:TransactionStatus.CANCEL)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .build();
        if(param.getAccept()){
            var newDeposit = userFinance.getTotalDeposit().add(increase.getAmount());
            userFinance.setTotalDeposit(newDeposit);
            increase.getUser().setFinanceUser(userFinance);
        }
        financeUserTransactionRepository.add(userTransaction);
        financeIncreaseUserDepositRepository.update(increase);
        return IncreaseConvertor.ToDto(increase);
    }

    @Override
    public String requestIncreaseUserDeposits(RequestIncreaseUserDepositParam param) {

        String result = null;
        if (param.getGatewayApplication() == null)
            throw new unknownPaymentType();
        if (param.getGatewayApplication().getId() == null)
            throw new unsupportedTransactionType();
        if (param.getAmount() == null)
            throw new RequestUnderLimit();
        if (param.getAmount().compareTo(BigDecimal.valueOf(100))<1)
            throw new RequestUnderLimit();
        if (param.getUserId() == null)
            throw new unknownPaymentBuyer();
        if (param.getApplication() == null)
            throw new unknownPaymentType();



        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build());
        UserEntity user = userService.getEntityById(param.getUserId());
        FinanceApplicationGatewayEntity applicationGateway = financeApplicationGatewayRepository.getById(param.getGatewayApplication().getId());

        var request =new FinanceIncreaseUserDepositEntity();
        request.setUser(user);
        request.setAmount(param.getAmount());
        request.setSerial(serial);
        request.setDescription(param.getDescription());
        request.setGatewayType(applicationGateway.getGateway().getGatewayType());
        switch (applicationGateway.getGateway().getGatewayType()){
            case BANK_PORTAL:
                var bankStaff = gatewayService.generateBankStaff(applicationGateway,param.getApplication(),param.getAmount(),serial);
                request.setRefrence(bankStaff.getReference());
                request.setDepositStatus(DepositStatus.BANK_PENDING);
                result = bankStaff.getUrl();
                break;
            case CHEQUE:
                request.setRefrence(GeneralUtil.GetPaymentDescription(applicationGateway.getGateway().getGatewayType(),param.getTransactionReference(),param.getChequeDate()));
                request.setDepositStatus(DepositStatus.REQUESTED);
                result = serial.getSerial().split("-")[0];
                break;
            case BANK_TRANSFER:
                request.setRefrence(GeneralUtil.GetPaymentDescription(applicationGateway.getGateway().getGatewayType(),param.getTransactionReference(),param.getChequeDate()));
                request.setDepositStatus(DepositStatus.REQUESTED);
                result = serial.getSerial().split("-")[0];
                break;
            case CARD_TRANSFER:
                request.setRefrence(GeneralUtil.GetPaymentDescription(applicationGateway.getGateway().getGatewayType(),param.getTransactionReference(),param.getChequeDate()));
                request.setDepositStatus(DepositStatus.REQUESTED);
                result = serial.getSerial().split("-")[0];
                break;
        }
        add(request);

        return result;
    }

    @Override
    public FinanceIncreaseUserDepositDto add(@NonNull FinanceIncreaseUserDepositParam param) {
        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build());
        UserEntity user = userService.getEntityById(param.getUserID());
        var increaseUserDeposit = add(FinanceIncreaseUserDepositEntity.builder()
                .user(user)
                .amount(param.getAmount())
                .serial(serial)
                .gatewayType(GatewayType.ADMIN_PANEL)
                .depositStatus(DepositStatus.REQUESTED)
                .build());
        return IncreaseConvertor.ToDto(increaseUserDeposit);
    }

    @Override
    public FinanceIncreaseUserDepositDto update(@NonNull FinanceIncreaseUserDepositParam param) {
        return null;
    }

    @Override
    public FinanceIncreaseUserDepositDto delete(@NonNull FinanceIncreaseUserDepositParam param) {
        return null;
    }

    @Override
    public FinanceIncreaseUserDepositDto getById(long id) {
        return IncreaseConvertor.ToDto(financeIncreaseUserDepositRepository.getById(id));
    }

    @Override
    public FinanceIncreaseUserDepositEntity add(FinanceIncreaseUserDepositEntity entity) {
        return financeIncreaseUserDepositRepository.add(entity);
    }

    @Override
    public FinanceIncreaseUserDepositEntity update(FinanceIncreaseUserDepositEntity entity) {
        return financeIncreaseUserDepositRepository.update(entity);
    }

    @Override
    public FinanceIncreaseUserDepositEntity delete(FinanceIncreaseUserDepositEntity entity) {
        return null;
    }

    @Override
    public FinanceIncreaseUserDepositEntity getEntityById(long id) {
        return financeIncreaseUserDepositRepository.getById(id);
    }

    @Override
    public List<FinanceIncreaseUserDepositEntity> getAll(Pageable pageable) {
        return financeIncreaseUserDepositRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceIncreaseUserDepositEntity> findAll(Specification<FinanceIncreaseUserDepositEntity> specification, Pageable pageable) {
        return financeIncreaseUserDepositRepository.findAll(specification, pageable);
    }

    @Override
    public List<FinanceIncreaseUserDepositDto> convertToDtos(List<FinanceIncreaseUserDepositEntity> entities) {
        return entities.stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceIncreaseUserDepositDto> convertToDtos(Page<FinanceIncreaseUserDepositEntity> entities) {
        return entities.map(IncreaseConvertor::ToDto);
    }
}
