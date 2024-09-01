package com.notrika.gympin.domain.finance.peyments;


import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.util.exception.transactions.TransactionAlreadyChecked;
import com.notrika.gympin.common.util.exception.transactions.TransactionNotFound;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.finance.*;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseCorporateDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseUserDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceDiscountTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceIncomeTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalculatePaymentsServiceImpl {


    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;
    @Autowired
    FinanceIncomeTransactionRepository financeIncomeTransactionRepository;
    @Autowired
    FinanceDiscountTransactionRepository financeDiscountTransactionRepository;
    @Autowired
    FinanceUserTransactionRepository financeUserTransactionRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    FinanceIncreaseCorporateDepositRequestRepository financeIncreaseCorporateDepositRepository;
    @Autowired
    FinanceIncreaseUserDepositRequestRepository financeIncreaseUserDepositRepository;
    @Autowired
    FinanceUserRepository financeUserRepository;
    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    SmsInService smsService;
    @Autowired
    FinanceHelper financeHelper;


    @Transactional
    public void CalculatePayment(Long transactionId, Boolean TransactionResult, String description, String additionalDescription) throws Exception {
        FinanceSerialEntity transactionSerial = null;
        try {
            transactionSerial = financeSerialRepository.getById(transactionId);
        } catch (Exception e) {
        }
        if (transactionSerial == null)
            throw new TransactionNotFound();

        if (transactionSerial.getCorporateIncreases().size() > 0) {
            //corporate increase request
            for (FinanceIncreaseCorporateDepositRequestEntity request : transactionSerial.getCorporateIncreases()) {
                var corporateFinance = request.getCorporate().getFinanceCorporate();
                if (request.getDepositStatus() != DepositStatus.BANK_PENDING) {
                    throw new TransactionAlreadyChecked();
                }
                if (TransactionResult) {

                    financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                            .serial(transactionSerial)
                            .isChecked(false)
                            .latestBalance(corporateFinance.getTotalDeposit())
                            .transactionStatus(TransactionStatus.COMPLETE)
                            .transactionType(TransactionBaseType.USER)
                            .amount(request.getAmount())
                            .financeCorporate(corporateFinance)
                            .description(description + " " + additionalDescription)
                            .build()
                    );

                    var newDeposit = corporateFinance.getTotalDeposit().add(request.getAmount());
                    corporateFinance.setTotalDeposit(newDeposit);
                    financeCorporateRepository.update(corporateFinance);
                    // todo send increase sms
                    try {
                        List<UserEntity> corporateAdmins = request.getCorporate().getPersonnel().stream().filter(p -> p.getRole() == CorporatePersonnelRoleEnum.ADMIN).map(p -> p.getUser()).collect(Collectors.toList());
                        for (UserEntity corporateAdmin : corporateAdmins) {
                            smsService.sendCorporateTransactionComplete(
                                    SmsDto.builder()
                                            .smsType(SmsTypes.CORPORATE_CHARGE)
                                            .userNumber(corporateAdmin.getPhoneNumber())
                                            .text1(request.getAmount().toString())
                                            .build()
                            );
                        }
                    } catch (Exception e) {
                    }

                } else {
                    request.setDepositStatus(DepositStatus.REJECTED);
                    request.setDescription(description);
                    if (!additionalDescription.isEmpty()) {
                        request.setDescription(request.getDescription() + " - " + additionalDescription);
                    }
                    financeIncreaseCorporateDepositRepository.update(request);
                }
            }

        } else if (transactionSerial.getUserIncreases().size() > 0) {
            //user increase request
            for (FinanceIncreaseUserDepositRequestEntity request : transactionSerial.getUserIncreases()) {
                var userFinance = financeHelper.getUserPersonalWallet(request.getUser());
                if (request.getDepositStatus() != DepositStatus.BANK_PENDING) {
                    throw new TransactionAlreadyChecked();
                }
                if (TransactionResult) {
                    //transaction
                    financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                            .serial(transactionSerial)
                            .isChecked(false)
                            .latestBalance(userFinance.getTotalDeposit())
                            .transactionStatus(TransactionStatus.COMPLETE)
                            .transactionType(TransactionBaseType.USER)
                            .amount(request.getAmount())
                            .financeUser(userFinance)
                            .description(description + " " + additionalDescription)
                            .build()
                    );
                    //user balance
                    var newDeposit = userFinance.getTotalDeposit().add(request.getAmount());
                    userFinance.setTotalDeposit(newDeposit);
                    financeUserRepository.update(userFinance);
                    //Todo send increase sms
                    try {
                        smsService.sendUserTransactionComplete(
                                SmsDto.builder()
                                        .smsType(SmsTypes.USER_CHARGE)
                                        .userNumber(request.getUser().getPhoneNumber())
                                        .text1(request.getAmount().toString())
                                        .build()
                        );
                    } catch (Exception e) {
                    }
                } else {
                    request.setDepositStatus(DepositStatus.REJECTED);
                    request.setDescription(description);
                    if (!additionalDescription.isEmpty()) {
                        request.setDescription(request.getDescription() + " - " + additionalDescription);
                    }
                    financeIncreaseUserDepositRepository.update(request);
                }
            }
        }
    }



    public void PayToPlace(PurchasedSubscribeEntity subscribeEntity) {

        PlacePersonnelEntity beneficiary = subscribeEntity.getTicketSubscribe().getBeneficiary();
        FinanceUserEntity beneficiaryFinance = financeHelper.getUserIncomeWallet(beneficiary.getUser(),beneficiary.getPlace());
        Double commissionFee = beneficiary.getCommissionFee();

        BigDecimal commission = null;
        BigDecimal discount = null;
        BigDecimal beneficiaryShare = null;

        if (subscribeEntity.getCustomer().getInvitedBy() != null && subscribeEntity.getCustomer().getInvitedBy().startsWith("P") && subscribeEntity.getCustomer().getInvitedBy().equals("P" + GeneralHelper.getInviteCode(subscribeEntity.getPlace().getId(), 1))) {
            commission = BigDecimal.ZERO;
            beneficiaryShare = subscribeEntity.getPlacePrice();
        } else if (subscribeEntity.getDiscount() == null) {
            commission = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(commissionFee / 100));
            beneficiaryShare = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100)));
        } else {
            commission = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(((Double) commissionFee - (float) subscribeEntity.getDiscount()) / 100));
            discount = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf((float) subscribeEntity.getDiscount() / 100));
            beneficiaryShare = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100)));
        }

        //place personel
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .amount(beneficiaryShare)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.BENEFICIARY)
                .place(subscribeEntity.getPlace())
                .purchased(subscribeEntity)
                .isChecked(false)
                .latestBalance(beneficiaryFinance.getTotalDeposit())
                .financeUser(beneficiaryFinance)
                .serial(subscribeEntity.getSerial())
                .build());

        //income
        financeIncomeTransactionRepository.add(FinanceIncomeTransactionEntity.builder()
                .amount(commission)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.INCOME)
                .isChecked(false)
                .purchased(subscribeEntity)
                .latestBalance(financeIncomeTransactionRepository.gympinTotalIncome() == null ? BigDecimal.ZERO : financeIncomeTransactionRepository.gympinTotalIncome())
                .serial(subscribeEntity.getSerial())
                .build());


        //discount
        if (discount != null && discount.compareTo(BigDecimal.ZERO) > 0) {
            financeDiscountTransactionRepository.add(FinanceDiscountTransactionEntity.builder()
                    .amount(discount)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .transactionType(TransactionBaseType.DISCOUNT)
                    .purchased(subscribeEntity)
                    .isChecked(false)
                    .latestBalance(financeDiscountTransactionRepository.gympinTotalDiscount() == null ? BigDecimal.ZERO : financeDiscountTransactionRepository.gympinTotalDiscount())
                    .serial(subscribeEntity.getSerial())
                    .build());
        }

        //to beneficiary
        beneficiaryFinance.setTotalDeposit(beneficiaryFinance.getTotalDeposit().add(beneficiaryShare));
        financeUserRepository.update(beneficiaryFinance);
    }

    public void PayToPlace(PurchasedCourseEntity courseEntity) {

        PlacePersonnelEntity beneficiary = courseEntity.getTicketCourse().getBeneficiary();

        FinanceUserEntity beneficiaryFinance = financeHelper.getUserIncomeWallet(beneficiary.getUser(),beneficiary.getPlace());
        Double commissionFee = beneficiary.getCommissionFee();

        BigDecimal commission = null;
        BigDecimal discount = null;
        BigDecimal beneficiaryShare = null;

        if (courseEntity.getCustomer().getInvitedBy() != null && courseEntity.getCustomer().getInvitedBy().startsWith("P") && courseEntity.getCustomer().getInvitedBy().equals("P" + GeneralHelper.getInviteCode(courseEntity.getPlace().getId(), 1))) {
            commission = BigDecimal.ZERO;
            beneficiaryShare = courseEntity.getPlacePrice();
        } else if (courseEntity.getDiscount() == null) {
            commission = courseEntity.getPlacePrice().multiply(BigDecimal.valueOf(commissionFee / 100));
            beneficiaryShare = courseEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100)));
        } else {
            commission = courseEntity.getPlacePrice().multiply(BigDecimal.valueOf(((Double) commissionFee - (float) courseEntity.getDiscount()) / 100));
            discount = courseEntity.getPlacePrice().multiply(BigDecimal.valueOf((float) courseEntity.getDiscount() / 100));
            beneficiaryShare = courseEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100)));
        }

        //place personel
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .amount(beneficiaryShare)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.BENEFICIARY)
                .place(courseEntity.getPlace())
                .purchased(courseEntity)
                .isChecked(false)
                .latestBalance(beneficiaryFinance.getTotalDeposit())
                .financeUser(beneficiaryFinance)
                .serial(courseEntity.getSerial())
                .build());

        //income
        financeIncomeTransactionRepository.add(FinanceIncomeTransactionEntity.builder()
                .amount(commission)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.INCOME)
                .isChecked(false)
                .purchased(courseEntity)
                .latestBalance(financeIncomeTransactionRepository.gympinTotalIncome() == null ? BigDecimal.ZERO : financeIncomeTransactionRepository.gympinTotalIncome())
                .serial(courseEntity.getSerial())
                .build());


        //discount
        if (discount != null && discount.compareTo(BigDecimal.ZERO) > 0) {
            financeDiscountTransactionRepository.add(FinanceDiscountTransactionEntity.builder()
                    .amount(discount)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .transactionType(TransactionBaseType.DISCOUNT)
                    .purchased(courseEntity)
                    .isChecked(false)
                    .latestBalance(financeDiscountTransactionRepository.gympinTotalDiscount() == null ? BigDecimal.ZERO : financeDiscountTransactionRepository.gympinTotalDiscount())
                    .serial(courseEntity.getSerial())
                    .build());
        }

        //to beneficiary
        beneficiaryFinance.setTotalDeposit(beneficiaryFinance.getTotalDeposit().add(beneficiaryShare));
        financeUserRepository.update(beneficiaryFinance);
    }
}
