package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanGateTimingRepository extends BaseRepository<PlanGateTimingEntity, Long> {

    List<PlanGateTimingEntity> findAllByPlanAndDeletedIsFalse(PlanEntity planEntity);


}
