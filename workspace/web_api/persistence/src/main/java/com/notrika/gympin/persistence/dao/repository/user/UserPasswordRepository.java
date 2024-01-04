package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserPasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPasswordRepository extends BaseRepository<UserPasswordEntity, Long> {

    List<UserPasswordEntity> findByUser(UserEntity user);

    UserPasswordEntity findByUserAndExpiredIsFalseAndDeletedIsFalse(UserEntity user);


}
