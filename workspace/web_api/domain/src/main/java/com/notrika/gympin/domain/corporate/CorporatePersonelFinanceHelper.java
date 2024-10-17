package com.notrika.gympin.domain.corporate;


import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.exception.corporate.CreditCannotBeNegativeException;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporatePersonelFinanceHelper {


    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;
    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;

    public boolean checkLowBudjetByContract(CorporateEntity corporate, BigDecimal CreditToAdd) {

        //TODO change this by query
        BigDecimal totalPersonnelCreditsBeforeAdd = corporate.getPersonnel().stream().map(p -> p.getCredits().stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, (f, q) -> f.add(q))).findAny().get();
        BigDecimal totalPersonnelCreditsAfterAdd = totalPersonnelCreditsBeforeAdd.add(CreditToAdd);
        if (corporate.getContractType() == CorporateContractTypeEnum.NEO) {
            return compareDepositAndCredit(totalPersonnelCreditsAfterAdd, corporate.getFinanceCorporate().getTotalDeposit(), 3);
        } else {
            return compareDepositAndCredit(totalPersonnelCreditsAfterAdd, corporate.getFinanceCorporate().getTotalDeposit(), 1);
        }
    }

    private boolean compareDepositAndCredit(BigDecimal totalPersonnelCreditsAfterAdd, BigDecimal TotalDeposit, int coefficient) {
        return totalPersonnelCreditsAfterAdd.compareTo(TotalDeposit.multiply(BigDecimal.valueOf(coefficient))) > 0;
    }

    public FinanceCorporatePersonnelCreditEntity addCorporatePersonnelCredit(CorporatePersonnelEntity personnelEntity, @NonNull CorporatePersonnelCreditParam param, FinanceSerialEntity serial) {
        if(personnelEntity.getCorporate().getContractType()==CorporateContractTypeEnum.ALPHA){
            Calendar c = Calendar.getInstance();
            c.setTime(personnelEntity.getCorporate().getContractDate());
            c.add(Calendar.YEAR, 1);
            param.setExpireDate(c.getTime());
        }
        FinanceCorporatePersonnelCreditEntity result = financeCorporatePersonnelCreditRepository.add(FinanceCorporatePersonnelCreditEntity.builder()
                .status(CorporatePersonnelCreditStatusEnum.ACTIVE)
                .corporatePersonnel(personnelEntity)
                .creditAmount(param.getCreditAmount())
                .ExpireDate(param.getExpireDate())
                .build());
        //add finance corporate personnel credit transaction
        financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(result)
                .latestBalance(BigDecimal.ZERO)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE_PERSONNEL)
                .amount(result.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build());
        return result;
    }


    public FinanceCorporateEntity addCorporateTotalCredit(CorporateEntity corporate, BigDecimal CreditAmount, FinanceSerialEntity serial, String trDescription) {
        FinanceCorporateEntity financeCorporate = corporate.getFinanceCorporate();
        BigDecimal totalCreditBeforeAdd = financeCorporate.getTotalCredits();
        financeCorporate.setTotalCredits(totalCreditBeforeAdd.add(CreditAmount));
        financeCorporateRepository.update(financeCorporate);
        //add corporate transaction
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(financeCorporate)
                .latestBalance(totalCreditBeforeAdd)
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .description(trDescription)
                .amount(CreditAmount)
                .isChecked(false)
                .serial(serial)
                .build());
        return financeCorporate;
    }

    public List<CorporatePersonnelEntity> getPeronelForAddCredits(CorporatePersonnelCreditParam param) {
        if (param.getGroupId() != null) {
            return corporatePersonnelRepository.findByCorporateIdAndPersonnelGroupIdAndDeletedIsFalse(param.getCorporateId(), param.getGroupId());
        } else {
            return corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(param.getCorporateId());
        }
    }

    public List<FinanceCorporatePersonnelCreditEntity> addCorporatePersonnelCredits(List<CorporatePersonnelEntity> personnelsToAddCredit, CorporatePersonnelCreditParam param, FinanceSerialEntity serial) {
        List<FinanceCorporatePersonnelCreditEntity> listToAdd = personnelsToAddCredit.stream().map(personel -> FinanceCorporatePersonnelCreditEntity.builder()
                .status(CorporatePersonnelCreditStatusEnum.ACTIVE)
                .corporatePersonnel(personel)
                .creditAmount(param.getCreditAmount())
                .ExpireDate(param.getExpireDate())
                .build()).collect(Collectors.toList());
        List<FinanceCorporatePersonnelCreditEntity> result = financeCorporatePersonnelCreditRepository.addAll(listToAdd);
        //add finance corporate personnel credit transaction
        List<FinanceCorporatePersonnelCreditTransactionEntity> tListToAdd = result.stream().map(credit -> FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(credit)
                .latestBalance(BigDecimal.ZERO)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE_PERSONNEL)
                .amount(credit.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build()).collect(Collectors.toList());
        financeCorporatePersonnelCreditTransactionRepository.addAll(tListToAdd);
        return result;
    }

    public String getTransactionDiscription(CorporatePersonnelCreditParam param, List<CorporatePersonnelEntity> personnelsToAddCredit, BigDecimal totalAddAmount) {
        if (param.getGroupId() != null) {
            var group = corporatePersonnelGroupRepository.getById(param.getGroupId());
            return "افزودن اعتبار به گروه " + group.getName() + " به تعداد " + personnelsToAddCredit.size() + " نفر هر کاربر مبلغ " + param.getCreditAmount() + " تومان در مجموع " + totalAddAmount + " تومان ";
        } else {
            return "افزودن اعتبار به همه پرسنل " + personnelsToAddCredit.size() + " نفر هر کاربر مبلغ " + param.getCreditAmount() + " تومان در مجموع " + totalAddAmount + " تومان ";
        }
    }

    public FinanceCorporatePersonnelCreditEntity decreaseCorporatePersonnelCredit(FinanceCorporatePersonnelCreditEntity credit, BigDecimal amount, FinanceSerialEntity serial) {
        BigDecimal beforeDecrease = credit.getCreditAmount();
        BigDecimal NewAmount = beforeDecrease.subtract(amount);
        if (NewAmount.compareTo(BigDecimal.ZERO)<0 ) {
            throw new CreditCannotBeNegativeException();
        }
        if (NewAmount.compareTo(BigDecimal.ZERO)==0) {
            credit.setStatus(CorporatePersonnelCreditStatusEnum.SUSPEND);
        }
        credit.setCreditAmount(NewAmount);
        financeCorporatePersonnelCreditRepository.update(credit);
        //add finance corporate personnel credit transaction
        financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(credit)
                .latestBalance(beforeDecrease)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE_PERSONNEL)
                .amount(amount.negate())
                .isChecked(false)
                .serial(serial)
                .build());
        return credit;
    }

    public FinanceCorporateEntity decreaseCorporateTotalCredit(FinanceCorporateEntity financeCorporate, BigDecimal creditAmount, FinanceSerialEntity serial, String trDescription) {

        BigDecimal totalCreditBeforeAdd = financeCorporate.getTotalCredits();
        financeCorporate.setTotalCredits(totalCreditBeforeAdd.subtract(creditAmount));
        financeCorporateRepository.update(financeCorporate);
        //add corporate transaction
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(financeCorporate)
                .latestBalance(totalCreditBeforeAdd)
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .description(trDescription)
                .amount(creditAmount.negate())
                .isChecked(false)
                .serial(serial)
                .build());
        return financeCorporate;

    }

    public FinanceCorporateEntity decreaseCorporateTotalDeposit(FinanceCorporateEntity financeCorporate, BigDecimal creditAmount, FinanceSerialEntity serial, String trDescription) {

        BigDecimal totalDepositBeforeAdd = financeCorporate.getTotalDeposit();
        financeCorporate.setTotalDeposit(totalDepositBeforeAdd.subtract(creditAmount));
        financeCorporateRepository.update(financeCorporate);
        //add corporate transaction
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(financeCorporate)
                .latestBalance(totalDepositBeforeAdd)
                .transactionCorporateType(TransactionCorporateType.DEPOSIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .description(trDescription)
                .amount(creditAmount.negate())
                .isChecked(false)
                .serial(serial)
                .build());
        return financeCorporate;

    }

    public boolean checkContractContract(CorporateEntity corporate) {
        if (corporate.getContractDate()==null)
                return false;
        if (corporate.getContractType()==null)
                return false;
        else return true;
    }
}
