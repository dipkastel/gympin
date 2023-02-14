package com.notrika.gympin.domain.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gate.dto.GateTrafficDto;
import com.notrika.gympin.common.gate.param.GateTrafficParam;
import com.notrika.gympin.common.gate.service.GateTrafficService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.persistence.dao.repository.GateRepository;
import com.notrika.gympin.persistence.dao.repository.GateTrafficRepository;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.gate.GateTrafficEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GateTrafficServiceImpl extends AbstractBaseService<GateTrafficParam, GateTrafficDto, BaseQuery<?>, GateTrafficEntity> implements GateTrafficService {

    @Autowired
    GateTrafficRepository gateTrafficRepository;
    @Autowired
    GateRepository gateRepository;

    @Override
    public GateTrafficDto add(@NonNull GateTrafficParam gateTrafficParam) {
        GateEntity gate = gateRepository.getById(gateTrafficParam.getGate().getId());
        GateTrafficEntity gateTrafficEntity = GateTrafficEntity.builder()
                .gate(gate)
                .traffic(gateTrafficParam.getTraffic())
                .build();
        return GateConvertor.convertToGateTrafficDto(gateTrafficRepository.add(gateTrafficEntity));
    }

    @Override
    public GateTrafficEntity add(GateTrafficEntity entity) {
        return gateTrafficRepository.add(entity);
    }


    @Override
    public GateTrafficDto update(@NonNull GateTrafficParam gateTrafficParam) {
        GateTrafficEntity gateTrafficEntity = gateTrafficRepository.getById(gateTrafficParam.getId());
        gateTrafficEntity.setTraffic(gateTrafficParam.getTraffic());
        return GateConvertor.convertToGateTrafficDto(gateTrafficRepository.update(gateTrafficEntity));
    }

    @Override
    public GateTrafficEntity update(GateTrafficEntity entity) {
        GateTrafficEntity gateTrafficEntity = gateTrafficRepository.getById(entity.getId());
        gateTrafficEntity.setTraffic(entity.getTraffic());
        return gateTrafficRepository.update(gateTrafficEntity);
    }


    @Override
    public GateTrafficDto delete(@NonNull GateTrafficParam gateTrafficParam) {
        GateTrafficEntity entity = gateTrafficRepository.getById(gateTrafficParam.getId());
        return GateConvertor.convertToGateTrafficDto(gateTrafficRepository.deleteById2(entity));
    }
    @Override
    public GateTrafficEntity delete(GateTrafficEntity entity) {
        return gateTrafficRepository.deleteById2(entity);
    }

    @Override
    public GateTrafficDto getById(long id) {
        return GateConvertor.convertToGateTrafficDto(gateTrafficRepository.getById(id));
    }

    @Override
    public GateTrafficEntity getEntityById(long id) {
        return gateTrafficRepository.getById(id);
    }

    @Override
    public List<GateTrafficEntity> getAll(Pageable pagingParam) {
        return gateTrafficRepository.findAllUndeleted(pagingParam);
    }

    @Override
    public Page<GateTrafficEntity> findAll(Specification<GateTrafficEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<GateTrafficDto> convertToDtos(List<GateTrafficEntity> entities) {
        return entities.stream().map(GateConvertor::convertToGateTrafficDto).collect(Collectors.toList());
    }

    @Override
    public Page<GateTrafficDto> convertToDtos(Page<GateTrafficEntity> entities) {
        return null;
    }

    @Override
    public GateTrafficDto getLatestByGateId(Long id) {
        return GateConvertor.convertToGateTrafficDto(gateTrafficRepository.findTopByGateIdAndDeletedFalseOrderByIdDesc(id));
    }
}
