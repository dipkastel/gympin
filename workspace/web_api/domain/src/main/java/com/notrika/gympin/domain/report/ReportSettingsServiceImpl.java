package com.notrika.gympin.domain.report;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.exception.general.NotFoundException;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.plan.service.PlanRegisterService;
import com.notrika.gympin.common.report.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.report.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.report.reportSettings.service.ReportSettingsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.domain.util.convertor.ReportSettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.PlanRegisterRepository;
import com.notrika.gympin.persistence.dao.repository.ReportSettingRepository;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportSettingsServiceImpl extends AbstractBaseService<ReportSettingsParam, ReportSettingsDto, BaseQuery<?>, ReportSettingsEntity> implements ReportSettingsService {

    @Autowired
    private ReportSettingRepository reportSettingRepository;

    @Override
    public ReportSettingsDto add(@NonNull ReportSettingsParam reportSettingsParam) {
        return null;
    }

    @Override
    public ReportSettingsDto update(@NonNull ReportSettingsParam reportSettingsParam) {
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(reportSettingsParam.getKey());
        if(entity==null) throw new NotFoundException();
        entity.setValue(reportSettingsParam.getValue());
        entity.setUpdateAuto(reportSettingsParam.getUpdateAuto());
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsDto delete(@NonNull ReportSettingsParam reportSettingsParam) {
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(reportSettingsParam.getKey());
        reportSettingRepository.deleteById2(entity);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsDto getById(long id) {
        ReportSettingsEntity entity = reportSettingRepository.getById(id);
        return ReportSettingsConvertor.toDto(entity);
    }

    @Override
    public ReportSettingsEntity add(ReportSettingsEntity entity) {
        return null;
    }

    @Override
    public ReportSettingsEntity update(ReportSettingsEntity entity) {
        ReportSettingsEntity newEntity = reportSettingRepository.getFirstByKey(entity.getKey());
        if(newEntity==null) throw new NotFoundException();
        newEntity.setValue(entity.getValue());
        newEntity.setUpdateAuto(entity.getUpdateAuto());
        return newEntity;
    }

    @Override
    public ReportSettingsEntity delete(ReportSettingsEntity entity) {
        return reportSettingRepository.deleteById2(entity);
    }

    @Override
    public ReportSettingsEntity getEntityById(long id) {
        return reportSettingRepository.getById(id);
    }

    @Override
    public List<ReportSettingsEntity> getAll(Pageable pageable) {
        return reportSettingRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ReportSettingsEntity> findAll(Specification<ReportSettingsEntity> specification, Pageable pageable) {
        return reportSettingRepository.findAll(specification,pageable);
    }

    @Override
    public List<ReportSettingsDto> convertToDtos(List<ReportSettingsEntity> entities) {
        return entities.stream().map(ReportSettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ReportSettingsDto> convertToDtos(Page<ReportSettingsEntity> entities) {
        return entities.map(ReportSettingsConvertor::toDto);
    }
}
