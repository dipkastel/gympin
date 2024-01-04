package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowChangeStatusEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFollowChangeStatusRepository extends BaseRepository<UserFollowChangeStatusEntity,Long> {
}
