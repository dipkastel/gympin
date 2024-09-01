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
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporatePersonelCreditHelper {


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
        FinanceCorporatePersonnelCreditEntity result = financeCorporatePersonnelCreditRepository.add(FinanceCorporatePersonnelCreditEntity.builder()
                .status(CorporatePersonnelCreditStatusEnum.ACTIVE)
                .corporatePersonnel(personnelEntity)
                .creditAmount(param.getCreditAmount())
                .ExpireDate(param.getExpireDate())
                .build());
        //add finance corporate personnel credit transaction
        addCorporatePersonnelCreditTransaction(result, serial);
        return result;
    }


    public FinanceCorporateEntity UpdateAddCorporateFinance(CorporateEntity corporate, BigDecimal CreditAmount, FinanceSerialEntity serial, String trDescription) {
        FinanceCorporateEntity financeCorporate = corporate.getFinanceCorporate();
        BigDecimal totalCreditBeforeAdd = financeCorporate.getTotalCredits();
        financeCorporate.setTotalCredits(totalCreditBeforeAdd.add(CreditAmount));
        financeCorporateRepository.update(financeCorporate);
        //add corporate transaction
        addCorporateTransaction(financeCorporate, serial, CreditAmount, totalCreditBeforeAdd, trDescription);
        return financeCorporate;
    }

    private void addCorporateTransaction(FinanceCorporateEntity financeCorporate, FinanceSerialEntity serial, BigDecimal CreaditAmount, BigDecimal totalCreditBeforeAdd, String trDescription) {
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(financeCorporate)
                .latestBalance(totalCreditBeforeAdd)
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CREDIT)
                .description(trDescription)
                .amount(CreaditAmount)
                .isChecked(false)
                .serial(serial)
                .build());
    }

    private void addCorporatePersonnelCreditTransaction(FinanceCorporatePersonnelCreditEntity credit, FinanceSerialEntity serial) {
        financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(credit)
                .latestBalance(BigDecimal.ZERO)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CREDIT)
                .amount(credit.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build());
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
        addCorporatePersonnelCreditsTransaction(result, serial);
        return result;
    }

    private void addCorporatePersonnelCreditsTransaction(List<FinanceCorporatePersonnelCreditEntity> credits, FinanceSerialEntity serial) {
        List<FinanceCorporatePersonnelCreditTransactionEntity> listToAdd = credits.stream().map(credit -> FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(credit)
                .latestBalance(BigDecimal.ZERO)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CREDIT)
                .amount(credit.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build()).collect(Collectors.toList());
        financeCorporatePersonnelCreditTransactionRepository.addAll(listToAdd);
    }

    public String getTransactionDiscription(CorporatePersonnelCreditParam param, List<CorporatePersonnelEntity> personnelsToAddCredit, BigDecimal totalAddAmount) {
        if (param.getGroupId() != null) {
            var group = corporatePersonnelGroupRepository.getById(param.getGroupId());
            return "افزودن اعتبار به گروه " + group.getName() + " به تعداد " + personnelsToAddCredit.size() + " نفر هر کاربر مبلغ " + param.getCreditAmount() + " تومان در مجموع " + totalAddAmount + " تومان ";
        } else {
            return "افزودن اعتبار به همه پرسنل " + personnelsToAddCredit.size() + " نفر هر کاربر مبلغ " + param.getCreditAmount() + " تومان در مجموع " + totalAddAmount + " تومان ";
        }
    }

    public FinanceCorporatePersonnelCreditEntity DecreaseCorporatePersonnelCredit(FinanceCorporatePersonnelCreditEntity credit, CorporatePersonnelCreditParam param, FinanceSerialEntity serial) {
        BigDecimal beforeDecrease = credit.getCreditAmount();
        BigDecimal NewAmount = beforeDecrease.subtract(param.getCreditAmount());
        if (NewAmount.compareTo(BigDecimal.ZERO)<0 ) {
            throw new CreditCannotBeNegativeException();
        }
        credit.setCreditAmount(NewAmount);
        financeCorporatePersonnelCreditRepository.update(credit);
        //add finance corporate personnel credit transaction
        DecreaseCorporatePersonnelCreditTransaction(credit, serial, beforeDecrease,param.getCreditAmount());
        return credit;
    }

    private void DecreaseCorporatePersonnelCreditTransaction(FinanceCorporatePersonnelCreditEntity credit, FinanceSerialEntity serial, BigDecimal beforeDecrease, BigDecimal decreaseAmount) {
        financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .personnelCredit(credit)
                .latestBalance(beforeDecrease)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CREDIT)
                .amount(decreaseAmount.negate())
                .isChecked(false)
                .serial(serial)
                .build());
    }

    public FinanceCorporateEntity UpdateDecreaseCorporateFinance(CorporateEntity corporate, BigDecimal creditAmount, FinanceSerialEntity serial, String trDescription) {
        FinanceCorporateEntity financeCorporate = corporate.getFinanceCorporate();
        BigDecimal totalCreditBeforeAdd = financeCorporate.getTotalCredits();
        financeCorporate.setTotalCredits(totalCreditBeforeAdd.subtract(creditAmount));
        financeCorporateRepository.update(financeCorporate);
        //add corporate transaction
        DecreaseCorporateTransaction(financeCorporate, serial, creditAmount, totalCreditBeforeAdd, trDescription);
        return financeCorporate;

    }

    private void DecreaseCorporateTransaction(FinanceCorporateEntity financeCorporate, FinanceSerialEntity serial, BigDecimal creditAmount, BigDecimal totalCreditBeforeAdd, String trDescription) {
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(financeCorporate)
                .latestBalance(totalCreditBeforeAdd)
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CREDIT)
                .description(trDescription)
                .amount(creditAmount.negate())
                .isChecked(false)
                .serial(serial)
                .build());
    }
}
