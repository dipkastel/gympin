package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanDiscountHistoryEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanDiscountHistoryRepository extends BaseRepository<PlanDiscountHistoryEntity, Long> {
}
