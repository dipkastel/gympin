package com.notrika.gympin.domain.gate;

import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.filter.GateFilter;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.service.GateService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.persistence.dao.repository.GateRepository;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
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
public class GateServiceImpl extends AbstractBaseService<GateParam, GateDto, GateFilter, GateEntity> implements GateService {

    @Autowired
    private GateRepository gateRepository;


    @Override
    public GateDto add(@NonNull GateParam gateParam) {
        GateEntity gateEntity = GateConvertor.convertToEntity(gateParam);
        gateEntity = this.gateRepository.add(gateEntity);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateDto update(@NonNull GateParam gateParam) {
        GateEntity gate = getEntityById(gateParam.getId());
        gate.setName(gateParam.getName());
        gate.setEnable(gateParam.getEnable());
        gate.setTrafficManagement(gateParam.getTrafficManagement());
        GateEntity result = update(gate);
        return GateConvertor.convertToDto(result);
    }

    @Override
    public GateDto delete(@NonNull GateParam gateParam) {
        GateEntity gate = getEntityById(gateParam.getId());
        return GateConvertor.convertToDto(gateRepository.deleteById2(gate));
    }

    @Override
    public GateDto getById(long id) {
        GateEntity gateEntity = this.getEntityById(id);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateEntity add(GateEntity entity) {
        GateEntity gateEntity = gateRepository.add(entity);
//        accountingService.add(gateEntity, AccountTopic.PREPAYMENT);
        return gateEntity;
    }

    @Override
    public GateEntity update(GateEntity entity) {
        return gateRepository.update(entity);
    }

    @Override
    public GateEntity delete(GateEntity entity) {
        GateEntity gate = getEntityById(entity.getId());
        return gateRepository.deleteById2(gate);
    }

    @Override
    public GateEntity getEntityById(long id) {
        return gateRepository.getById(id);
    }

    @Override
    public List<GateEntity> getAll(Pageable pageable) {
        return gateRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<GateEntity> findAll(Specification<GateEntity> specification, Pageable pageable) {
        return gateRepository.findAll(specification,pageable);
    }

    @Override
    public List<GateDto> convertToDtos(List<GateEntity> entities) {
        return entities.stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Page<GateDto> convertToDtos(Page<GateEntity> entities) {
        return null;
    }

    @Override
    public List<GateTimingDto> getGateTimings(GateParam gate) {
        return null;
    }


    @Override
    public List<GateDto> getGatesByPlace(PlaceParam place) {
        return gateRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<GateDto> getGatesBySport(SportParam sport) {
        return gateRepository.findAllBySportAndDeletedIsFalse(SportEntity.builder().id(sport.getId()).build()).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<GateDto> getGatesByOwner(UserParam owner) {
        return null;
    }

    public List<GateEntity> getGatesByOwner(UserEntity owner) {
        return gateRepository.findAllByOwnerAndDeletedIsFalse(owner);
    }

    @Override
    public List<GateDto> getGatesByGuard(UserParam guard) {
        return null;
    }
}
