package com.notrika.gympin.domain.finance.affiliate;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateTPRegisterDto;
import com.notrika.gympin.common.finance.affiliate.enums.AffiliatorStatus;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddCorporateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddPlaceParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateTPRegisterParam;
import com.notrika.gympin.common.finance.affiliate.query.AffiliateQuery;
import com.notrika.gympin.common.finance.affiliate.service.AffiliateService;
import com.notrika.gympin.common.place.personnel.service.PlacePersonnelService;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.exception.affiliate.AffiliateAuthException;
import com.notrika.gympin.common.util.exception.affiliate.AffiliatorHasNotThisCorporateException;
import com.notrika.gympin.common.util.exception.corporate.CorporateContractIsNotComplete;
import com.notrika.gympin.common.util.exception.corporate.CorporateNotFoundException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.util.exception.user.UserPhoneNumberRequiredException;
import com.notrika.gympin.common.util.exception.user.UserPhoneNumberValidationException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.place.PlaceGymServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.AffiliateConvertor;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceAffiliateRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.affiliate.FinanceAffiliatorEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class AffiliateServiceImpl extends AbstractBaseService<AffiliateParam, AffiliateDto, AffiliateQuery, FinanceAffiliatorEntity> implements AffiliateService {



    @Autowired
    UserServiceImpl userService;

    @Autowired
    PlaceGymServiceImpl placeService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CorporateServiceImpl CorporateService;

    @Autowired
    CorporateRepository corporateRepository;

    @Autowired
    PlacePersonnelService placePersonnelService;

    @Autowired
    CorporatePersonnelService corporatePersonnelService;

    @Autowired
    FinanceAffiliateRepository financeAffiliateRepository;

    @Autowired
    CorporatePersonnelCreditService corporatePersonnelCreditService;

    @Override
    @Transactional
    public AffiliateDto add(@NonNull AffiliateParam param) {
        UserEntity user = userService.getEntityById(param.getUser().getId());
        if(user==null){
            throw new UnknownUserException();
        }
        FinanceAffiliatorEntity affiliator = FinanceAffiliatorEntity.builder()
                .commissionFee(param.getCommissionFee())
                .username(param.getUsername())
                .password(param.getPassword())
                .affiliatorStatus(AffiliatorStatus.ACTIVE)
                .income(BigDecimal.ZERO)
                .user(user)
                .build();
        add(affiliator);
        return AffiliateConvertor.toDto(affiliator);
    }


    @Override
    public AffiliateDto update(@NonNull AffiliateParam param) {
        FinanceAffiliatorEntity affiliator = getEntityById(param.getId());
        if(param.getCommissionFee()!=null)
            affiliator.setCommissionFee(param.getCommissionFee());
        if(param.getUsername()!=null)
            affiliator.setUsername(param.getUsername());
        if(param.getPassword()!=null)
            affiliator.setPassword(passwordEncoder.encode(param.getPassword()));
        if(param.getStatus()!=null)
            affiliator.setAffiliatorStatus(param.getStatus());
        update(affiliator);
        return AffiliateConvertor.toDto(affiliator);
    }

    @Override
    public AffiliateDto delete(@NonNull AffiliateParam param) {
        FinanceAffiliatorEntity affiliator = getEntityById(param.getId());
        return AffiliateConvertor.toDto(financeAffiliateRepository.deleteById2(affiliator));
    }

    @Override
    public AffiliateDto getById(long id) {
        return AffiliateConvertor.toDto(financeAffiliateRepository.getById(id));
    }


    @Override
    public FinanceAffiliatorEntity add(FinanceAffiliatorEntity entity) {
        return financeAffiliateRepository.add(entity);
    }

    @Override
    public FinanceAffiliatorEntity update(FinanceAffiliatorEntity entity) {
        return financeAffiliateRepository.update(entity);
    }

    @Override
    public FinanceAffiliatorEntity delete(FinanceAffiliatorEntity entity) {
        return financeAffiliateRepository.deleteById2(entity);
    }

    @Override
    public FinanceAffiliatorEntity getEntityById(long id) {
        return financeAffiliateRepository.getById(id);
    }

    @Override
    public List<FinanceAffiliatorEntity> getAll(Pageable pageable) {
        return financeAffiliateRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceAffiliatorEntity> findAll(Specification<FinanceAffiliatorEntity> specification, Pageable pageable) {
        return financeAffiliateRepository.findAll(specification,pageable);
    }

    @Override
    public List<AffiliateDto> convertToDtos(List<FinanceAffiliatorEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(AffiliateConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<AffiliateDto> convertToDtos(Page<FinanceAffiliatorEntity> entities) {
        return entities.map(AffiliateConvertor::toDto);
    }


    private FinanceAffiliatorEntity getAffiliator(HttpServletRequest request){
        try{
            String username = request.getHeader("username");
            String password = request.getHeader("password");
            FinanceAffiliatorEntity affiliator = financeAffiliateRepository.findByUsernameAndDeletedIsFalse(username);
            if(!passwordEncoder.matches(password,affiliator.getPassword()))
                throw new AffiliateAuthException();
            return affiliator;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    @Transactional
    public CorporateDto AddCorporatesToAffiliator(AffiliateAddCorporateParam param){
        FinanceAffiliatorEntity affiliator = getEntityById(param.getId());
        CorporateEntity corporate = CorporateService.getEntityById(param.getCorporate().getId());
        corporate.setAffiliator(affiliator);
        CorporateService.update(corporate);
    return CorporateConvertor.toDto(corporate);

    }
    @Override
    @Transactional
    public CorporateDto RemoveCorporatesToAffiliator(AffiliateAddCorporateParam param){
        CorporateEntity corporate = CorporateService.getEntityById(param.getCorporate().getId());
        corporate.setAffiliator(null);
        CorporateService.update(corporate);
    return CorporateConvertor.toDto(corporate);

    }
    @Override
    @Transactional
    public List<CorporateDto> getCorporatesByAffiliatorId(Long id){
        FinanceAffiliatorEntity entity = financeAffiliateRepository.getById(id);
    return entity.getCorporates().stream().map(CorporateConvertor::toDto).collect(Collectors.toList());

    }

    @Override
    @Transactional
    public PlaceGymDto AddPlaceToAffiliator(AffiliateAddPlaceParam param){
        FinanceAffiliatorEntity affiliator = getEntityById(param.getId());
        PlaceGymEntity place = placeService.getEntityById(param.getPlace().getId());
        place.setAffiliator(affiliator);
        placeService.update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    @Transactional
    public PlaceGymDto RemovePlaceToAffiliator(AffiliateAddPlaceParam param){
        PlaceGymEntity place = placeService.getEntityById(param.getPlace().getId());
        place.setAffiliator(null);
        placeService.update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    @Transactional
    public List<PlaceGymDto> getPlacesByAffiliatorId(Long id){
        FinanceAffiliatorEntity entity = financeAffiliateRepository.getById(id);
        return entity.getPlaces().stream().map(PlaceConvertor::toDtoSecureGym).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AffiliateTPRegisterDto tpRegister(HttpServletRequest request, AffiliateTPRegisterParam param) throws Exception {

        FinanceAffiliatorEntity affiliator = getAffiliator(request);
        AffiliateTPRegisterDto result =  new AffiliateTPRegisterDto();
        if(affiliator == null)
            throw new AffiliateAuthException();
        if(param.getUserPhoneNumber()==null)
            throw new UserPhoneNumberRequiredException();
        Pattern pattern = Pattern.compile("^(\\+98|0)?9\\d{9}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(param.getUserPhoneNumber());
        if(!matcher.matches())
            throw new UserPhoneNumberValidationException();
        //register user
        String userPhoneNumber = GeneralHelper.fixPhoneNumber(param.getUserPhoneNumber());
        var user = userService.getByPhoneNumber(userPhoneNumber);
        if(user==null)
            user = userService.addUser(UserParam.builder()
                    .phoneNumber(userPhoneNumber)
                    .fullName(param.getUserFullName())
                    .birthday(param.getUserBirthday())
                    .gender(param.getUserGender())
                    .email(param.getUserEmail())
                    .nationalCode(param.getUserNationalCode())
                    .build()
            );

        //register personnel
        if (param.getCorporateCode()==null)
            throw new CorporateNotFoundException();
        Long corporateId =GeneralHelper.CodeToId(param.getCorporateCode());
        if(corporateId==null)
            throw new CorporateNotFoundException();
        CorporateEntity corporate = corporateRepository.getById(corporateId);
        if(affiliator.getCorporates().stream().noneMatch(c->c.getId().equals(corporateId)))
            throw new AffiliatorHasNotThisCorporateException();
        CorporatePersonnelDto personnel =corporatePersonnelService.getPersonnelByCorporateIdAndUserId(corporateId,user.getId());
        if(personnel==null) {
            //add user to corporate
            personnel = corporatePersonnelService.add(CorporatePersonnelParam.builder().corporate(CorporateParam.builder().id(corporateId).build()).phoneNumber(userPhoneNumber).build());
        }
        //add credit
        if(param.getAmount().compareTo(BigDecimal.ONE)>0){
            if(corporate.getContractDate()==null)
                throw new CorporateContractIsNotComplete();
            Date expiredate = param.getCreditExpire()!=null? param.getCreditExpire():corporate.getContractDate();
            CorporatePersonnelCreditDto corporatePersonnelCreditDto =  corporatePersonnelCreditService.add(CorporatePersonnelCreditParam.builder()
                    .personnel(CorporatePersonnelParam.builder().id(personnel.getId()).build())
                    .corporateId(corporateId)
                    .creditAmount(param.getAmount())
                    .expireDate(expiredate)
                    .name("اعتبار "+affiliator.getUser().getFullName())
                    .build()
            );
        }
        personnel.getTotalCredit();
        result.setCorporateName(corporate.getName());
        result.setUserPhoneNumber(user.getPhoneNumber());
        result.setUserTotalCredit(personnel.getTotalCredit());
        return result;
    }

}
