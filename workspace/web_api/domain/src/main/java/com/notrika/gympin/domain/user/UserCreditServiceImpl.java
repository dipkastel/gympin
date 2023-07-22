package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.enums.CreditType;
import com.notrika.gympin.common.user.param.PaymentParam;
import com.notrika.gympin.common.user.param.UserCreditIncreaseParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.UserCreditService;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.TransactionRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserCreditServiceImpl implements UserCreditService {

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public String increaseUserCredit(UserCreditIncreaseParam userCreditParam) {
        //create transaction with status not payed
        //create payment gateway url
        //return url;
        return "http://shaparak.ir/payment";
    }


    @Override
    public UserCreditDto getCreditsByUser(UserParam userParam) {
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();

//        corporate credits
        List<CorporatePersonnelEntity> personnelEntity = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(userParam.getId());
        for (CorporatePersonnelEntity personnel:personnelEntity){
            UserCreditDetailDto detail = new UserCreditDetailDto();
            detail.setCreditAmount(personnel.getCreditBalance());
            detail.setPersonnelId(personnel.getId());
            detail.setCreditType(CreditType.SPONSOR);
            if(personnel.getCorporate().getBalance().compareTo(personnel.getCreditBalance())>0){
                detail.setCreditPayableAmount(personnel.getCreditBalance());
            }else{
                detail.setCreditPayableAmount(personnel.getCorporate().getBalance());
            }
            detail.setCorporate(CorporateConvertor.toDto(personnel.getCorporate()));
            detalsList.add(detail);
        }

//        user personal credit
        UserEntity user =  userRepository.getById(userParam.getId());
        UserCreditDetailDto detail = new UserCreditDetailDto();
        BigDecimal userDebit = user.getBalance();
        detail.setCreditAmount(userDebit);
        detail.setCreditType(CreditType.PERSONAL);
        detail.setCreditPayableAmount(userDebit);
        detalsList.add(detail);


        result.setCreditDetail(detalsList);
        result.setTotalCredit(detalsList.stream().map(UserCreditDetailDto::getCreditPayableAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }
}
