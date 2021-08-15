package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.user.UserToken;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTokenRepository extends BaseRepository<UserToken, Long> {

}
