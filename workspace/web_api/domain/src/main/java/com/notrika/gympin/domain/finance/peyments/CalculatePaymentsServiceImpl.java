package com.notrika.gympin.domain.finance.peyments;


import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import com.notrika.gympin.common.util.exception.ticket.TicketHasNotOwner;
import com.notrika.gympin.common.util.exception.transactions.TransactionAlreadyChecked;
import com.notrika.gympin.common.util.exception.transactions.TransactionNotFound;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseCorporateDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.request.FinanceIncreaseUserDepositRequestRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceDiscountTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceIncomeTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.MathContext;
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
    @Autowired
    SettingsService settingsService;


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

                    //Tax
                    BigDecimal amountToIncrease = BigDecimal.valueOf(request.getAmount().longValue()/(1+getCorporateTax()));
                    BigDecimal tax = request.getAmount().subtract(amountToIncrease);
                    financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                            .serial(transactionSerial)
                            .isChecked(false)
                            .latestBalance(corporateFinance.getTotalDeposit())
                            .transactionStatus(TransactionStatus.COMPLETE)
                            .transactionType(TransactionBaseType.USER)
                            .amount(amountToIncrease)
                            .financeCorporate(corporateFinance)
                            .description(description + " " + additionalDescription+" Tax : "+tax)
                            .build()
                    );

                    var newDeposit = corporateFinance.getTotalDeposit().add(amountToIncrease);
                    corporateFinance.setTotalDeposit(newDeposit);
                    financeCorporateRepository.update(corporateFinance);
                    // todo send increase sms
                    try {
                        List<UserEntity> corporateAdmins = request.getCorporate().getPersonnel().stream().filter(o->!o.isDeleted()).filter(p -> p.getRole() == CorporatePersonnelRoleEnum.ADMIN).map(p -> p.getUser()).collect(Collectors.toList());
                        for (UserEntity corporateAdmin : corporateAdmins) {
                            smsService.sendCorporateTransactionComplete(
                                    SmsDto.builder()
                                            .smsType(SmsTypes.CORPORATE_CHARGE)
                                            .userNumber(corporateAdmin.getPhoneNumber())
                                            .text1(amountToIncrease.toString())
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

    private Float getCorporateTax() {
        try {
            String taxValue =  settingsService.getByKey("CORPORATE_GENERAL_TAX").getValue();
            return Float.parseFloat(taxValue)/100;
        }catch (Exception e){
            return 0.1f;
        }
    }


    public void PayToPlace(PurchasedSubscribeEntity subscribeEntity,FinanceSerialEntity serial) {

        PlacePersonnelEntity beneficiary = subscribeEntity.getTicketSubscribe().getBeneficiary();
        FinanceUserEntity beneficiaryFinance = financeHelper.getUserIncomeWallet(beneficiary.getUser(),beneficiary.getPlace());
        Double commissionFee = beneficiary.getCommissionFee();

        BigDecimal commission = null;
        BigDecimal discount = null;
        BigDecimal beneficiaryShare = null;
        float discountValue =100- subscribeEntity.getSellPrice().multiply(BigDecimal.valueOf(100)).divide(subscribeEntity.getPlacePrice()).longValue();


        if (subscribeEntity.getCustomer().getInvitedBy() != null && subscribeEntity.getCustomer().getInvitedBy().startsWith("P") && subscribeEntity.getCustomer().getInvitedBy().equals("P" + GeneralHelper.getInviteCode(subscribeEntity.getPlace().getId(), 1))) {
            commission = BigDecimal.ZERO;
            beneficiaryShare = subscribeEntity.getPlacePrice();
        } else if (discountValue == 0) {
            commission = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(commissionFee / 100)).round(MathContext.DECIMAL32);
            beneficiaryShare = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100))).round(MathContext.DECIMAL32);
        } else {
            commission = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf((commissionFee - discountValue) / 100)).round(MathContext.DECIMAL32);
            discount = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(discountValue / 100)).round(MathContext.DECIMAL32);
            beneficiaryShare = subscribeEntity.getPlacePrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100))).round(MathContext.DECIMAL32);
        }

        //place personel
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .amount(beneficiaryShare)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.USER)
                .place(subscribeEntity.getPlace())
                .purchased(subscribeEntity)
                .isChecked(false)
                .latestBalance(beneficiaryFinance.getTotalDeposit())
                .financeUser(beneficiaryFinance)
                .serial(serial)
                .build());

        //income
        financeIncomeTransactionRepository.add(FinanceIncomeTransactionEntity.builder()
                .amount(commission)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .purchased(subscribeEntity)
                .latestBalance(financeIncomeTransactionRepository.gympinTotalIncome() == null ? BigDecimal.ZERO : financeIncomeTransactionRepository.gympinTotalIncome())
                .serial(serial)
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
                    .serial(serial)
                    .build());
        }

        //to beneficiary
        beneficiaryFinance.setTotalDeposit(beneficiaryFinance.getTotalDeposit().add(beneficiaryShare));
        financeUserRepository.update(beneficiaryFinance);
    }


    public void PayFoodToCatering(InvoiceEntity invoice, PlaceCateringEntity catering) {


        PlacePersonnelEntity beneficiary = catering.getPlaceOwners().stream().filter(po->!po.isDeleted()&&po.getIsBeneficiary()).findFirst().orElse(null);
        if(beneficiary==null)
            throw new TicketHasNotOwner();
        FinanceUserEntity beneficiaryFinance = financeHelper.getUserIncomeWallet(beneficiary.getUser(),beneficiary.getPlace());
        Double commissionFee = beneficiary.getCommissionFee();

        BigDecimal commission = null;
        BigDecimal discount = null;
        BigDecimal beneficiaryShare = null;

        //settlement
            commission = invoice.getTotalPrice().multiply(BigDecimal.valueOf(commissionFee / 100));
            beneficiaryShare = invoice.getTotalPrice().multiply(BigDecimal.valueOf(1 - (commissionFee / 100)));



        //place catering personel
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .amount(beneficiaryShare)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.USER)
                .place(catering)
                .isChecked(false)
                .latestBalance(beneficiaryFinance.getTotalDeposit())
                .financeUser(beneficiaryFinance)
                .serial(invoice.getSerial())
                .build());

        //income
        financeIncomeTransactionRepository.add(FinanceIncomeTransactionEntity.builder()
                .amount(commission)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .latestBalance(financeIncomeTransactionRepository.gympinTotalIncome() == null ? BigDecimal.ZERO : financeIncomeTransactionRepository.gympinTotalIncome())
                .serial(invoice.getSerial())
                .build());



        //to beneficiary
        beneficiaryFinance.setTotalDeposit(beneficiaryFinance.getTotalDeposit().add(beneficiaryShare));
        financeUserRepository.update(beneficiaryFinance);
    }


}
