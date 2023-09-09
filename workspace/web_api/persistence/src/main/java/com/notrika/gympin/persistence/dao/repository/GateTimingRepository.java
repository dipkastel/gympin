package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GateTimingRepository extends BaseRepository<GateTimingEntity,Long>{


    List<GateTimingEntity> findAllByGateIdAndDeletedFalse(Long GateId);

    List<GateTimingEntity> findAllByGatePlaceIdAndGate_DeletedFalseAndDeletedFalse(Long placeId);
}
