package com.notrika.gympin.domain.plan;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.param.PlanGateTimingParam;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.service.PlanGateTimingService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.gate.GateTimingServiceImpl;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.persistence.dao.repository.PlanGateTimingRepository;
import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanGateTimingServiceImpl extends AbstractBaseService<PlanGateTimingParam, PlanGateTimingDto, BaseQuery<?>, PlanGateTimingEntity> implements PlanGateTimingService {

    @Autowired
    private PlanServiceImpl planService;

    @Autowired
    private GateTimingServiceImpl gateTimingService;

    @Autowired
    private PlanGateTimingRepository planGateTimingRepository;

    @Override
    public PlanGateTimingDto add(@NonNull PlanGateTimingParam planGateParam) {
        PlanEntity planEntity = planService.getEntityById(planGateParam.getPlan().getId());
        GateTimingEntity gateTimingEntity = gateTimingService.getEntityById(planGateParam.getGateTiming().getId());
        PlanGateTimingEntity planGateEntity = PlanGateTimingEntity.builder()
                .plan(planEntity)
                .gateTimings(gateTimingEntity)
                .entryCount(planGateParam.getEntryCount())
                .build();
        planGateEntity = planGateTimingRepository.add(planGateEntity);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public List<PlanGateTimingDto> add(List<PlanGateTimingParam> planGateTimingParams) {
        return planGateTimingParams.stream().map(this::add).collect(Collectors.toList());
    }
    @Override
    public PlanGateTimingDto update(@NonNull PlanGateTimingParam planGateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public PlanGateTimingDto delete(@NonNull PlanGateTimingParam planGateParam) {
        PlanGateTimingEntity planGateEntity = this.getEntityById(planGateParam.getId());
        planGateEntity = this.delete(planGateEntity);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public PlanGateTimingDto getById(long id) {
        PlanGateTimingEntity planGateEntity = this.getEntityById(id);
        return PlanConvertor.convertToPlanGateDto(planGateEntity);
    }

    @Override
    public PlanGateTimingEntity add(PlanGateTimingEntity entity) {
        return planGateTimingRepository.add(entity);
    }

    @Override
    public PlanGateTimingEntity update(PlanGateTimingEntity entity) {
        return planGateTimingRepository.update(entity);
    }

    @Override
    public PlanGateTimingEntity delete(PlanGateTimingEntity entity) {
        return planGateTimingRepository.deleteById2(entity);
    }

    @Override
    public PlanGateTimingEntity getEntityById(long id) {
        return planGateTimingRepository.getById(id);
    }

    @Override
    public List<PlanGateTimingEntity> getAll(Pageable pageable) {
        return planGateTimingRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlanGateTimingEntity> findAll(Specification<PlanGateTimingEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlanGateTimingDto> convertToDtos(List<PlanGateTimingEntity> entities) {
        return entities.stream().map(PlanConvertor::convertToPlanGateDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlanGateTimingDto> convertToDtos(Page<PlanGateTimingEntity> entities) {
        return null;
    }

    @Override
    public List<PlanGateTimingDto> getByPlan(PlanParam planParam) {
        PlanEntity planEntity = planService.getEntityById(planParam.getId());
        return convertToDtos(planGateTimingRepository.findAllByPlanAndDeletedIsFalse(planEntity));
    }

}
