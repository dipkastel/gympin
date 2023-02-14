package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends BaseRepository<PlanEntity, Long> {


        List<PlanEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);
}
