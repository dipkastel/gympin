package com.notrika.gympin.domain.finance.peyments;


import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.util.exception.transactions.TransactionAlreadyChecked;
import com.notrika.gympin.common.util.exception.transactions.TransactionNotFound;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.finance.*;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseCorporateDepositEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.income.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.income.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
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
    FinanceIncreaseCorporateDepositRepository financeIncreaseCorporateDepositRepository;
    @Autowired
    FinanceIncreaseUserDepositRepository financeIncreaseUserDepositRepository;
    @Autowired
    FinanceUserRepository financeUserRepository;
    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    SmsService smsService;


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
            for (FinanceIncreaseCorporateDepositEntity request : transactionSerial.getCorporateIncreases()) {
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
            for (FinanceIncreaseUserDepositEntity request : transactionSerial.getUserIncreases()) {
                var userFinance = request.getUser().getFinanceUser();
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
//
//
//    @Override
//    @Transactional
//    public Boolean settlementRequest(UserSettlementRequestParam param) {
//        PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
//        if (param.getAmount().compareTo(placeEntity.getBalance()) > 0)
//            throw new RequestOverCreditLimit();
//        if (param.getAmount().compareTo(BigDecimal.valueOf(50000)) < 0)
//            throw new RequestUnderLimit();
//        placeEntity.setBalance(placeEntity.getBalance().subtract(param.getAmount()));
//        placeRepository.update(placeEntity);
//        corporatetransactionRepository.add(FinanceCorporateTransactionEntity.builder()
//                .place(placeEntity)
//                .balance(placeEntity.getBalance())
//                .amount(param.getAmount().negate())
//                .transactionStatus(TransactionStatus.REQUEST)
//                .transactionType(TransactionType.PLACE_SETTLEMENT)
//                .isChecked(false)
//                .bankPend(false)
//                .serial(java.util.UUID.randomUUID().toString())
//                .build());
//        return true;
//    }


//    @Override
//    @Transactional
//    public String setPaymentRequest(RequestIncreaseCorporateDepositParam param) {
//        var serial = java.util.UUID.randomUUID().toString();
//
//        if (param.getSelectedPaymentType() == null)
//            throw new unknownPaymentType();
//        if (param.getTransactionType() == null)
//            throw new unknownTransactionType();
//        if (!param.getTransactionType().toString().startsWith("CHARGE"))
//            throw new unsupportedTransactionType();
//
//        if (param.getSelectedPaymentType() == 80L) {
//
//            String callbackUrl = "https://api.gympin.ir/v1/Gateway/PersianCallbackMethod?ref=" + getStringType(param.getTransactionType());
//            var transaction = submitTransAction("پرداخت از درگاه پارسیان ", param, serial, true);
//            //Parsian
//            ClientSaleRequestData requestData = new ClientSaleRequestData();
//            requestData.setOrderId(GeneralUtil.UnifyOrderId(transaction.getId()));
//            requestData.setAmount(param.getAmount().longValue() * 10);
//            requestData.setCallBackUrl(callbackUrl);
//            requestData.setAdditionalData(serial);
//            UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//            requestData.setOriginator(user.getPhoneNumber());
//            requestData.setLoginAccount(loginAccount);
//            ClientSaleResponseData gatwayresult = null;
//            try {
//                gatwayresult = gatewayService.salePaymentRequest(requestData);
//            } catch (Exception e) {
//                throw new GatewayIsNotAvalable();
//            }
//            if (gatwayresult == null) {
//                throw new GatewayIsNotAvalable();
//            } else if (gatwayresult.getStatus() == 0 && gatwayresult.getToken() > 0) {
//                transaction.setDescription(transaction.getDescription() + " - توکن بانک " + gatwayresult.getToken());
//                corporatetransactionRepository.update(transaction);
//                return "https://pec.shaparak.ir/NewIPG/?token=" + gatwayresult.getToken();
//            } else if (gatwayresult.getMessage() != null) {
//                throw new BadRequestRunTimeMessage(gatwayresult.getMessage());
//            } else {
//                throw new GatewayIsNotAvalable();
//            }
//
//        } else if (param.getSelectedPaymentType() == 81L) {
//            var transaction = submitTransAction("پرداخت از درگاه -- ", param, serial, true);
//            return "http://localhost:3025/checkout/" + serial;
//        } else if (param.getSelectedPaymentType() == 82L) {
//            var transaction = submitTransAction("پرداخت از درگاه -- ", param, serial, true);
//            return "http://localhost:3025/checkout/" + serial;
//        } else if (param.getSelectedPaymentType() == 90L) {
//            var transaction = submitTransAction("پرداخت کارت به کارت با شماره تراکنش : " + param.getTransactionReference(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 95L) {
//            var transaction = submitTransAction("پرداخت بانکی با شماره تراکنش : " + param.getTransactionReference(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 98L) {
//            var transaction = submitTransAction("پرداخت چک با شماره سریال :" + param.getTransactionReference() + " و تاریخ :" + param.getChequeDate(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 99L) {
//            UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//            var transaction = submitTransAction("درخواست افزایش اعتبار از پنل توسط : " + user.getId() + " - " + user.getUsername(), param, serial, false);
//            return serial.split("-")[0];
//        }
//        throw new unknownPaymentType();
//
//    }

//    private TransactionEntity submitTransAction(String description, RequestIncreaseCorporateDepositParam param, String serial, Boolean bankPend) {
//
//        TransactionEntity transaction = new TransactionEntity();
//        transaction.setDescription(description);
//
//        transaction.setAmount(param.getAmount());
//        transaction.setTransactionStatus(TransactionStatus.REQUEST);
//        transaction.setSerial(serial);
//        transaction.setIsChecked(false);
//        transaction.setBankPend(bankPend);
//
//        if (param.getUserId() != null) {
//            UserEntity userEntity = userRepository.getById(param.getUserId());
//            transaction.setUser(userEntity);
//            transaction.setBalance(userEntity.getBalance());
//            transaction.setTransactionType(TransactionType.CHARGE_USER);
//        } else if (param.getPlaceId() != null) {
//            PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
//            transaction.setPlace(placeEntity);
//            transaction.setBalance(placeEntity.getBalance());
//            transaction.setTransactionType(TransactionType.CHARGE_PLACE);
//        } else if (param.getCorporateId() != null) {
//            CorporateEntity corporateEntity = corporateService.getEntityById(param.getCorporateId());
//            transaction.setCorporate(corporateEntity);
//            transaction.setBalance(corporateEntity.getFinanceCorporate().getTotalDeposit());
//            transaction.setTransactionType(TransactionType.CHARGE_CORPORATE);
//        } else {
//            throw new unknownPaymentBuyer();
//        }
//
//        return transactionRepository.add(transaction);
//    }


//    @Override
//    @Transactional
//    public Boolean handCheckPayment(CheckPaymentParam param) {
//        List<TransactionEntity> transactionsList = transactionRepository.findAllBySerialAndDeletedFalse(param.getSerial());
//        if (transactionsList.isEmpty())
//            throw new TransactionNotFound();
//        if (transactionsList.size() > 1) {
//            throw new TransactionAlreadyChecked();
//        }
//        TransactionEntity transactionRequest = transactionsList.get(0);
//        TransactionEntity transactionAccepted = new TransactionEntity();
//        transactionAccepted.setAmount(transactionRequest.getAmount());
//        transactionAccepted.setIsChecked(false);
//        transactionAccepted.setBankPend(false);
//        transactionAccepted.setSerial(transactionRequest.getSerial());
//        transactionAccepted.setCorporate(transactionRequest.getCorporate());
//        transactionAccepted.setPlace(transactionRequest.getPlace());
//        transactionAccepted.setUser(transactionRequest.getUser());
//        transactionAccepted.setTransactionType(transactionRequest.getTransactionType());
//        transactionAccepted.setDescription(param.getDescription());
//        if (param.getAccept()) {
//            transactionAccepted.setTransactionStatus(TransactionStatus.PAYMENT_COMPLETE);
//            if (transactionRequest.getUser() != null) {
//                UserEntity userEntity = transactionRequest.getUser();
//                userEntity.setBalance(userEntity.getBalance().add(transactionRequest.getAmount()));
//                userRepository.update(userEntity);
//
//                transactionAccepted.setBalance(userEntity.getBalance());
//            } else if (transactionRequest.getPlace() != null) {
//                PlaceEntity placeEntity = transactionRequest.getPlace();
//                placeEntity.setBalance(placeEntity.getBalance().add(transactionRequest.getAmount()));
//                placeRepository.update(placeEntity);
//                transactionAccepted.setBalance(placeEntity.getBalance());
//            } else if (transactionRequest.getCorporate() != null) {
//                CorporateEntity corporateEntity = transactionRequest.getCorporate();
//                //todo fix this shit
////                corporateEntity.setBalance(corporateEntity.getBalance().add(transactionRequest.getAmount()));
//                corporateService.update(corporateEntity);
//                transactionAccepted.setBalance(corporateEntity.getFinanceCorporate().getTotalDeposit());
//            } else {
//                throw new unknownPaymentBuyer();
//            }
//        } else {
//            transactionAccepted.setTransactionStatus(TransactionStatus.PAYMENT_REJECTED);
//            if (transactionRequest.getUser() != null) {
//                transactionAccepted.setBalance(transactionRequest.getUser().getBalance());
//            } else if (transactionRequest.getPlace() != null) {
//                transactionAccepted.setBalance(transactionRequest.getPlace().getBalance());
//            } else if (transactionRequest.getCorporate() != null) {
//                transactionAccepted.setBalance(transactionRequest.getCorporate().getFinanceCorporate().getTotalDeposit());
//            } else {
//                throw new unknownPaymentBuyer();
//            }
//        }
//        transactionRepository.add(transactionAccepted);
//        return true;
//    }

//    @Override
//    @Transactional
//    public Boolean placeSetteling(@NonNull TransactionPlaceSettelingParam transactionParam) {
//        FinanceCorporateTransactionEntity transactionRequest = placeTransactionRepository.getById(transactionParam.getTransactionId());
//        placeTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
//                .serial(transactionRequest.getSerial())
//                .transactionType(TransactionType.PLACE_SETTLEMENT)
//                .transactionStatus(TransactionStatus.PAYMENT_COMPLETE)
//                .place(transactionRequest.getPlace())
//                .balance(transactionRequest.getBalance())
//                .isChecked(false)
//                .description(transactionParam.getTransactionText())
//                .amount(transactionRequest.getAmount())
//                .build());
//        return true;
//    }


    public void PayToPlace(PurchasedSubscribeEntity subscribeEntity) {

        PlacePersonnelEntity beneficiary = subscribeEntity.getTicketSubscribe().getBeneficiary();
        FinanceUserEntity beneficiaryFinance = beneficiary.getUser().getFinanceUser();
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
        FinanceUserEntity beneficiaryFinance = beneficiary.getUser().getFinanceUser();
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
