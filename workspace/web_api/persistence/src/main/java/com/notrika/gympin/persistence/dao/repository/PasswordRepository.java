package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.user.PasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordRepository extends BaseRepository<PasswordEntity, Long> {

    List<PasswordEntity> findByUser(UserEntity user);

    PasswordEntity findByUserAndExpiredIsFalseAndDeletedIsFalse(UserEntity user);


}
