package com.notrika.gympin.domain.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.param.GateTimingParam;
import com.notrika.gympin.common.gate.service.GateTimingService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.persistence.dao.repository.GateRepository;
import com.notrika.gympin.persistence.dao.repository.GateTimingRepository;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GateTimingServiceImpl extends AbstractBaseService<GateTimingParam, GateTimingDto, BaseQuery<?>, GateTimingEntity> implements GateTimingService {

    @Autowired
    GateTimingRepository gateTimingRepository;
    @Autowired
    GateRepository gateRepository;

    @Override
    public GateTimingDto add(@NonNull GateTimingParam gateTimingParam) {
        GateEntity gate = gateRepository.getById(gateTimingParam.getGate().getId());
        GateTimingEntity gateTimingEntity = GateTimingEntity.builder()
                .gate(gate)
                .dayOfWeek(gateTimingParam.getDayOfWeek())
                .openingTime(gateTimingParam.getOpeningTime())
                .closingTime(gateTimingParam.getClosingTime())
                .name(gateTimingParam.getName())
                .build();
        return GateConvertor.convertToGateTimingDto(gateTimingRepository.add(gateTimingEntity));
    }

    @Override
    public GateTimingEntity add(GateTimingEntity entity) {
        return gateTimingRepository.add(entity);
    }


    @Override
    public GateTimingDto update(@NonNull GateTimingParam gateTimingParam) {
        GateTimingEntity gateTimingEntity = gateTimingRepository.getById(gateTimingParam.getId());
        gateTimingEntity.setOpeningTime(gateTimingParam.getOpeningTime());
        gateTimingEntity.setClosingTime(gateTimingParam.getClosingTime());
        gateTimingEntity.setDayOfWeek(gateTimingParam.getDayOfWeek());
        gateTimingEntity.setName(gateTimingParam.getName());
        return GateConvertor.convertToGateTimingDto(gateTimingRepository.update(gateTimingEntity));
    }

    @Override
    public GateTimingEntity update(GateTimingEntity entity) {
        GateTimingEntity gateTimingEntity = gateTimingRepository.getById(entity.getId());
        gateTimingEntity.setOpeningTime(entity.getOpeningTime());
        gateTimingEntity.setClosingTime(entity.getClosingTime());
        gateTimingEntity.setDayOfWeek(entity.getDayOfWeek());
        gateTimingEntity.setName(entity.getName());
        return gateTimingRepository.update(gateTimingEntity);
    }


    @Override
    public GateTimingDto delete(@NonNull GateTimingParam gateTimingParam) {
        GateTimingEntity entity = gateTimingRepository.getById(gateTimingParam.getId());
        return GateConvertor.convertToGateTimingDto(gateTimingRepository.deleteById2(entity));
    }
    @Override
    public GateTimingEntity delete(GateTimingEntity entity) {
        return gateTimingRepository.deleteById2(entity);
    }

    @Override
    public GateTimingDto getById(long id) {
        return GateConvertor.convertToGateTimingDto(gateTimingRepository.getById(id));
    }

    @Override
    public GateTimingEntity getEntityById(long id) {
        return gateTimingRepository.getById(id);
    }

    @Override
    public List<GateTimingEntity> getAll(Pageable pagingParam) {
        return gateTimingRepository.findAllUndeleted(pagingParam);
    }

    @Override
    public Page<GateTimingEntity> findAll(Specification<GateTimingEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<GateTimingDto> convertToDtos(List<GateTimingEntity> entities) {
        return entities.stream().map(GateConvertor::convertToGateTimingDto).collect(Collectors.toList());
    }

    @Override
    public Page<GateTimingDto> convertToDtos(Page<GateTimingEntity> entities) {
        return null;
    }

    @Override
    public List<GateTimingDto> getByGateId(Long id) {
        return convertToDtos(gateTimingRepository.findAllByGateIdAndDeletedFalse(id));
    }

    @Override
    public List<GateTimingDto> getByPlaceId(Long id) {
        return convertToDtos(gateTimingRepository.findAllByGatePlaceIdAndDeletedFalse(id));
    }
}
