package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserTokenEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTokenRepository extends BaseRepository<UserTokenEntity, Long> {

}
