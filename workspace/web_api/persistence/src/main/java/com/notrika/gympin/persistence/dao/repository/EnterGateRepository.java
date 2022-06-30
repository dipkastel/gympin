package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.athlete.gate.enums.EnterGateStatus;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EnterGateRepository extends BaseRepository<EnterGateEntity,Long>{

    Long countAllByAthleteAndGateAndEnterGateStatusAndDeletedIsFalse(User athlete, GateEntity gate, EnterGateStatus status);

    EnterGateEntity findAllByReferenceIdAndDeletedIsFalse(UUID referenceId);

}
