package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanGateRepository extends BaseRepository<PlanGateEntity, Long> {

    List<PlanGateEntity> findAllByGateAndDeletedIsFalse(GateEntity gate);

    List<PlanGateEntity> findAllByGate_PlaceAndDeletedIsFalse(PlaceEntity place);

}
