package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.dao.user.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTokenRepository extends BaseRepository<UserToken, Long> {

}
