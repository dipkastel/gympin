package com.notrika.gympin.domain.settings.report;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.settings.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.settings.reportSettings.service.ReportSettingsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ReportSettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageReportSettingRepository;
import com.notrika.gympin.persistence.entity.management.settings.ManageReportSettingsEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportSettingsServiceImpl extends AbstractBaseService<ReportSettingsParam, ReportSettingsDto, BaseQuery<?>, ManageReportSettingsEntity> implements ReportSettingsService {

    @Autowired
    private ManageReportSettingRepository manageReportSettingRepository;

    @Override
    public ReportSettingsDto add(@NonNull ReportSettingsParam reportSettingsParam) {
        ManageReportSettingsEntity entity = new ManageReportSettingsEntity();
        entity.setKey(reportSettingsParam.getKey());
        entity.setValue(reportSettingsParam.getValue());
        entity.setUpdateAuto(reportSettingsParam.getUpdateAuto());
        entity.setDescription(reportSettingsParam.getDescription());
        manageReportSettingRepository.add(entity);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsDto update(@NonNull ReportSettingsParam reportSettingsParam) {
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(reportSettingsParam.getKey());
        if(entity==null) throw new NotFoundException();
        entity.setValue(reportSettingsParam.getValue());
        entity.setDescription(reportSettingsParam.getDescription());
        entity.setUpdateAuto(reportSettingsParam.getUpdateAuto());
        manageReportSettingRepository.update(entity);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsDto delete(@NonNull ReportSettingsParam reportSettingsParam) {
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(reportSettingsParam.getKey());
        manageReportSettingRepository.deleteById2(entity);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsDto getById(long id) {
        ManageReportSettingsEntity entity = manageReportSettingRepository.getById(id);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ManageReportSettingsEntity add(ManageReportSettingsEntity entity) {
        return null;
    }

    @Override
    public ManageReportSettingsEntity update(ManageReportSettingsEntity entity) {
        ManageReportSettingsEntity newEntity = manageReportSettingRepository.getFirstByKey(entity.getKey());
        if(newEntity==null) throw new NotFoundException();
        newEntity.setValue(entity.getValue());
        newEntity.setUpdateAuto(entity.getUpdateAuto());
        return newEntity;
    }

    @Override
    public ManageReportSettingsEntity delete(ManageReportSettingsEntity entity) {
        return manageReportSettingRepository.deleteById2(entity);
    }

    @Override
    public ManageReportSettingsEntity getEntityById(long id) {
        return manageReportSettingRepository.getById(id);
    }

    @Override
    public List<ManageReportSettingsEntity> getAll(Pageable pageable) {
        return manageReportSettingRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageReportSettingsEntity> findAll(Specification<ManageReportSettingsEntity> specification, Pageable pageable) {
        return manageReportSettingRepository.findAll(specification,pageable);
    }

    @Override
    public List<ReportSettingsDto> convertToDtos(List<ManageReportSettingsEntity> entities) {
        return entities.stream().map(ReportSettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ReportSettingsDto> convertToDtos(Page<ManageReportSettingsEntity> entities) {
        return entities.map(ReportSettingsConvertor::toDto);
    }
}
