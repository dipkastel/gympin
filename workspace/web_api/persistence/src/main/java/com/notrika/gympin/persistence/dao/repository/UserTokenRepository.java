package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.user.UserTokenEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTokenRepository extends BaseRepository<UserTokenEntity, Long> {

}
