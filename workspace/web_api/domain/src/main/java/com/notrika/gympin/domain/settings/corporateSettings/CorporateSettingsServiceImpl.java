package com.notrika.gympin.domain.settings.corporateSettings;

import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.common.settings.corporateSettings.param.CorporateSettingParam;
import com.notrika.gympin.common.settings.corporateSettings.service.corporateSettingsService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateSettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageCorporateSettingsRepository;
import com.notrika.gympin.persistence.entity.management.settings.CorporateSettingsEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
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
public class CorporateSettingsServiceImpl extends AbstractBaseService<CorporateSettingParam, CorporateSettingDto, BaseQuery<?>, CorporateSettingsEntity> implements corporateSettingsService {

    @Autowired
    ManageCorporateSettingsRepository corporateSettingsRepository;
    @Autowired
    CorporateServiceImpl corporateService;

    @Override
    public CorporateSettingDto add(@NonNull CorporateSettingParam settingParam) {
        CorporateEntity corporate = corporateService.getEntityById(settingParam.getCorporate().getId());
        var LastCorporateSetting = corporateSettingsRepository.findAllByDeletedIsFalseAndCorporateIdAndKey(settingParam.getCorporate().getId(),settingParam.getKey());
        if(LastCorporateSetting.size()>0){
            settingParam.setId(LastCorporateSetting.get(0).getId());
           return update(settingParam);
        }
        CorporateSettingsEntity result = add(CorporateSettingsEntity.builder()
                .corporate(corporate)
                .key(settingParam.getKey())
                .value(settingParam.getValue())
                .data(settingParam.getData())
                .description(settingParam.getDescription())
                .build());
        return CorporateSettingsConvertor.toDto(result);
    }

    @Override
    public CorporateSettingDto update(@NonNull CorporateSettingParam settingParam) {
        CorporateSettingsEntity item = getEntityById(settingParam.getId());
        item.setKey(settingParam.getKey());
        item.setValue(settingParam.getValue());
        item.setData(settingParam.getData());
        item.setDescription(settingParam.getDescription());
        return CorporateSettingsConvertor.toDto(item);
    }

    @Override
    public CorporateSettingDto delete(@NonNull CorporateSettingParam settingParam) {
        return delete(settingParam);
    }


    @Override
    public List<CorporateSettingsEntity> getAll(Pageable pageable) {
        return corporateSettingsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CorporateSettingsEntity> findAll(Specification<CorporateSettingsEntity> specification, Pageable pageable) {
        return corporateSettingsRepository.findAll(specification, pageable);
    }

    @Override
    public CorporateSettingsEntity add(CorporateSettingsEntity entity) {
        return corporateSettingsRepository.add(entity);
    }

    @Override
    public CorporateSettingsEntity update(CorporateSettingsEntity entity) {
        return corporateSettingsRepository.update(entity);
    }

    @Override
    public CorporateSettingsEntity delete(CorporateSettingsEntity entity) {
        return corporateSettingsRepository.deleteById2(entity);
    }

    @Override
    public CorporateSettingsEntity getEntityById(long id) {
        return corporateSettingsRepository.getById(id);
    }

    @Override
    public List<CorporateSettingDto> convertToDtos(List<CorporateSettingsEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(CorporateSettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<CorporateSettingDto> getCorporateSettings(Long corporateId) {
        return convertToDtos(corporateSettingsRepository.findAllByDeletedIsFalseAndCorporateId(corporateId));
    }

    @Override
    public Page<CorporateSettingDto> convertToDtos(Page<CorporateSettingsEntity> entities) {
        return null;
    }

    @Override
    public CorporateSettingDto getById(long id) {
        return CorporateSettingsConvertor.toDto(corporateSettingsRepository.getById(id));
    }

    @Override
    public Page<CorporateSettingDto> query(BaseQuery<?> filter) {
        return null;
    }

}
