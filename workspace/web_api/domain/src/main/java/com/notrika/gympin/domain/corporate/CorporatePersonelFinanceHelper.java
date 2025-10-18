package com.notrika.gympin.domain.corporate;


import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util.exception.corporate.CreditCannotBeNegativeException;
import com.notrika.gympin.common.util.exception.purchased.CreditExpireException;
import com.notrika.gympin.common.util.exception.ticket.TicketExpireDateCannotBeNull;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporatePersonelFinanceHelper {


    @Autowired
    FinanceHelper financeHelper;
    @Autowired
    FinanceUserRepository financeUserRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    FinanceUserTransactionRepository financeUserTransactionRepository;
    @Autowired
    CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;
    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;

    public boolean checkLowBudjetByContract(CorporateEntity corporate, BigDecimal CreditToAdd) {

        //TODO change this by query
        BigDecimal totalPersonnelCreditsBeforeAdd = corporate.getPersonnel().stream().map(p -> p.getCredits().stream().filter(o->!o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, (f, q) -> f.add(q))).findAny().get();
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

    @Transactional
    public FinanceCorporatePersonnelCreditEntity addCorporatePersonnelCredit(CorporatePersonnelEntity personnelEntity, Date creditExpireDate,BigDecimal creditAmount,String name, FinanceSerialEntity serial) {
        if (personnelEntity.getCorporate().getContractType() == CorporateContractTypeEnum.ALPHA) {
            Calendar c = Calendar.getInstance();
            c.setTime(personnelEntity.getCorporate().getContractDate());
            c.add(Calendar.YEAR, 1);
            creditExpireDate = c.getTime();
        }
        if(creditExpireDate==null)
           throw new TicketExpireDateCannotBeNull();
        FinanceCorporatePersonnelCreditEntity result = financeCorporatePersonnelCreditRepository.add(FinanceCorporatePersonnelCreditEntity.builder()
                .status(CorporatePersonnelCreditStatusEnum.ACTIVE)
                .corporatePersonnel(personnelEntity)
                .creditAmount(creditAmount)
                .name(name)
                .ExpireDate(creditExpireDate)
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

    @Transactional
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
        }else if(param.getPersonnelIds()!=null){
            return corporatePersonnelRepository.findAllByIdIn(param.getPersonnelIds());
        } else {
            return corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(param.getCorporateId());
        }
    }

    public List<FinanceCorporatePersonnelCreditEntity> addCorporatePersonnelCredits(List<CorporatePersonnelEntity> personnelsToAddCredit, CorporatePersonnelCreditParam param, FinanceSerialEntity serial) {
        if(param.getExpireDate()==null)
            throw new TicketExpireDateCannotBeNull();
         if(param.getCreditAmount()==null)
            throw new CreditCannotBeNegativeException();
        List<FinanceCorporatePersonnelCreditEntity> listToAdd = personnelsToAddCredit.stream().filter(o->!o.isDeleted()).map(personel -> FinanceCorporatePersonnelCreditEntity.builder()
                .status(CorporatePersonnelCreditStatusEnum.ACTIVE)
                .corporatePersonnel(personel)
                .creditAmount(param.getCreditAmount())
                .name(param.getName())
                .ExpireDate(param.getExpireDate())
                .build()).collect(Collectors.toList());
        List<FinanceCorporatePersonnelCreditEntity> result = financeCorporatePersonnelCreditRepository.addAll(listToAdd);
        //add finance corporate personnel credit transaction
        List<FinanceCorporatePersonnelCreditTransactionEntity> tListToAdd = result.stream().filter(o->!o.isDeleted()).map(credit -> FinanceCorporatePersonnelCreditTransactionEntity.builder()
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
    public List<FinanceUserEntity> addNWToCorporatePersonnelCredits(List<CorporatePersonnelEntity> personnelsToAddCredit, CorporatePersonnelCreditParam param, FinanceSerialEntity serial) {
        List<FinanceUserTransactionEntity> tListToAdd = new ArrayList<>();
        List<FinanceUserEntity> listToUpdate = personnelsToAddCredit.stream().filter(o->!o.isDeleted()).map(personel -> {
            //add user none withdrawable credit;
            FinanceUserEntity userNwWallet = financeHelper.getUserNonWithdrawableWallet(personel.getUser());
            BigDecimal before = userNwWallet.getTotalDeposit();
            userNwWallet.setTotalDeposit(before.add(param.getCreditAmount()));
            //add transaction for none withdrawable credit
            tListToAdd.add(FinanceUserTransactionEntity.builder()
                    .serial(serial)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .latestBalance(before)
                    .financeUser(userNwWallet)
                    .isChecked(false)
                    .transactionType(TransactionBaseType.USER)
                    .amount(param.getCreditAmount())
                    .build());
            return userNwWallet;
        }).collect(Collectors.toList());
        List<FinanceUserEntity> result = financeUserRepository.updateAll(listToUpdate);
        //add finance credit transaction
        financeUserTransactionRepository.addAll(tListToAdd);
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
        if (NewAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new CreditCannotBeNegativeException();
        }
        if (NewAmount.compareTo(BigDecimal.ZERO) == 0) {
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

    public List<FinanceCorporatePersonnelCreditEntity> getActiveCredits(List<FinanceCorporatePersonnelCreditEntity> credits) {
        var updatedCredit = checkCreditsExpiration(credits);
        return updatedCredit.stream().filter(o->!o.isDeleted()).filter(credit -> credit.getStatus().equals(CorporatePersonnelCreditStatusEnum.ACTIVE)).collect(Collectors.toList());
    }
    public List<FinanceCorporatePersonnelCreditEntity> checkCreditsExpiration(List<FinanceCorporatePersonnelCreditEntity> allcredits) {
        for (FinanceCorporatePersonnelCreditEntity credit : allcredits.stream().filter(o->!o.isDeleted()).filter(credit -> credit.getStatus().equals(CorporatePersonnelCreditStatusEnum.ACTIVE)).collect(Collectors.toList())) {
            if (credit.getExpireDate().before(new Date())) {
                allcredits.remove(credit);
                allcredits.add(ExpireCredit(credit));
            }
        }
        return allcredits;
    }

    public FinanceCorporatePersonnelCreditEntity checkCreditExpiration(FinanceCorporatePersonnelCreditEntity credit) {
        if (credit.getStatus().equals(CorporatePersonnelCreditStatusEnum.ACTIVE)) {
            if (credit.getExpireDate().before(new Date())) {
                return ExpireCredit(credit);
             }
        }
        return credit;
    }

    private FinanceCorporatePersonnelCreditEntity ExpireCredit(FinanceCorporatePersonnelCreditEntity credit) {

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

        return result;
    }

    public boolean checkContractContract(CorporateEntity corporate) {
        if (corporate.getContractDate() == null)
            return false;
        if (corporate.getContractType() == null)
            return false;
        else return true;
    }
}



