package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.rating.UserRate;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRateRepository extends BaseRepository<UserRate, Long> {

    //    @Where(clause = "User")
    Float countAllByJudgingUserAndDeletedIsFalse(User user);

    @Query("select SUM(r.rate) from UserRate r where r.judgingUser.id=:#{#user.id}")
    Float sumOfRateOfUser(User user);

}
