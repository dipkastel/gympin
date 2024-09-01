package com.notrika.gympin.domain.finance.transaction;

import com.notrika.gympin.common.finance.gateway.service.GatewayBankService;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.UserTransactionService;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionUserServiceImpl extends AbstractBaseService<UserTransactionParam, UserTransactionDto, UserTransactionQuery, FinanceUserTransactionEntity> implements UserTransactionService {


    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    GatewayBankService gatewayBankService;
    @Autowired
    FinanceUserTransactionRepository userTransactionRepository;
    @Autowired
    FinanceUserRepository financeUserRepository;
    @Autowired
    SmsInService smsService;


    @Override
    public UserTransactionDto add(@NonNull UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public UserTransactionDto update(@NonNull UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public UserTransactionDto delete(@NonNull UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public UserTransactionDto getById(long id) {
        return null;
    }


    @Override
    public List<UserTransactionDto> getByUser(Long userId) {
        List<UserTransactionDto> resultList = new ArrayList<>();
        try {
            resultList.addAll(convertToDtos(financeUserRepository.findByUserIdAndDeletedFalse(userId).getTransactionsUser()));
        } catch (Exception e) {
        }
        return resultList;
    }
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
//        userTransactionRepository.add(TransactionEntity.builder()
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
//
//    @Override
//    @Transactional
//    public List<GatewaysDto> getPaymentGateways(GatewaysParam param) {
//        List<GatewaysDto> paymentGatewaysDtos = new ArrayList<>();
//        GatewaysDto cardTransaction = GatewaysDto.builder()
//                .id(90l)
//                .name("کارت به کارت")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=18")
//                .gatewayType(GatewayType.CARD_TRANSFER)
//                .description("شماره کارت جهت واریز مبلغ 6221061225406448 به نام پیشکامان داده نوتریکا")
//                .build();
//        GatewaysDto bankTransaction = GatewaysDto.builder()
//                .id(95l)
//                .name("پرداخت بانکی")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=15")
//                .gatewayType(GatewayType.BANK_TRANSFER)
//                .description("مبالغ از طریق باجه بانک به حساب : 88548550505 بانک پارسیان با شماره شبای : 540540840450 در وجه پیشکامان داده نوتریکا")
//                .build();
//        GatewaysDto chequeTransaction = GatewaysDto.builder()
//                .id(98l)
//                .name("چک")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=13")
//                .gatewayType(GatewayType.CHEQUE)
//                .description("چک باید در وجه پیشکامان داده نوتریکا به شماره ثبت 885215 ")
//                .build();
//        GatewaysDto parsianGatway = GatewaysDto.builder()
//                .id(80l)
//                .name("درگاه پارسیان")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=16")
//                .gatewayType(GatewayType.BANK_PORTAL)
//                .build();
//        GatewaysDto mellatGatway = GatewaysDto.builder()
//                .id(81l)
//                .name("ملت")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=16")
//                .gatewayType(GatewayType.BANK_PORTAL)
//                .build();
//        GatewaysDto samanGatway = GatewaysDto.builder()
//                .id(82l)
//                .name("سامان")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=16")
//                .gatewayType(GatewayType.BANK_PORTAL)
//                .build();
//
//        switch (param.getApplication()) {
//            case ANDROID:
//                break;
//            case IOS:
//                break;
//            case WEBPANEL:
//                break;
//            case WEBAPP:
//                paymentGatewaysDtos.add(defaultGetway(parsianGatway));
//                paymentGatewaysDtos.add(cardTransaction);
//                break;
//            case WEBMASTER:
//                break;
//            case WEBCORPORATE:
//                paymentGatewaysDtos.add(defaultGetway(parsianGatway));
//                paymentGatewaysDtos.add(bankTransaction);
//                break;
//        }
//
//        return paymentGatewaysDtos;
//    }
//
//    private GatewaysDto defaultGetway(GatewaysDto gatway) {
//        gatway.setIsDefault(true);
//        return gatway;
//    }
//
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
//            String callbackUrl = "https://api.gympin.ir/v1/parsianGateway/persianCallbackMethod?ref=" + getStringType(param.getTransactionType());
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
//                gatwayresult = gatewayParsianService.salePaymentRequest(requestData);
//            } catch (Exception e) {
//                throw new GatewayIsNotAvalable();
//            }
//            if (gatwayresult == null) {
//                throw new GatewayIsNotAvalable();
//            } else if (gatwayresult.getStatus() == 0 && gatwayresult.getToken() > 0) {
//                transaction.setDescription(transaction.getDescription() + " - توکن بانک " + gatwayresult.getToken());
//                userTransactionRepository.update(transaction);
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
//
//    private String getStringType(TransactionType transactionType) {
//        switch (transactionType) {
//            case CHARGE_CORPORATE:
//                return "WEBCORPORATE";
//            case CHARGE_USER:
//                return "WEBAPP";
//            case CHARGE_PLACE:
//                return "WEBPLACE";
//            default:
//                return "UNKNOWN";
//        }
//    }
//
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
//        return userTransactionRepository.add(transaction);
//    }
//
//    @Override
//    @Transactional
//    public void CalculatePayment(Long transactionId, Boolean TransactionResult, String description, String additionalDescription) throws Exception {
//        TransactionEntity transactionRequest = null;
//        try {
//            transactionRequest = userTransactionRepository.getById(transactionId);
//        } catch (Exception e) {
//        }
//        if (transactionRequest == null)
//            throw new TransactionNotFound();
//
//        List<TransactionEntity> transactionsByThisSerial = userTransactionRepository.findAllBySerialAndDeletedFalse(transactionRequest.getSerial());
//        if (transactionsByThisSerial.size() > 1) {
//            throw new TransactionAlreadyChecked();
//        }
//
//
//        TransactionEntity transaction = new TransactionEntity();
//        transaction.setAmount(transactionRequest.getAmount());
//
//        transaction.setTransactionStatus((TransactionResult) ? TransactionStatus.PAYMENT_COMPLETE : TransactionStatus.PAYMENT_REJECTED);
//        transaction.setIsChecked(transactionRequest.getIsChecked());
//        transaction.setBankPend(transactionRequest.getBankPend());
//        transaction.setSerial(transactionRequest.getSerial());
//        transaction.setDescription(description + additionalDescription);
//
//        if (transactionRequest.getUser() != null) {
//            UserEntity userEntity = transactionRequest.getUser();
//            transaction.setTransactionType(TransactionType.CHARGE_USER);
//            transaction.setUser(userEntity);
//            if (TransactionResult) {
//                userEntity.setBalance(userEntity.getBalance().add(transactionRequest.getAmount()));
//                userRepository.update(userEntity);
//            }
//            transaction.setBalance(userEntity.getBalance());
//            try {
//                smsService.sendUserTransactionComplete(
//                        SmsDto.builder()
//                                .smsType(SmsTypes.USER_CHARGE)
//                                .userNumber(userEntity.getPhoneNumber())
//                                .text1(transactionRequest.getAmount().toString())
//                                .build()
//                );
//            } catch (Exception e) {
//            }
//        } else if (transactionRequest.getPlace() != null) {
//            PlaceEntity placeEntity = transactionRequest.getPlace();
//            transaction.setTransactionType(TransactionType.CHARGE_PLACE);
//            transaction.setPlace(placeEntity);
//            if (TransactionResult) {
//                placeEntity.setBalance(placeEntity.getBalance().add(transactionRequest.getAmount()));
//                placeRepository.update(placeEntity);
//            }
//            transaction.setBalance(placeEntity.getBalance());
//        } else if (transactionRequest.getCorporate() != null) {
//            CorporateEntity corporateEntity = transactionRequest.getCorporate();
//            transaction.setTransactionType(TransactionType.CHARGE_CORPORATE);
//            transaction.setCorporate(corporateEntity);
//            if (TransactionResult) {
//                //todo fix this shit
////                corporateEntity.setFinanceCorporate(corporateEntity.getFinanceCorporate().getTotalDeposit().add(transactionRequest.getAmount()));
//                corporateService.update(corporateEntity);
//            }
//            transaction.setBalance(corporateEntity.getFinanceCorporate().getTotalDeposit());
//            try {
//                List<UserEntity> corporateAdmins = corporateEntity.getPersonnel().stream().filter(p -> p.getRole() == CorporatePersonnelRoleEnum.ADMIN).map(p -> p.getUser()).collect(Collectors.toList());
//                for (UserEntity corporateAdmin : corporateAdmins) {
//                    smsService.sendCorporateTransactionComplete(
//                            SmsDto.builder()
//                                    .smsType(SmsTypes.CORPORATE_CHARGE)
//                                    .userNumber(corporateAdmin.getPhoneNumber())
//                                    .text1(transactionRequest.getAmount().toString())
//                                    .build()
//                    );
//                }
//            } catch (Exception e) {
//            }
//
//        } else {
//            throw new unknownPaymentBuyer();
//        }
//        userTransactionRepository.add(transaction);
//    }
//
//    @Override
//    @Transactional
//    public Boolean handCheckPayment(CheckPaymentParam param) {
//        List<TransactionEntity> transactionsList = userTransactionRepository.findAllBySerialAndDeletedFalse(param.getSerial());
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
//        userTransactionRepository.add(transactionAccepted);
//        return true;
//    }
//
//    @Override
//    @Transactional
//    public Boolean placeSetteling(@NonNull TransactionPlaceSettelingParam transactionParam) {
//        TransactionEntity transactionRequest = userTransactionRepository.getById(transactionParam.getTransactionId());
//        userTransactionRepository.add(TransactionEntity.builder()
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


    @Override
    public FinanceUserTransactionEntity add(FinanceUserTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceUserTransactionEntity update(FinanceUserTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceUserTransactionEntity delete(FinanceUserTransactionEntity entity) {
        return null;
    }

    @Override
    public FinanceUserTransactionEntity getEntityById(long id) {
        return userTransactionRepository.getById(id);
    }

    @Override
    public List<FinanceUserTransactionEntity> getAll(Pageable pageable) {
        return userTransactionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceUserTransactionEntity> findAll(Specification<FinanceUserTransactionEntity> specification, Pageable pageable) {
        return userTransactionRepository.findAll(specification, pageable);
    }

    @Override
    public List<UserTransactionDto> convertToDtos(List<FinanceUserTransactionEntity> entities) {
        return entities.stream().map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<UserTransactionDto> convertToDtos(Page<FinanceUserTransactionEntity> entities) {
        return entities.map(TransactionConvertor::toDto);
    }
}
