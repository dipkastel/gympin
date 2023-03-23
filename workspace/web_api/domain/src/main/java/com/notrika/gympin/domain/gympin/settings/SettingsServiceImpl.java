package com.notrika.gympin.domain.gympin.settings;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gympin.base.dto.SettingDto;
import com.notrika.gympin.common.gympin.base.enums.settingsType;
import com.notrika.gympin.common.gympin.base.param.SettingParam;
import com.notrika.gympin.common.gympin.base.service.SettingsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.SettingsRepository;
import com.notrika.gympin.persistence.entity.settings.SettingsEntity;
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
    SettingsRepository settingsRepository;

    @Override
    public SettingDto add(@NonNull SettingParam settingParam) {
        return SettingsConvertor.toDto(settingsRepository.add(SettingsConvertor.toEntity(settingParam)));
    }

    @Override
    public SettingDto update(@NonNull SettingParam settingParam) {
        SettingsEntity entity = settingsRepository.getById(settingParam.getId());
        entity.setValue(settingParam.getValue());
        entity.setData(settingParam.getData());
        return SettingsConvertor.toDto(settingsRepository.update(entity));
    }

    @Override
    public SettingDto delete(@NonNull SettingParam settingParam) {
        SettingsEntity entity = settingsRepository.getById(settingParam.getId());
        if(entity.getValue()==null)
            return SettingsConvertor.toDto(settingsRepository.deleteById2(entity));
        else
            return null;
    }


    @Override
    public List<SettingDto> getByType(settingsType type) {
        return convertToDtos(settingsRepository.findAllByDeletedIsFalseAndType(type));
    }

    @Override
    public SettingDto getByKey(String key) {
        return SettingsConvertor.toDto(settingsRepository.findByKeyAndDeletedFalse(key));
    }

    @Override
    public List<SettingsEntity> getAll(Pageable pageable) {
        return settingsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<SettingsEntity> findAll(Specification<SettingsEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public SettingsEntity add(SettingsEntity entity) {
        return settingsRepository.add(entity);
    }

    @Override
    public SettingsEntity update(SettingsEntity entity) {
        return settingsRepository.update(entity);
    }

    @Override
    public SettingsEntity delete(SettingsEntity entity) {
        return settingsRepository.deleteById2(entity);
    }

    @Override
    public SettingsEntity getEntityById(long id) {
        return settingsRepository.getById(id);
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
        return SettingsConvertor.toDto(settingsRepository.getById(id));
    }

    @Override
    public Page<SettingDto> query(BaseQuery<?> filter) {
        return null;
    }

}
