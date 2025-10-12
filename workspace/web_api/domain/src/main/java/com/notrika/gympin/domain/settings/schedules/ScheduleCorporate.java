package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.domain.corporate.CorporatePersonelFinanceHelper;
import com.notrika.gympin.domain.settings.sms.SmsInServiceImpl;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleCorporate {

    @Autowired
    private SmsInServiceImpl smsService;
    @Autowired
    private SettingsService settingsService;
    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private FinanceSerialRepository financeSerialRepository;
    @Autowired
    private FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    private FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    private FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;
    @Autowired
    private FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void checkLowBudgetsSms() {
        List<CorporateEntity> corporateEntities = corporateRepository.findAllByDeletedIsFalseAndStatus(CorporateStatusEnum.LOW_BUDGET);

        SettingDto canSend = settingsService.getByKey("SMS_LOWBUDGET_TO_CORPORATE");
        if(canSend==null&& !canSend.getValue().equals("1")){
            return;
        }
        for (CorporateEntity corporateEntity : corporateEntities) {
            try {
                List<CorporatePersonnelEntity> owners = corporateEntity.getPersonnel().stream().filter(o->!o.isDeleted()).filter(p->p.getRole()== CorporatePersonnelRoleEnum.ADMIN).collect(Collectors.toList());

                for (CorporatePersonnelEntity owner : owners) {
                    smsService.sendLowBudgetToCorporate(new SmsDto(owner.getUser().getPhoneNumber(), SmsTypes.CORPORATE_LOW_BUDGET,corporateEntity.getName()));
                }
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    @Transactional
    public void checkExpirePersonnelCredit() {
        List<FinanceCorporatePersonnelCreditEntity> ExpireActiveCredits = financeCorporatePersonnelCreditRepository.getExpireCredits();
        for (FinanceCorporatePersonnelCreditEntity credit : ExpireActiveCredits) {
            if(!entityManager.contains(credit)){
                credit = entityManager.getReference(FinanceCorporatePersonnelCreditEntity.class, credit.getId());
            }
            CorporatePersonnelEntity corporatePersonnel = credit.getCorporatePersonnel();
            CorporateEntity corporate = corporatePersonnel.getCorporate();
            FinanceCorporateEntity financeCorporate =corporate.getFinanceCorporate();
            BigDecimal lastPersonnelCreditBalance =credit.getCreditAmount();
            FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                    .serial(java.util.UUID.randomUUID().toString())
                    .processTypeEnum(ProcessTypeEnum.TRA_EXPIRE_PERSONNEL_CREDIT_SYSTEM)
                    .build());

            if(!entityManager.contains(serial)){
                serial = entityManager.getReference(FinanceSerialEntity.class, serial.getId());
            }
            //transaction personnel credit
            financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                    .serial(serial)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .latestBalance(lastPersonnelCreditBalance)
                    .personnelCredit(credit)
                    .isChecked(false)
                    .transactionType(TransactionBaseType.CORPORATE_PERSONNEL)
                    .amount(lastPersonnelCreditBalance.negate())
                    .build());
            //change personnel credit
            credit.setStatus(CorporatePersonnelCreditStatusEnum.EXPIRE);
            credit.setCreditAmount(BigDecimal.ZERO);
            FinanceCorporatePersonnelCreditEntity result = financeCorporatePersonnelCreditRepository.update(credit);
            //transaction corporate total
            financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                    .serial(serial)
                    .amount(lastPersonnelCreditBalance.negate())
                    .description("انقضا سیستمی اعتبار کاربر")
                    .latestBalance(financeCorporate.getTotalCredits())
                    .financeCorporate(financeCorporate)
                    .transactionCorporateType(TransactionCorporateType.CREDIT)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .transactionType(TransactionBaseType.CORPORATE)
                    .isChecked(false)
                    .build());
            //change corporateTotal
            BigDecimal newTotal = financeCorporate.getTotalCredits().subtract(lastPersonnelCreditBalance);
            financeCorporate.setTotalCredits(newTotal);
            financeCorporateRepository.update(financeCorporate);
        }
    }
}
