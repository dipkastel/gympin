package com.notrika.gympin.domain.settings.sms;

import com.notrika.gympin.common.settings.sms.dto.PatternDto;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.param.SmsPatternParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SmsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsPatternRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageUserSettingsRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.util.pattern.PatternParseException;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SmsServiceImpl extends AbstractBaseService<SmsParam, SmsDto, SmsQuery, ManageSmsEntity> implements SmsService {


    @Autowired
    ManageSmsRepository manageSmsRepository;

    @Autowired
    ManageSmsPatternRepository manageSmsPatternRepository;
    @Autowired
    ManageSettingsRepository settingsRepository;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public SmsDto add(@NonNull SmsParam smsParam) {
        ManageSmsPatternEntity pattern =  manageSmsPatternRepository.findByPatternKeyAndDeletedFalse(smsParam.getPattern().getPatternKey());
       if (pattern==null)
           throw new SendSmsException();
        ManageSmsEntity sms = ManageSmsEntity.builder()
                .smsTypes(pattern.getSmsTypes())
                .userNumber(smsParam.getPhoneNumber())
                .smsStatus(SmsStatus.PENDING)
                .sendTime(new Date())
                .text1(smsParam.getText1())
                .text2(smsParam.getText2())
                .text3(smsParam.getText3())
                .text4(smsParam.getText4())
                .pattern(pattern)
                .build();
        add(sms);
        return SmsConvertor.toDto(sms);
    }

    @Override
    public SmsDto update(@NonNull SmsParam smsParam) {
        return null;
    }

    @Override
    public SmsDto delete(@NonNull SmsParam smsParam) {
        ManageSmsEntity sms = manageSmsRepository.getById(smsParam.getId());
        return SmsConvertor.toDto(manageSmsRepository.deleteById2(sms));
    }

    @Override
    public SmsDto getById(long id) {
        return SmsConvertor.toDto(manageSmsRepository.getById(id));
    }

    @Override
    public ManageSmsEntity add(ManageSmsEntity entity) {
        return manageSmsRepository.add(entity);
    }

    @Override
    public ManageSmsEntity update(ManageSmsEntity entity) {
        return manageSmsRepository.update(entity);
    }

    @Override
    public ManageSmsEntity delete(ManageSmsEntity entity) {
        return manageSmsRepository.deleteById2(entity);
    }

    @Override
    public ManageSmsEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<ManageSmsEntity> getAll(Pageable pageable) {
        return manageSmsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageSmsEntity> findAll(Specification<ManageSmsEntity> specification, Pageable pageable) {
        return manageSmsRepository.findAll(specification, pageable);
    }

    @Override
    public List<SmsDto> convertToDtos(List<ManageSmsEntity> entities) {
        return entities.stream().map(SmsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<SmsDto> convertToDtos(Page<ManageSmsEntity> entities) {
        return entities.map(SmsConvertor::toDto);
    }

    @Override
    public boolean changeSmsStatus(SmsParam smsParam) throws Exception {
        var sms = manageSmsRepository.getById(smsParam.getId());
        sms.setSmsStatus(smsParam.getSmsStatus());
        return true;
    }

    @Override
    public List<PatternDto> getAllPatterns() throws Exception {
        return manageSmsPatternRepository.findAll().stream().map(SmsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public PatternDto addPattern(SmsPatternParam smsPatternParam) throws Exception {

        ManageSmsPatternEntity patternEntity = ManageSmsPatternEntity.builder().
        name(smsPatternParam.getName()).
        patternKey(smsPatternParam.getPatternKey()).
        patternCode(smsPatternParam.getPatternCode()).
        smsTypes(smsPatternParam.getSmsType()).
        template(smsPatternParam.getTemplate()).
        delayInMin(smsPatternParam.getDelayInMin()).
        provider(settingsRepository.getById(10l)).
                build();
        manageSmsPatternRepository.add(patternEntity);
        return SmsConvertor.toDto(patternEntity);
    }
    @Override
    public PatternDto updatePattern(SmsPatternParam smsPatternParam) throws Exception {
        ManageSmsPatternEntity patternEntity = manageSmsPatternRepository.getById(smsPatternParam.getId());
        patternEntity.setName(smsPatternParam.getName());
        patternEntity.setPatternKey(smsPatternParam.getPatternKey());
        patternEntity.setPatternCode(smsPatternParam.getPatternCode());
        patternEntity.setSmsTypes(smsPatternParam.getSmsType());
        patternEntity.setTemplate(smsPatternParam.getTemplate());
        patternEntity.setDelayInMin(smsPatternParam.getDelayInMin());
        patternEntity.setProvider(settingsRepository.getById(10l));
        manageSmsPatternRepository.update(patternEntity);
        return SmsConvertor.toDto(patternEntity);
    }
}
