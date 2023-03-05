package com.notrika.gympin.domain.plan;

import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.exception.plan.UncomfortableValueExeption;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.param.PlanSportParam;
import com.notrika.gympin.common.plan.service.PlanService;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlanConvertor;
import com.notrika.gympin.domain.util.convertor.SportPlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.PlanRepository;
import com.notrika.gympin.persistence.dao.repository.SportPlaceRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl extends AbstractBaseService<PlanParam, PlanDto, BaseQuery<?>, PlanEntity> implements PlanService {

    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private SportPlaceRepository sportPlaceRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public PlanDto add(@NonNull PlanParam planParam) {
        PlaceEntity place = placeRepository.getById(planParam.getPlace().getId());
        PlanEntity planEntity = PlanEntity.builder()
                .place(place)
                .name(planParam.getName())
                .price(planParam.getPrice())
                .valuePrice(planParam.getValuePrice())
                .enable(planParam.getEnable())
                .entryTotalCount(planParam.getEntryTotalCount())
                .startSellingDate(planParam.getStartSellingDate())
                .endSellingDate(planParam.getEndSellingDate())
                .gender(planParam.getGender())
                .description(planParam.getDescription())
                .planExpireType(planParam.getPlanExpireType())
                .expireDate(planParam.getExpireDate())
                .expireDuration(planParam.getExpireDuration())
                .build();
        planEntity = this.add(planEntity);
        return PlanConvertor.toDto(planEntity);
    }

    @Override
    public PlanDto update(@NonNull PlanParam planParam) {
        if(planParam.getValuePrice().compareTo(planParam.getPrice())<0)
            throw new UncomfortableValueExeption();
        PlanEntity planEntity = getEntityById(planParam.getId());
        planEntity.setName(planParam.getName());
        planEntity.setPrice(planParam.getPrice());
        planEntity.setValuePrice(planParam.getValuePrice());
        planEntity.setEnable(planParam.getEnable());
        planEntity.setEntryTotalCount(planParam.getEntryTotalCount());
        planEntity.setStartSellingDate(planParam.getStartSellingDate());
        planEntity.setEndSellingDate(planParam.getEndSellingDate());
        planEntity.setPlanExpireType(planParam.getPlanExpireType());
        planEntity.setGender(planParam.getGender());
        planEntity.setDescription(planParam.getDescription());
        planEntity.setExpireDate(planParam.getExpireDate());
        planEntity.setExpireDuration(planParam.getExpireDuration());
        return PlanConvertor.toDto(planRepository.update(planEntity));
    }

    @Override
    public PlanDto delete(@NonNull PlanParam planParam) {
        PlanEntity planEntity = getEntityById(planParam.getId());
        planEntity = this.delete(planEntity);
        return PlanConvertor.toDto(planEntity);
    }

    @Override
    public PlanDto getById(long id) {
        return PlanConvertor.toDto(this.getEntityById(id));
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
    public Page<PlanEntity> findAll(Specification<PlanEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlanDto> convertToDtos(List<PlanEntity> entities) {
        return entities.stream().map(PlanConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlanDto> convertToDtos(Page<PlanEntity> entities) {
        return null;
    }

    @Override
    public List<PlanDto> getPlanByPlace(PlaceParam place) {
        return planRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(PlanConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<SportPlaceDto> getSports(Long planId) {
        PlanEntity plan = planRepository.getById(planId);
        return SportPlaceConvertor.toDto(plan.getPlanSport());
    }

    @Override
    public PlanDto addSport(PlanSportParam planSportParam) {
        PlanEntity plan = planRepository.getById(planSportParam.getPlan().getId());
        List<SportPlaceEntity> planSports = plan.getPlanSport();
        if(planSports==null)planSports=new ArrayList<>();
        for(var sportPlaceParam:planSportParam.getSportsPlace()){
            SportPlaceEntity sportPlace = sportPlaceRepository.getById(sportPlaceParam.getId());
            planSports.add(sportPlace);
        }
        plan.setPlanSport(planSports);
        planRepository.update(plan);
        return PlanConvertor.toDto(plan);
    }

    @Override
    public PlanDto deleteSport(PlanSportParam planSportParam) {
        PlanEntity plan = planRepository.getById(planSportParam.getPlan().getId());
        var sports = plan.getPlanSport();
        var sportPlaceremoveIds = planSportParam.getSportsPlace().stream().map(BaseParam::getId).collect(Collectors.toList());
        var afterfilter = sports.stream().filter(a->!sportPlaceremoveIds.contains(a.getId())).collect(Collectors.toList());
        plan.setPlanSport(afterfilter);
        planRepository.update(plan);
        return PlanConvertor.toDto(plan);
    }
}
