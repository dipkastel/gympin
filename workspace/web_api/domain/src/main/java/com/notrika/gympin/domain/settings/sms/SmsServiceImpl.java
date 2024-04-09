package com.notrika.gympin.domain.settings.sms;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SmsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SmsServiceImpl extends AbstractBaseService<SmsParam, SmsDto, SmsQuery, ManageSmsEntity> implements SmsService {


    @Autowired
    ManageSmsRepository manageSmsRepository;

    @Override
    public SmsDto add(@NonNull SmsParam smsParam) {
        return null;
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
}
