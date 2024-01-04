package com.notrika.gympin.persistence.dao.repository.user;

import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.user.UserRoleEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends BaseRepository<UserRoleEntity, Long> {

    UserRoleEntity findByRole(UserRole role);

}
