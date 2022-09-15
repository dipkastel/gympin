package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.rating.UserRateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRateRepository extends BaseRepository<UserRateEntity, Long> {

    //    @Where(clause = "User")
    Float countAllByJudgingUserAndDeletedIsFalse(UserEntity user);

    @Query("select SUM(r.rate) from UserRateEntity r where r.judgingUser.id=:#{#user.id}")
    Float sumOfRateOfUser(UserEntity user);

    List<UserRateEntity> findAllByJudgerUserAndJudgingUserAndDeletedIsFalse(UserEntity judgerUser, UserEntity judgingUser);

}
