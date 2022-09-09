package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.user.RoleEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends BaseRepository<RoleEntity, Long> {

    RoleEntity findByRole(UserRole role);

}