package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends BaseRepository<Role, Long> {

    Role getByRole(UserRole role);

}