package com.notrika.gympin.domain.finance.IncreaseCorporateDeposit;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.query.FinanceIncreaseCorporateDepositQuery;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.service.FinanceIncreaseCorporateDepositService;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.transactions.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.gateways.GatewayServiceImpl;
import com.notrika.gympin.domain.util.convertor.IncreaseConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.gateway.FinanceApplicationGatewayRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseCorporateDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
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
public class FinanceIncreaseCorporateDepositServiceImpl extends AbstractBaseService<FinanceIncreaseCorporateDepositParam, FinanceIncreaseCorporateDepositDto, FinanceIncreaseCorporateDepositQuery, FinanceIncreaseCorporateDepositRequestEntity> implements FinanceIncreaseCorporateDepositService {

    @Autowired
    private FinanceIncreaseCorporateDepositRequestRepository financeIncreaseCorporateDepositRepository;

    @Autowired
    private CorporateServiceImpl corporateService;

    @Autowired
    private FinanceSerialRepository financeSerialRepository;

    @Autowired
    private FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    private FinanceApplicationGatewayRepository financeApplicationGatewayRepository;
    @Autowired
    private GatewayServiceImpl gatewayService;

    @Override
    public FinanceIncreaseCorporateDepositDto add(@NonNull FinanceIncreaseCorporateDepositParam param) {
        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.CASH_IN_ACCOUNT_CHARGE_CORPORATE)
                .build());
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateID());
        var increaseCorporateDeposit = add(FinanceIncreaseCorporateDepositRequestEntity.builder()
                .corporate(corporate)
                .amount(param.getAmount())
                .serial(serial)
                .gatewayType(GatewayType.ADMIN_PANEL)
                .depositStatus(DepositStatus.REQUESTED)
                .build());
        return IncreaseConvertor.ToDto(increaseCorporateDeposit);
    }

    @Override
    public FinanceIncreaseCorporateDepositDto update(@NonNull FinanceIncreaseCorporateDepositParam param) {
        return null;
    }

    @Override
    public FinanceIncreaseCorporateDepositDto delete(@NonNull FinanceIncreaseCorporateDepositParam param) {
        return null;
    }

    @Override
    public FinanceIncreaseCorporateDepositDto getById(long id) {
        return IncreaseConvertor.ToDto(financeIncreaseCorporateDepositRepository.getById(id));
    }

    @Override
    public FinanceIncreaseCorporateDepositRequestEntity add(FinanceIncreaseCorporateDepositRequestEntity entity) {
        return financeIncreaseCorporateDepositRepository.add(entity);
    }

    @Override
    public FinanceIncreaseCorporateDepositRequestEntity update(FinanceIncreaseCorporateDepositRequestEntity entity) {
        return financeIncreaseCorporateDepositRepository.update(entity);
    }

    @Override
    public FinanceIncreaseCorporateDepositRequestEntity delete(FinanceIncreaseCorporateDepositRequestEntity entity) {
        return null;
    }

    @Override
    public FinanceIncreaseCorporateDepositRequestEntity getEntityById(long id) {
        return financeIncreaseCorporateDepositRepository.getById(id);
    }

    @Override
    public List<FinanceIncreaseCorporateDepositRequestEntity> getAll(Pageable pageable) {
        return financeIncreaseCorporateDepositRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceIncreaseCorporateDepositRequestEntity> findAll(Specification<FinanceIncreaseCorporateDepositRequestEntity> specification, Pageable pageable) {
        return financeIncreaseCorporateDepositRepository.findAll(specification, pageable);
    }

    @Override
    public List<FinanceIncreaseCorporateDepositDto> convertToDtos(List<FinanceIncreaseCorporateDepositRequestEntity> entities) {
        return entities.stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceIncreaseCorporateDepositDto> convertToDtos(Page<FinanceIncreaseCorporateDepositRequestEntity> entities) {
        return entities.map(IncreaseConvertor::ToDto);
    }

    @Override
    public List<FinanceIncreaseCorporateDepositDto> getIncreaseCorporateDeposits(Long corporateId) {
        CorporateEntity corporate = corporateService.getEntityById(corporateId);
        List<FinanceIncreaseCorporateDepositDto> CorporateIncreases = corporate.getCorporateIncreases().stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList());
        return CorporateIncreases;
    }

    @Override
    @Transactional
    public FinanceIncreaseCorporateDepositDto confirmIncreaseRequest(FinanceIncreaseCorporateDepositParam param) {
        FinanceIncreaseCorporateDepositRequestEntity increase = financeIncreaseCorporateDepositRepository.getById(param.getId());
        increase.setDepositStatus(param.getAccept()? DepositStatus.CONFIRMED:DepositStatus.REJECTED);
        var financeCorporate = increase.getCorporate().getFinanceCorporate();
        FinanceCorporateTransactionEntity corporateTransaction = FinanceCorporateTransactionEntity.builder()
                .serial(increase.getSerial())
                .amount(increase.getAmount())
                .description(param.getDescription())
                .latestBalance(financeCorporate.getTotalDeposit())
                .financeCorporate(financeCorporate)
                .transactionCorporateType(TransactionCorporateType.DEPOSIT)
                .transactionStatus(param.getAccept()?TransactionStatus.COMPLETE:TransactionStatus.CANCEL)
                .transactionType(TransactionBaseType.CORPORATE)
                .isChecked(false)
                .build();
        if(param.getAccept()){
            var newDeposit = financeCorporate.getTotalDeposit().add(increase.getAmount());
            financeCorporate.setTotalDeposit(newDeposit);
            increase.getCorporate().setFinanceCorporate(financeCorporate);
        }
        financeCorporateTransactionRepository.add(corporateTransaction);
        financeIncreaseCorporateDepositRepository.update(increase);
        return IncreaseConvertor.ToDto(increase);
    }

    @Override
    @Transactional
    public String requestIncreaseCorporateDeposits(RequestIncreaseCorporateDepositParam param) {

        String result = null;
        if (param.getGatewayApplication() == null)
            throw new unknownPaymentType();
        if (param.getGatewayApplication().getId() == null)
            throw new unsupportedTransactionType();
        if (param.getAmount() == null)
            throw new RequestUnderLimit();
        if (param.getAmount().compareTo(BigDecimal.valueOf(100))<1)
            throw new RequestUnderLimit();
        if (param.getCorporateId() == null)
            throw new unknownPaymentBuyer();
        if (param.getApplication() == null)
            throw new unknownPaymentType();



        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.CASH_IN_ACCOUNT_CHARGE_CORPORATE)
                .build());
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        FinanceApplicationGatewayEntity applicationGateway = financeApplicationGatewayRepository.getById(param.getGatewayApplication().getId());

        var request =new FinanceIncreaseCorporateDepositRequestEntity();
        request.setCorporate(corporate);
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

}
