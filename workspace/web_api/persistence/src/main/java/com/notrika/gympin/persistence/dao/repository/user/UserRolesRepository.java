package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserRolesEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRolesRepository extends BaseRepository<UserRolesEntity, Long> {

    List<UserRolesEntity> findAllByUserId(Long userid);
}
