package com.notrika.gympin.domain.finance.IncreaseCorporateDeposit;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.*;
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
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.transactions.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.gateways.GatewayServiceImpl;
import com.notrika.gympin.domain.util.convertor.IncreaseConvertor;
import com.notrika.gympin.domain.util.helper.PdfHelper;
import com.notrika.gympin.persistence.dao.repository.finance.gateway.FinanceApplicationGatewayRepository;
import com.notrika.gympin.persistence.dao.repository.finance.gateway.FinanceGatewayRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseCorporateDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceGatewayEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
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
    private FinanceGatewayRepository financeGatewayRepository;
    @Autowired
    private GatewayServiceImpl gatewayService;
    @Autowired
    SettingsService settingsService;

    @Override
    @Transactional
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
                .requestInvoice(false)
                .build());
        return IncreaseConvertor.ToDto(increaseCorporateDeposit);
    }

    @Override
    public FinanceIncreaseCorporateDepositDto update(@NonNull FinanceIncreaseCorporateDepositParam param) {
        return null;
    }

    @Override
    public FinanceIncreaseCorporateDepositDto delete(@NonNull FinanceIncreaseCorporateDepositParam param) {
        FinanceIncreaseCorporateDepositRequestEntity entity = getEntityById(param.getId());
        entity.setDepositStatus(DepositStatus.CANCELED);
        financeIncreaseCorporateDepositRepository.update(entity);
        return IncreaseConvertor.ToDto(entity);
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
        return entities.stream().filter(o->!o.isDeleted()).map(IncreaseConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<FinanceIncreaseCorporateDepositDto> convertToDtos(Page<FinanceIncreaseCorporateDepositRequestEntity> entities) {
        return entities.map(IncreaseConvertor::ToDto);
    }

    @Override
    public List<FinanceIncreaseCorporateDepositDto> getIncreaseCorporateDeposits(Long corporateId) {
        CorporateEntity corporate = corporateService.getEntityById(corporateId);
        List<FinanceIncreaseCorporateDepositDto> CorporateIncreases = corporate.getCorporateIncreases().stream().filter(o->!o.isDeleted()).map(IncreaseConvertor::ToDto).collect(Collectors.toList());
        return CorporateIncreases;
    }
    private Float getCorporateTax() {
        try {
            String taxValue =  settingsService.getByKey("CORPORATE_GENERAL_TAX").getValue();
            return Float.parseFloat(taxValue)/100;
        }catch (Exception e){
            return 0.1f;
        }
    }

    @Override
    @Transactional
    public FinanceIncreaseCorporateDepositDto confirmIncreaseRequest(FinanceIncreaseCorporateDepositParam param) {
        FinanceIncreaseCorporateDepositRequestEntity increase = financeIncreaseCorporateDepositRepository.getById(param.getId());
        increase.setDepositStatus(param.getAccept()? DepositStatus.CONFIRMED:DepositStatus.REJECTED);
        var financeCorporate = increase.getCorporate().getFinanceCorporate();

        //Tax
        var AmountToIncrease = BigDecimal.valueOf(increase.getAmount().longValue()/(1+getCorporateTax()));
        var tax = increase.getAmount().subtract(AmountToIncrease);
        FinanceCorporateTransactionEntity corporateTransaction = FinanceCorporateTransactionEntity.builder()
                .serial(increase.getSerial())
                .amount(AmountToIncrease)
                .description(param.getDescription()+" Tax : "+tax)
                .latestBalance(financeCorporate.getTotalDeposit())
                .financeCorporate(financeCorporate)
                .transactionCorporateType(TransactionCorporateType.DEPOSIT)
                .transactionStatus(param.getAccept()?TransactionStatus.COMPLETE:TransactionStatus.CANCEL)
                .transactionType(TransactionBaseType.CORPORATE)
                .isChecked(false)
                .build();
        if(param.getAccept()){
            var newDeposit = financeCorporate.getTotalDeposit().add(AmountToIncrease);
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
        request.setRequestInvoice(param.getRequestInvoice());
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
    @Transactional
    public String completeRequestIncreaseCorporateDeposits(RequestIncreaseCorporateDepositParam param) {
        String result = null;
        FinanceIncreaseCorporateDepositRequestEntity request = getEntityById(param.getId());
        request.setRefrence(GeneralUtil.GetPaymentDescription(request.getGatewayType(),param.getTransactionReference(),param.getChequeDate()));
        request.setDepositStatus(DepositStatus.REQUESTED);
        result = request.getSerial().getSerial().split("-")[0];
        update(request);
        return result;
    }

    @Override
    @Transactional
    public FinanceIncreaseCorporateDepositDto requestIncreaseCorporateDepositsDraft(RequestIncreaseCorporateDepositParam param) {
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
        if (!param.getDraft())
            throw new unknownPaymentType();



        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.CASH_IN_ACCOUNT_CHARGE_CORPORATE)
                .build());
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        FinanceApplicationGatewayEntity applicationGateway = financeApplicationGatewayRepository.getById(param.getGatewayApplication().getId());

        var request =new FinanceIncreaseCorporateDepositRequestEntity();
        request.setCorporate(corporate);

        int tax = Integer.parseInt(settingsService.getByKey("CORPORATE_GENERAL_TAX").getValue());
        BigDecimal taxBig = BigDecimal.valueOf(1+(tax/100));
        request.setAmount(param.getAmount().multiply(taxBig));
        request.setSerial(serial);
        request.setDepositStatus(DepositStatus.DRAFT);
        request.setRequestInvoice(param.getRequestInvoice());
        request.setGatewayType(applicationGateway.getGateway().getGatewayType());
        add(request);

        return IncreaseConvertor.ToDto(request);
    }

    @Override
    public byte[] getProFormaInvoice(RequestIncreaseCorporateDepositParam param) {
        FinanceIncreaseCorporateDepositRequestEntity request = getEntityById(param.getId());
        FinanceGatewayEntity gatewayEntity = financeGatewayRepository.findByGatewayType(request.getGatewayType());
        int tax = Integer.parseInt(settingsService.getByKey("CORPORATE_GENERAL_TAX").getValue());
        return PdfHelper.getProFormaInvoice(request,gatewayEntity,tax,true);
    }

    @Override
    public byte[] getInvoice(RequestIncreaseCorporateDepositParam param) {
        FinanceIncreaseCorporateDepositRequestEntity request = getEntityById(param.getId());
        FinanceGatewayEntity gatewayEntity = financeGatewayRepository.findByGatewayType(request.getGatewayType());
        int tax = Integer.parseInt(settingsService.getByKey("CORPORATE_GENERAL_TAX").getValue());
        return PdfHelper.getProFormaInvoice(request,gatewayEntity,tax,false);
    }
}
