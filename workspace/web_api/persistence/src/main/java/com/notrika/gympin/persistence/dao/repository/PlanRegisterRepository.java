package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRegisterRepository extends BaseRepository<PlanRegisterEntity, Long> {

    PlanRegisterEntity findPlanRegisterEntityByUserAndDeletedIsFalse(User user);

}
