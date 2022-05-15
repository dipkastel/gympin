package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.user.User;
import com.notrika.gympin.persistence.entity.user.relation.FollowEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends BaseRepository<FollowEntity,Long> {

    FollowEntity getByRequesterUserAndRequestedUserAndDeleted(User requesterUser,User requestedUser,boolean deleted);

    @Query("select f.requesterUser from FollowEntity f where f.requestedUser.id=:#{#userId} and f.deleted=false ")
    List<User> getFollowers(Long userId);

    @Query("select f.requestedUser from FollowEntity f where f.requesterUser.id=:#{#userId} and f.deleted=false ")
    List<User> getFollowings(Long userId);

    @Query("select count(*) from FollowEntity f where f.requestedUser.id=:#{#userId} and f.deleted=false ")
    Long getFollowersCount(Long userId);

    @Query("select count(*) from FollowEntity f where f.requesterUser.id=:#{#userId} and f.deleted=false ")
    Long getFollowingsCount(Long userId);

}
