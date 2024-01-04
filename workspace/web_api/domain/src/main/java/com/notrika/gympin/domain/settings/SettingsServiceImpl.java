package com.notrika.gympin.domain.settings;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SettingsServiceImpl extends AbstractBaseService<SettingParam, SettingDto, BaseQuery<?>, SettingsEntity> implements SettingsService {

    @Autowired
    ManageSettingsRepository manageSettingsRepository;

    @Override
    public SettingDto add(@NonNull SettingParam settingParam) {
        return SettingsConvertor.toDto(manageSettingsRepository.add(SettingsConvertor.toEntity(settingParam)));
    }

    @Override
    public SettingDto update(@NonNull SettingParam settingParam) {
        SettingsEntity entity = manageSettingsRepository.getById(settingParam.getId());
        entity.setValue(settingParam.getValue());
        entity.setData(settingParam.getData());
        entity.setDescription(settingParam.getDescription());
        entity.setType(settingParam.getType());
        entity.setKey(settingParam.getKey());
        return SettingsConvertor.toDto(manageSettingsRepository.update(entity));
    }

    @Override
    public SettingDto delete(@NonNull SettingParam settingParam) {
        SettingsEntity entity = manageSettingsRepository.getById(settingParam.getId());
        if(entity.getValue()==null)
            return SettingsConvertor.toDto(manageSettingsRepository.deleteById2(entity));
        else
            return null;
    }


    @Override
    public List<SettingDto> getByType(settingsType type) {
        return convertToDtos(manageSettingsRepository.findAllByDeletedIsFalseAndType(type));
    }

    @Override
    public SettingDto getByKey(String key) {
        return SettingsConvertor.toDto(manageSettingsRepository.findByKeyAndDeletedFalse(key));
    }

    @Override
    public List<SettingsEntity> getAll(Pageable pageable) {
        return manageSettingsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<SettingsEntity> findAll(Specification<SettingsEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public SettingsEntity add(SettingsEntity entity) {
        return manageSettingsRepository.add(entity);
    }

    @Override
    public SettingsEntity update(SettingsEntity entity) {
        return manageSettingsRepository.update(entity);
    }

    @Override
    public SettingsEntity delete(SettingsEntity entity) {
        return manageSettingsRepository.deleteById2(entity);
    }

    @Override
    public SettingsEntity getEntityById(long id) {
        return manageSettingsRepository.getById(id);
    }

    @Override
    public List<SettingDto> convertToDtos(List<SettingsEntity> entities) {
        return entities.stream().map(SettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<SettingDto> convertToDtos(Page<SettingsEntity> entities) {
        return null;
    }

    @Override
    public SettingDto getById(long id) {
        return SettingsConvertor.toDto(manageSettingsRepository.getById(id));
    }

    @Override
    public Page<SettingDto> query(BaseQuery<?> filter) {
        return null;
    }

}
