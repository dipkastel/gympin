package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFollowRepository extends BaseRepository<UserFollowEntity, Long> {

    UserFollowEntity getByRequesterUserAndRequestedUserAndDeleted(UserEntity requesterUser, UserEntity requestedUser, boolean deleted);

    @Query("select f.requesterUser from UserFollowEntity f where f.requestedUser.id=:#{#userId} and f.deleted=false ")
    List<UserEntity> getFollowers(Long userId);

    @Query("select f.requestedUser from UserFollowEntity f where f.requesterUser.id=:#{#userId} and f.deleted=false ")
    List<UserEntity> getFollowings(Long userId);

    @Query("select count(*) from UserFollowEntity f where f.requestedUser.id=:#{#userId} and f.deleted=false ")
    Long getFollowersCount(Long userId);

    @Query("select count(*) from UserFollowEntity f where f.requesterUser.id=:#{#userId} and f.deleted=false ")
    Long getFollowingsCount(Long userId);

}
