package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import com.notrika.gympin.persistence.entity.gate.GateTrafficEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GateTrafficRepository extends BaseRepository<GateTrafficEntity,Long>{


    GateTrafficEntity findTopByGateIdAndDeletedFalseOrderByIdDesc(Long GateId);
}
