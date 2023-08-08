package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserRepository extends BaseRepository<UserEntity, Long> {

    @Query("select u from UserEntity u,PlacePersonnelEntity po where u.id=po.user.id and po.place.id=:#{#place.id}")
    List<UserEntity> getOwnersPlace(PlaceEntity place);

    List<UserEntity> findByInvitedBy(String inviteBy);

    UserEntity findByPhoneNumberAndUsernameAndEmail(String phoneNumber, String username, String email);

    UserEntity findByPhoneNumberAndUsername(String phoneNumber, String username);

    UserEntity findByPhoneNumberAndEmail(String phoneNumber, String email);

    UserEntity findByUsernameAndEmail(String username, String email);

    UserEntity findByPhoneNumber(String phoneNumber);

    UserEntity findByUsername(String username);

    UserEntity findByEmail(String email);

    @Query("select count(u) from UserEntity u where u.deleted = 0")
    Long findFilterdCount(BaseQuery<?> filter);
}
