package com.notrika.gympin.domain.user;


import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceHelper {

    @Autowired
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    FinanceCorporateRepository financeCorporateRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;

    @Autowired
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;

    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;


    public List<UserCreditDetailDto> getUserCreditsByCorporate(UserParam param) {
        List<CorporatePersonnelEntity> corportePersonnels = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(param.getId());
        List<UserCreditDetailDto> result = new ArrayList<>();
        //check User
        for (CorporatePersonnelEntity personnel : corportePersonnels) {
            Boolean canPay = true;
            //Check corporate
            CorporateEntity corporate = personnel.getCorporate();
            if (corporate.getStatus() != CorporateStatusEnum.ACTIVE)
                canPay = false;
            var activeCredits = personnel.getCredits().stream().filter(c -> c.getStatus() == CorporatePersonnelCreditStatusEnum.ACTIVE).collect(Collectors.toList());
            activeCredits = checkCreditExpiration(activeCredits);
            var personelCorproateMaxCredit = activeCredits.stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            if (personelCorproateMaxCredit.compareTo(corporate.getFinanceCorporate().getTotalDeposit()) > 0)
                canPay = false;
            for (FinanceCorporatePersonnelCreditEntity credit : activeCredits) {
                //check Credit
                //add credit To List
                UserCreditDetailDto detail = new UserCreditDetailDto();
                detail.setId(credit.getId());
                detail.setCreditStatus(credit.getStatus());
                detail.setPersonnelId(personnel.getId());
                detail.setName(credit.getName());
                detail.setCreditType(CreditType.SPONSOR);
                detail.setContractType(corporate.getContractType());
                detail.setCreditAmount(credit.getCreditAmount());
                detail.setExpireDate(credit.getExpireDate());
                detail.setCreditPayableAmount(canPay ? credit.getCreditAmount() : BigDecimal.ZERO);
                detail.setCorporate(CorporateConvertor.toDto(corporate));
                result.add(detail);
            }
        }
        return result;
    }

    private List<FinanceCorporatePersonnelCreditEntity> checkCreditExpiration(List<FinanceCorporatePersonnelCreditEntity> activeCredits) {
        for (FinanceCorporatePersonnelCreditEntity credit : activeCredits.stream().filter(credit -> credit.getStatus().equals(CorporatePersonnelCreditStatusEnum.ACTIVE)).collect(Collectors.toList())) {
            if (credit.getExpireDate().before(new Date())) {
                activeCredits = activeCredits.stream().filter(f->!f.getId().equals(credit.getId())).collect(Collectors.toList());
                ExpireCredit(credit);
            }
        }
        return activeCredits;
    }

    private void ExpireCredit(FinanceCorporatePersonnelCreditEntity credit) {

        CorporatePersonnelEntity corporatePersonnel = credit.getCorporatePersonnel();
        CorporateEntity corporate = corporatePersonnel.getCorporate();
        FinanceCorporateEntity financeCorporate =corporate.getFinanceCorporate();
        BigDecimal lastPersonnelCreditBalance =credit.getCreditAmount();
        FinanceSerialEntity serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_EXPIRE_PERSONNEL_CREDIT_SYSTEM)
                .build());
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
        financeCorporatePersonnelCreditRepository.update(credit);
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
