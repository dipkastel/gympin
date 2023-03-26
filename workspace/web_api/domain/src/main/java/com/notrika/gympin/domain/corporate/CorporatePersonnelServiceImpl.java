package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.exception.general.SendSmsException;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.AccountServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CorporatePersonnelServiceImpl extends AbstractBaseService<CorporatePersonnelParam, CorporatePersonnelDto, BaseQuery<?>, CorporatePersonnelEntity> implements CorporatePersonnelService {

    @Autowired
    private CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private AccountServiceImpl accountService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SmsService smsService;

    @Override
    public CorporatePersonnelDto add(@NonNull CorporatePersonnelParam Param) {

        UserEntity user = userRepository.findByPhoneNumber(Param.getPhoneNumber());
        CorporateEntity corporate = corporateRepository.getById(Param.getCorporate().getId());
        if(user==null) {
            user = accountService.addUser(UserRegisterParam.builder().phoneNumber(Param.getPhoneNumber()).userRole(UserRoleParam.builder().role(UserRole.USER).build()).build());
        }else{
            //check for duplication
            UserEntity finalUser = user;
            if(corporate.getPersonnel().stream().anyMatch(p-> Objects.equals(p.getUser().getId(), finalUser.getId())))
                throw new DuplicateEntryAddExeption();
        }

        CorporatePersonnelEntity corporatePersonnelEntity = CorporatePersonnelEntity.builder()
                .corporate(corporate)
                .user(user)
                .role(CorporatePersonnelRoleEnum.PERSONEL)
                .creditBalance(BigDecimal.ZERO)
                .build();
        corporatePersonnelRepository.add(corporatePersonnelEntity);

        try {
            smsService.sendJoinedToCorporateSms(new SmsDto(user.getPhoneNumber(), SmsTypes.JOINED_TO_CORPORATE,corporate.getName()));
        } catch (Exception e) {
            throw new SendSmsException();
        }
        return CorporateConvertor.toPersonnelDto(corporatePersonnelEntity);
    }

    @Override
    public CorporatePersonnelDto update(@NonNull CorporatePersonnelParam corporatePersonnelParam) {
        CorporatePersonnelEntity entity = corporatePersonnelRepository.getById(corporatePersonnelParam.getId());
        entity.setRole(corporatePersonnelParam.getRole());
        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.update(entity));
    }

    @Override
    public CorporatePersonnelDto delete(@NonNull CorporatePersonnelParam corporateParam) {
        CorporatePersonnelEntity entity = corporatePersonnelRepository.getById(corporateParam.getId());
        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.deleteById2(entity));
    }

    @Override
    public CorporatePersonnelDto getById(long id) {
        return CorporateConvertor.toSecurePersonnelDto(corporatePersonnelRepository.getById(id));
    }

    @Override
    public CorporatePersonnelEntity add(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.add(entity);
    }

    @Override
    public CorporatePersonnelEntity update(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.update(entity);
    }

    @Override
    public CorporatePersonnelEntity delete(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.deleteById2(entity);
    }

    @Override
    public CorporatePersonnelEntity getEntityById(long id) {
        return corporatePersonnelRepository.getById(id);
    }

    @Override
    public List<CorporatePersonnelEntity> getAll(Pageable pageable) {
        return corporatePersonnelRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CorporatePersonnelEntity> findAll(Specification<CorporatePersonnelEntity> specification, Pageable pageable) {
        return corporatePersonnelRepository.findAll(specification,pageable);
    }

    @Override
    public List<CorporatePersonnelDto> convertToDtos(List<CorporatePersonnelEntity> entities) {
        return entities.stream().map(CorporateConvertor::toPersonnelDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporatePersonnelDto> convertToDtos(Page<CorporatePersonnelEntity> entities) {
        return entities.map(CorporateConvertor::toPersonnelDto);
    }

    @Override
    public List<CorporatePersonnelDto> getPersonnelByCorporate(CorporateParam corporateParam) {
        CorporateEntity corporate = corporateRepository.getById(corporateParam.getId());
        return corporatePersonnelRepository.findByCorporateAndDeletedIsFalse(corporate).stream().map(CorporateConvertor::toSecurePersonnelDto).collect(Collectors.toList());
    }
}
