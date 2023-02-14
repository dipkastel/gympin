package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface EnterGateRepository extends BaseRepository<EnterGateEntity, Long> {

    Long countAllByAthleteAndGateAndEnterGateStatusAndDeletedIsFalse(UserEntity athlete, GateEntity gate, TicketEntryStatus status);

    EnterGateEntity findAllByReferenceIdAndDeletedIsFalse(String referenceId);

}
