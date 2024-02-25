package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserMultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMultimediaRepository extends BaseRepository<UserMultimediaEntity, Long> {

    List<UserMultimediaEntity> findAllByUserAndDeletedIsFalse(UserEntity user);


}