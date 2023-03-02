package com.notrika.gympin.domain.transaction;

import com.notrika.gympin.common.exception.transactions.*;
import com.notrika.gympin.common.transaction.dto.PaymentGatewaysDto;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.transaction.enums.GatwayType;
import com.notrika.gympin.common.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.transaction.enums.TransactionType;
import com.notrika.gympin.common.transaction.param.*;
import com.notrika.gympin.common.transaction.query.TransactionQuery;
import com.notrika.gympin.common.transaction.service.TransactionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.TransactionRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl extends AbstractBaseService<TransactionParam, TransactionDto, TransactionQuery, TransactionEntity> implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CorporateRepository corporateRepository;

    @Override
    public TransactionDto add(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto update(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto delete(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto getById(long id) {
        return null;
    }


    @Override
    public List<TransactionDto> getByPlace(Long PlaceId) {
        List<TransactionDto> resultList = new ArrayList<>();
        try{
            resultList.addAll(convertToDtos(transactionRepository.findAllByPlaceIdAndDeletedFalse(PlaceId)));
        }catch (Exception e){}
        return resultList;
    }

    @Override
    public List<TransactionDto> getByCorporate(Long corporateId) {
        List<TransactionDto> resultList = new ArrayList<>();
        try{
            resultList.addAll(convertToDtos(transactionRepository.findAllByCorporateIdAndDeletedFalse(corporateId)));
        }catch (Exception e){}
        return resultList;
    }

    @Override
    public List<TransactionDto> getByUser(Long userId) {
        List<TransactionDto> resultList = new ArrayList<>();
        try{
            resultList.addAll(convertToDtos(transactionRepository.findAllByUserIdAndDeletedFalse(userId)));
        }catch (Exception e){}
        return resultList;
    }

    @Override
    public List<TransactionDto> getByPersonel(Long personnelId) {

        List<TransactionDto> resultList = new ArrayList<>();
        try{
            resultList.addAll(convertToDtos(transactionRepository.findAllByCorporatePersonnelIdAndDeletedIsFalse(personnelId)));
        }catch (Exception e){}
        return resultList;
    }

    @Override
    @Transactional
    public Boolean settlementRequest(PlaceSettlementRequestParam param) {
        PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
        if (param.getAmount().compareTo(placeEntity.getBalance()) > 0)
            throw new RequestOverCreditLimit();
        if (param.getAmount().compareTo(BigDecimal.valueOf(50000)) < 0)
            throw new RequestUnderLimit();
        placeEntity.setBalance(placeEntity.getBalance().subtract(param.getAmount()));
        placeRepository.update(placeEntity);
        transactionRepository.add(TransactionEntity.builder()
                .place(placeEntity)
                .balance(placeEntity.getBalance())
                .amount(param.getAmount().negate())
                .transactionStatus(TransactionStatus.REQUEST)
                .transactionType(TransactionType.PLACE_SETTLEMENT)
                .isChecked(false)
                .serial(java.util.UUID.randomUUID().toString())
                .build());
        return true;
    }

    @Override
    @Transactional
    public List<PaymentGatewaysDto> getPaymentGateways(PaymentGatewaysParam param) {
        List<PaymentGatewaysDto> paymentGatewaysDtos = new ArrayList<>();
//        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
//                .id(80l)
//                .name("درگاه پارسیان")
//                .imageUrl("https://api.gympin.ir/resource/image?Id=5")
//                .gatewayType(GatwayType.BANK_PORTAL)
//                .isDefault(true)
//                .build());
//        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
//                .id(81l)
//                .name("ملت")
//                .imageUrl("http://localhost:8080/resource/image?Id=15")
//                .gatewayType(GatwayType.BANK_PORTAL)
//                .build());
//        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
//                .id(82l)
//                .name("سامان")
//                .imageUrl("http://localhost:8080/resource/image?Id=16")
//                .gatewayType(GatwayType.BANK_PORTAL)
//                .isDefault(true)
//                .build());
        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
                .id(90l)
                .name("کارت به کارت")
                .isDefault(true)
                .imageUrl("https://api.gympin.ir/resource/image?Id=18")
                .gatewayType(GatwayType.CARD_TRANSFER)
                .description("شماره کارت جهت واریز مبلغ 6221061225406448 به نام پیشکامان داده نوتریکا")
                .build());
        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
                .id(95l)
                .name("پرداخت بانکی")
                .imageUrl("https://api.gympin.ir/resource/image?Id=15")
                .gatewayType(GatwayType.BANK_TRANSFER)
                .description("مبالغ از طریق باجه بانک به حساب : 88548550505 بانک پارسیان با شماره شبای : 540540840450 در وجه پیشکامان داده نوتریکا")
                .build());
        paymentGatewaysDtos.add(PaymentGatewaysDto.builder()
                .id(98l)
                .name("چک")
                .imageUrl("https://api.gympin.ir/resource/image?Id=13")
                .gatewayType(GatwayType.CHEQUE)
                .description("چک باید در وجه پیشکامان داده نوتریکا به شماره ثبت 885215 ")
                .build());
        return paymentGatewaysDtos;
    }

    @Override
    @Transactional
    public String setPaymentRequest(PaymentRequestParam param) {
        var serial = java.util.UUID.randomUUID().toString();
        var result = "";

        if (param.getSelectedPaymentType() == null)
            throw new unknownPaymentType();
        if (param.getTransactionType() == null)
            throw new unknownTransactionType();
        if (!param.getTransactionType().toString().startsWith("CHARGE"))
            throw new unsupportedTransactionType();

        TransactionEntity transaction = new TransactionEntity();


        if (param.getSelectedPaymentType() == 80L) {
            //ToDo change with real gateway url
            result = "http://localhost:3025/checkout/" + serial;
            transaction.setDescription("پرداخت از درگاه -- ");
        } else if (param.getSelectedPaymentType() == 81L) {
            //ToDo change with real gateway url
            result = "http://localhost:3025/checkout/" + serial;
            transaction.setDescription("پرداخت از درگاه -- ");
        } else if (param.getSelectedPaymentType() == 82L) {
            //ToDo change with real gateway url
            result = "http://localhost:3025/checkout/" + serial;
            transaction.setDescription("پرداخت از درگاه -- ");
        } else if (param.getSelectedPaymentType() == 90L) {
            result = serial.split("-")[0];
            transaction.setDescription("پرداخت کارت به کارت با شماره تراکنش : "+param.getTransactionReference());
        } else  if (param.getSelectedPaymentType() == 95L) {
            result = serial.split("-")[0];
            transaction.setDescription("پرداخت بانکی با شماره تراکنش : "+param.getTransactionReference());
        } else  if (param.getSelectedPaymentType() == 98L) {
            result = serial.split("-")[0];
            transaction.setDescription("پرداخت چک با شماره سریال :"+param.getTransactionReference()+" و تاریخ :"+param.getChequeDate());
        } else {
            throw new unknownPaymentType();
        }

        transaction.setTransactionType(param.getTransactionType());
        transaction.setAmount(param.getAmount());
        transaction.setTransactionStatus(TransactionStatus.REQUEST);
        transaction.setSerial(serial);
        transaction.setIsChecked(false);

        if (param.getUserId() != null) {
            UserEntity userEntity = userRepository.getById(param.getUserId());
            transaction.setUser(userEntity);
            transaction.setBalance(userEntity.getBalance());
        } else if (param.getPlaceId() != null) {
            PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
            transaction.setPlace(placeEntity);
            transaction.setBalance(placeEntity.getBalance());
        } else if (param.getCorporateId() != null) {
            CorporateEntity corporateEntity = corporateRepository.getById(param.getCorporateId());
            transaction.setCorporate(corporateEntity);
            transaction.setBalance(corporateEntity.getBalance());
        } else {
            throw new unknownPaymentBuyer();
        }

        transactionRepository.add(transaction);

        return result;
    }

    @Override
    @Transactional
    public Boolean checkPayment(CheckPaymentParam param) {
        List<TransactionEntity> transactionsList = transactionRepository.findAllBySerialAndDeletedFalse(param.getSerial());
        if (transactionsList.isEmpty())
            throw new TransactionNotFound();
        if (transactionsList.size() > 1) {
            throw new TransactionAlreadyChecked();
        }
        TransactionEntity transactionRequest = transactionsList.get(0);

        //TODO check Payment by bank and create payment transaction
        if(true) {//TODO bank accepted
            TransactionEntity transactionAccepted = new TransactionEntity();
            transactionAccepted.setAmount(transactionRequest.getAmount());
            transactionAccepted.setTransactionStatus(TransactionStatus.PAYMENT_COMPLETE);
            transactionAccepted.setIsChecked(false);
            transactionAccepted.setSerial(transactionRequest.getSerial());

            if (transactionRequest.getUser() != null) {
                UserEntity userEntity = transactionRequest.getUser();
                transactionAccepted.setTransactionType(TransactionType.CHARGE_USER);
                transactionAccepted.setUser(userEntity);
                userEntity.setBalance(userEntity.getBalance().add(transactionRequest.getAmount()));
                userRepository.update(userEntity);
                transactionAccepted.setBalance(userEntity.getBalance());
            } else if (transactionRequest.getPlace() != null) {
                PlaceEntity placeEntity = transactionRequest.getPlace();
                transactionAccepted.setTransactionType(TransactionType.CHARGE_USER);
                transactionAccepted.setPlace(placeEntity);
                placeEntity.setBalance(placeEntity.getBalance().add(transactionRequest.getAmount()));
                placeRepository.update(placeEntity);
                transactionAccepted.setBalance(placeEntity.getBalance());
            } else if (transactionRequest.getCorporate() != null) {
                CorporateEntity corporateEntity = transactionRequest.getCorporate();
                transactionAccepted.setTransactionType(TransactionType.CHARGE_USER);
                transactionAccepted.setCorporate(corporateEntity);
                corporateEntity.setBalance(corporateEntity.getBalance().add(transactionRequest.getAmount()));
                corporateRepository.update(corporateEntity);
                transactionAccepted.setBalance(corporateEntity.getBalance());
            } else {
                throw new unknownPaymentBuyer();
            }
            transactionRepository.add(transactionAccepted);
            return true;
        }else return false;
    }

    @Override
    @Transactional
    public Boolean placeSetteling(@NonNull TransactionPlaceSettelingParam transactionParam) {
        TransactionEntity transactionRequest = transactionRepository.getById(transactionParam.getTransactionId());
        transactionRepository.add(TransactionEntity.builder()
                .serial(transactionRequest.getSerial())
                .transactionType(TransactionType.PLACE_SETTLEMENT)
                .transactionStatus(TransactionStatus.PAYMENT_COMPLETE)
                .place(transactionRequest.getPlace())
                .balance(transactionRequest.getBalance())
                .isChecked(false)
                .description(transactionParam.getTransactionText())
                .amount(transactionRequest.getAmount())
                .build());
        return true;
    }


    @Override
    public TransactionEntity add(TransactionEntity entity) {
        return null;
    }

    @Override
    public TransactionEntity update(TransactionEntity entity) {
        return null;
    }

    @Override
    public TransactionEntity delete(TransactionEntity entity) {
        return null;
    }

    @Override
    public TransactionEntity getEntityById(long id) {
        return transactionRepository.getById(id);
    }

    @Override
    public List<TransactionEntity> getAll(Pageable pageable) {
        return transactionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TransactionEntity> findAll(Specification<TransactionEntity> specification, Pageable pageable) {
        return transactionRepository.findAll(specification, pageable);
    }

    @Override
    public List<TransactionDto> convertToDtos(List<TransactionEntity> entities) {
        return entities.stream().map(TransactionConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TransactionDto> convertToDtos(Page<TransactionEntity> entities) {
        return entities.map(TransactionConvertor::toDto);
    }
}
