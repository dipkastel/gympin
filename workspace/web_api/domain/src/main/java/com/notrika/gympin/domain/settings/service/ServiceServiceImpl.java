package com.notrika.gympin.domain.settings.service;

import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.common.settings.service.param.ServiceByDateParam;
import com.notrika.gympin.common.settings.service.param.ServiceParam;
import com.notrika.gympin.common.settings.service.query.ServiceQuery;
import com.notrika.gympin.common.settings.service.service.ServiceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ServiceConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageServiceExecutionRepository;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceServiceImpl extends AbstractBaseService<ServiceParam, ServiceDto, ServiceQuery, ManageServiceExecutionEntity> implements ServiceService {


    @Autowired
    ManageServiceExecutionRepository manageServiceExecutionRepository;

    @Override
    public ServiceDto add(@NonNull ServiceParam serviceParam) {
        return null;
    }

    @Override
    public ServiceDto update(@NonNull ServiceParam serviceParam) {
        return null;
    }

    @Override
    public ServiceDto delete(@NonNull ServiceParam serviceParam) {
        return null;
    }

    @Override
    public ServiceDto getById(long id) {
        return ServiceConvertor.ToDto(manageServiceExecutionRepository.getById(id));
    }

    @Override
    public ManageServiceExecutionEntity add(ManageServiceExecutionEntity entity) {
        return null;
    }

    @Override
    public ManageServiceExecutionEntity update(ManageServiceExecutionEntity entity) {
        return null;
    }

    @Override
    public ManageServiceExecutionEntity delete(ManageServiceExecutionEntity entity) {
        return null;
    }

    @Override
    public ManageServiceExecutionEntity getEntityById(long id) {
        return manageServiceExecutionRepository.getById(id);
    }

    @Override
    public List<ManageServiceExecutionEntity> getAll(Pageable pageable) {
        return manageServiceExecutionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageServiceExecutionEntity> findAll(Specification<ManageServiceExecutionEntity> specification, Pageable pageable) {
        return manageServiceExecutionRepository.findAll(specification, pageable);
    }


    @Transactional
    public Boolean deleteCorruptedItems() {
//        for (int i = 0; i < manageServiceExecutionRepository.count(); i++) {
//            try {
//                manageServiceExecutionRepository.findById((long) i);
//            } catch (Exception e) {
//                //TODO FIX THIS
//                manageServiceExecutionRepository.forceDelete((long)i);
//            }
//        }
        return true;
    }

    @Override
    public List<ServiceDto> getUsersActive(ServiceByDateParam param) {
        return convertToDtos(manageServiceExecutionRepository.getUsersActive(param.fromDate,param.toDate));
    }

    @Override
    public List<ServiceDto> convertToDtos(List<ManageServiceExecutionEntity> entities) {
        return entities.stream().map(ServiceConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<ServiceDto> convertToDtos(Page<ManageServiceExecutionEntity> entities) {
        return entities.map(ServiceConvertor::ToDto);
    }
}
