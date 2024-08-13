package com.notrika.gympin.domain.settings.userSettings;

import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.settings.userSettings.param.UserSettingParam;
import com.notrika.gympin.common.settings.userSettings.service.userSettingsService;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserSettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageUserSettingsRepository;
import com.notrika.gympin.persistence.entity.management.settings.UserSettingsEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
public class UserSettingsServiceImpl extends AbstractBaseService<UserSettingParam, UserSettingDto, BaseQuery<?>, UserSettingsEntity> implements userSettingsService {

    @Autowired
    ManageUserSettingsRepository userSettingsRepository;
    @Autowired
    UserServiceImpl userService;

    @Override
    public UserSettingDto add(@NonNull UserSettingParam settingParam) {
        UserEntity user = userService.getEntityById(settingParam.getUser().getId());
        var LastUserSetting = userSettingsRepository.findAllByDeletedIsFalseAndUserIdAndKey(settingParam.getUser().getId(),settingParam.getKey());
        if(LastUserSetting.size()>0){
            settingParam.setId(LastUserSetting.get(0).getId());
           return update(settingParam);
        }
        UserSettingsEntity result = add(UserSettingsEntity.builder()
                .user(user)
                .key(settingParam.getKey())
                .value(settingParam.getValue())
                .data(settingParam.getData())
                .description(settingParam.getDescription())
                .build());
        return UserSettingsConvertor.toDto(result);
    }

    @Override
    public UserSettingDto update(@NonNull UserSettingParam settingParam) {
        UserSettingsEntity item = getEntityById(settingParam.getId());
        item.setKey(settingParam.getKey());
        item.setValue(settingParam.getValue());
        item.setData(settingParam.getData());
        item.setDescription(settingParam.getDescription());
        return UserSettingsConvertor.toDto(item);
    }

    @Override
    public UserSettingDto delete(@NonNull UserSettingParam settingParam) {
        return delete(settingParam);
    }


    @Override
    public List<UserSettingsEntity> getAll(Pageable pageable) {
        return userSettingsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<UserSettingsEntity> findAll(Specification<UserSettingsEntity> specification, Pageable pageable) {
        return userSettingsRepository.findAll(specification, pageable);
    }

    @Override
    public UserSettingsEntity add(UserSettingsEntity entity) {
        return userSettingsRepository.add(entity);
    }

    @Override
    public UserSettingsEntity update(UserSettingsEntity entity) {
        return userSettingsRepository.update(entity);
    }

    @Override
    public UserSettingsEntity delete(UserSettingsEntity entity) {
        return userSettingsRepository.deleteById2(entity);
    }

    @Override
    public UserSettingsEntity getEntityById(long id) {
        return userSettingsRepository.getById(id);
    }

    @Override
    public List<UserSettingDto> convertToDtos(List<UserSettingsEntity> entities) {
        return entities.stream().map(UserSettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<UserSettingDto> getUserSettings(Long userId) {
        return convertToDtos(userSettingsRepository.findAllByDeletedIsFalseAndUserId(userId));
    }

    @Override
    public Page<UserSettingDto> convertToDtos(Page<UserSettingsEntity> entities) {
        return null;
    }

    @Override
    public UserSettingDto getById(long id) {
        return UserSettingsConvertor.toDto(userSettingsRepository.getById(id));
    }

    @Override
    public Page<UserSettingDto> query(BaseQuery<?> filter) {
        return null;
    }

}
