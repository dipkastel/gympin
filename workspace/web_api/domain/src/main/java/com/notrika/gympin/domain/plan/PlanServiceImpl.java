package com.notrika.gympin.domain.plan;

import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.service.PlanService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.persistence.dao.repository.PlanRepository;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl extends AbstractBaseService<PlanParam, PlanDto, PlanEntity> implements PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Override
    public PlanDto add(@NonNull PlanParam planParam) {
        PlanEntity planEntity = PlanConvertor.convertToPlanEntity(planParam);
        planEntity = this.add(planEntity);
        return PlanConvertor.convertToPlanDto(planEntity);
    }

    @Override
    public PlanDto update(@NonNull PlanParam planParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public PlanDto delete(@NonNull PlanParam planParam) {
        PlanEntity planEntity = getEntityById(planParam.getId());
        planEntity = this.delete(planEntity);
        return PlanConvertor.convertToPlanDto(planEntity);
    }

    @Override
    public PlanDto getById(long id) {
        return PlanConvertor.convertToPlanDto(this.getEntityById(id));
    }

    @Override
    public PlanEntity add(PlanEntity entity) {
        return planRepository.add(entity);
    }

    @Override
    public PlanEntity update(PlanEntity entity) {
        return planRepository.update(entity);
    }

    @Override
    public PlanEntity delete(PlanEntity entity) {
        return planRepository.deleteById2(entity);
    }

    @Override
    public PlanEntity getEntityById(long id) {
        return planRepository.getById(id);
    }

    @Override
    public List<PlanEntity> getAll(Pageable pageable) {
        return planRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlanDto> convertToDtos(List<PlanEntity> entities) {
        return entities.stream().map(PlanConvertor::convertToPlanDto).collect(Collectors.toList());
    }
}
