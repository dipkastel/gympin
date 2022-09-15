package com.notrika.gympin.domain.plan;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.plan.service.PlanRegisterService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.persistence.dao.repository.PlanRegisterRepository;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanRegisterServiceImpl extends AbstractBaseService<PlanRegisterParam, PlanRegisterDto, BaseFilter<?>, PlanRegisterEntity> implements PlanRegisterService {

    @Autowired
    private PlanRegisterRepository planRegisterRepository;

    @Override
    public PlanRegisterDto add(@NonNull PlanRegisterParam planRegisterParam) {
        PlanRegisterEntity planRegisterEntity = PlanConvertor.convertToPlanRegisterEntity(planRegisterParam);
        planRegisterEntity = this.add(planRegisterEntity);
        return PlanConvertor.convertToPlanRegisterDto(planRegisterEntity);
    }

    @Override
    public PlanRegisterDto update(@NonNull PlanRegisterParam planRegisterParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public PlanRegisterDto delete(@NonNull PlanRegisterParam planRegisterParam) {
        PlanRegisterEntity planRegisterEntity = PlanConvertor.convertToPlanRegisterEntity(planRegisterParam);
        planRegisterEntity = this.delete(planRegisterEntity);
        return PlanConvertor.convertToPlanRegisterDto(planRegisterEntity);
    }

    @Override
    public PlanRegisterDto getById(long id) {
        PlanRegisterEntity planRegisterEntity = this.getEntityById(id);
        return PlanConvertor.convertToPlanRegisterDto(planRegisterEntity);
    }

    @Override
    public PlanRegisterEntity add(PlanRegisterEntity entity) {
        return planRegisterRepository.add(entity);
    }

    @Override
    public PlanRegisterEntity update(PlanRegisterEntity entity) {
        return planRegisterRepository.update(entity);
    }

    @Override
    public PlanRegisterEntity delete(PlanRegisterEntity entity) {
        return planRegisterRepository.deleteById2(entity);
    }

    @Override
    public PlanRegisterEntity getEntityById(long id) {
        return planRegisterRepository.getById(id);
    }

    @Override
    public List<PlanRegisterEntity> getAll(Pageable pageable) {
        return planRegisterRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlanRegisterDto> convertToDtos(List<PlanRegisterEntity> entities) {
        return entities.stream().map(PlanConvertor::convertToPlanRegisterDto).collect(Collectors.toList());
    }

    public PlanRegisterEntity getPlanOfUser(UserEntity user) {
        return planRegisterRepository.findPlanRegisterEntityByUserAndDeletedIsFalse(user);
    }

}
