package com.notrika.gympin.domain.plan;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.param.PlanGateParam;
import com.notrika.gympin.common.plan.service.PlanGateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.location.GateServiceImpl;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.persistence.dao.repository.PlanGateRepository;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanGateServiceImpl extends AbstractBaseService<PlanGateParam, PlanGateDto, BaseFilter<?>, PlanGateEntity> implements PlanGateService {

    @Autowired
    private PlanServiceImpl planService;

    @Autowired
    private GateServiceImpl gateService;

    @Autowired
    private PlanGateRepository planGateRepository;

    @Override
    public PlanGateDto add(@NonNull PlanGateParam planGateParam) {
//        PlanEntity planEntity = planService.getEntityById(planGateParam.getPlan().getId());
        GateEntity gateEntity = gateService.getEntityById(planGateParam.getGate().getId());
        PlanGateEntity planGateEntity = new PlanGateEntity();
//        planGateEntity.setPlan(planEntity);
        planGateEntity.setTitle(planGateParam.getTitle());
        planGateEntity.setDescription(planGateParam.getDescription());
        planGateEntity.setPrice(planGateParam.getPrice());
        planGateEntity.setDiscountPrice(planGateParam.getDiscountPrice());
        planGateEntity.setGate(gateEntity);
        planGateEntity.setEntryCount(planGateParam.getEntryCount());
        planGateEntity = this.add(planGateEntity);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public PlanGateDto update(@NonNull PlanGateParam planGateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public PlanGateDto delete(@NonNull PlanGateParam planGateParam) {
        PlanGateEntity planGateEntity = this.getEntityById(planGateParam.getId());
        planGateEntity = this.delete(planGateEntity);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public PlanGateDto getById(long id) {
        PlanGateEntity planGateEntity = this.getEntityById(id);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public PlanGateEntity add(PlanGateEntity entity) {
        return planGateRepository.add(entity);
    }

    @Override
    public PlanGateEntity update(PlanGateEntity entity) {
        return planGateRepository.update(entity);
    }

    @Override
    public PlanGateEntity delete(PlanGateEntity entity) {
        return planGateRepository.deleteById2(entity);
    }

    @Override
    public PlanGateEntity getEntityById(long id) {
        return planGateRepository.getById(id);
    }

    @Override
    public List<PlanGateEntity> getAll(Pageable pageable) {
        return planGateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlanGateDto> convertToDtos(List<PlanGateEntity> entities) {
        return entities.stream().map(PlanConvertor::convertToPlanGateDto).collect(Collectors.toList());
    }

    @Override
    public List<PlanGateDto> getPlanesByGate(GateParam gate) {
        List<PlanGateEntity> planGateEntityList = planGateRepository.findAllByGateAndDeletedIsFalse(GateEntity.builder().id(gate.getId()).build());
        return planGateEntityList.stream().map(GateConvertor::convertToPlanGateDto).collect(Collectors.toList());
    }

    public List<PlanGateEntity> getPlanesByGate(GateEntity gate) {
        return planGateRepository.findAllByGateAndDeletedIsFalse(gate);
    }

}
