package com.notrika.gympin.domain.support;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.support.query.SupportQuery;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.support.service.SupportService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SupportConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.support.SupportMessageRepository;
import com.notrika.gympin.persistence.dao.repository.support.SupportRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.support.SupportMessagesEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportServiceImpl extends AbstractBaseService<SupportParam, SupportDto, SupportQuery, SupportEntity> implements SupportService {

    @Autowired
    SupportRepository supportRepository;

    @Autowired
    SupportMessageRepository supportMessageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    CorporateRepository corporateRepository;

    @Autowired
    SmsInService smsService;


    @Override
    @Transactional
    public SupportDto add(@NonNull SupportParam supportParam) {
        SupportEntity supportEntity = new SupportEntity();
        supportEntity.setTitle(supportParam.getTitle());;
        if (supportParam.getPlaceId() != null) {
            PlaceEntity place = placeRepository.getById(supportParam.getPlaceId());
            supportEntity.setPlace(place);
        }

        if (supportParam.getUserId() != null) {
            UserEntity user = userRepository.getById(supportParam.getUserId());
            supportEntity.setUser(user);
        }

        if (supportParam.getCorporateId() != null) {
            CorporateEntity corporate = corporateRepository.getById(supportParam.getCorporateId());
            supportEntity.setCorporate(corporate);
        }

        supportEntity.setSupportStatus(SupportStatus.AWAITING_EXPERT);

        SupportMessagesEntity supportMessagesEntity = new SupportMessagesEntity();
        supportMessagesEntity.setSupportMessage(supportParam.getSupportMessages().getMessages());
        supportMessagesEntity.setIsRead(supportParam.getSupportMessages().isRead());
        supportEntity.setSupportMessages(List.of(supportMessagesEntity));
        supportRepository.add(supportEntity);
        supportMessagesEntity.setSupport(supportEntity);
        return SupportConvertor.toDto(supportMessageRepository.add(supportMessagesEntity).getSupport());
    }

    @Override
    public SupportDto addMessageToSupport(@NonNull SupportMessageParam param) throws Exception {
        SupportMessagesEntity tme = new SupportMessagesEntity();
        tme.setSupportMessage(param.getMessages());

        tme.setAnswer(param.isAnswer());
        tme.setIsRead(param.isRead());
        SupportEntity support = supportRepository.getById(param.getSupportId());
        support.setSupportStatus(param.getStatus());
        supportRepository.update(support);
        tme.setSupport(support);
        supportMessageRepository.saveAll(support.getSupportMessages());
        try {
            if (param.isAnswer()) {
                UserEntity user = (tme.getSupport().getUser()!=null)?tme.getSupport().getUser():tme.getSupport().getPlace().getPlaceOwners().stream().filter(po->po.getPlacePersonnelRoles().stream().anyMatch(ppp->ppp.getRole()== PlacePersonnelRoleEnum.PLACE_OWNER)&&!po.isDeleted()).findFirst().get().getUser();
                smsService.sendSupportAnswered(SmsDto.builder()
                        .smsType(SmsTypes.SUPPORT_ANSWERED)
                        .userNumber(user.getPhoneNumber())
                        .text1(support.getId().toString())
                        .build()
                );
            }
        } catch (Exception e) {
        }
        return SupportConvertor.toDto(supportMessageRepository.add(tme).getSupport());
    }

    @Override
    public List<SupportDto> getByUser(UserParam param) {
        UserEntity user = userRepository.getById(param.getId());
        return SupportConvertor.toDto(supportRepository.findAllByDeletedIsFalseAndUser(user));
    }

    @Override
    public List<SupportDto> getByPlace(PlaceParam param) {
        PlaceEntity place = placeRepository.getById(param.getId());
        return SupportConvertor.toDto(supportRepository.findAllByDeletedIsFalseAndPlace(place));
    }

    @Override
    public List<SupportDto> getByCorporate(CorporateParam param) {
        CorporateEntity corporate = corporateRepository.getById(param.getId());
        return SupportConvertor.toDto(supportRepository.findAllByDeletedIsFalseAndCorporate(corporate));
    }

    @Override
    public Long getCorporateSupportCount(CorporateParam param) {
        CorporateEntity corporate = corporateRepository.getById(param.getId());
        return supportRepository.findAllByDeletedIsFalseAndCorporate(corporate).stream().map(c->c.getSupportMessages().stream().anyMatch(sm->!sm.getIsRead())).filter(d->d.booleanValue()).count();
    }


    @Override
    public Boolean setMessagesReadById(Long id) {
        SupportEntity support = supportRepository.getById(id);
        support.getSupportMessages().stream().filter(o->!o.isDeleted()).peek(sm-> sm.setIsRead(true)).collect(Collectors.toList());
        supportRepository.update(support);
        return true;
    }

    @Override
    public SupportDto update(@NonNull SupportParam supportParam) {
        return null;
    }

    @Override
    public SupportDto delete(@NonNull SupportParam supportParam) {
        return null;
    }

    @Override
    public SupportDto getById(long id) {
        return SupportConvertor.toDto(supportRepository.getById(id));
    }

    @Override
    public SupportEntity add(SupportEntity entity) {
        return supportRepository.add(entity);
    }

    @Override
    public SupportEntity update(SupportEntity entity) {
        return null;
    }

    @Override
    public SupportEntity delete(SupportEntity entity) {
        return null;
    }

    @Override
    public SupportEntity getEntityById(long id) {
        return supportRepository.getById(id);
    }

    @Override
    public List<SupportEntity> getAll(Pageable pageable) {
        return supportRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<SupportEntity> findAll(Specification<SupportEntity> specification, Pageable pageable) {
        return supportRepository.findAll(specification, pageable);
    }

    @Override
    public List<SupportDto> convertToDtos(List<SupportEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(SupportConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<SupportDto> convertToDtos(Page<SupportEntity> entities) {
        return entities.map(SupportConvertor::toDto);
    }
}
