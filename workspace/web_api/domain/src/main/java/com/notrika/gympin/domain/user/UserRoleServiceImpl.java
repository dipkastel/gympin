package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.service.UserRoleService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.dao.repository.RoleRepository;
import com.notrika.gympin.persistence.entity.user.RoleEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleServiceImpl extends AbstractBaseService<UserRoleParam, UserRoleDto, BaseFilter<?>, RoleEntity> implements UserRoleService {

    private final RoleRepository roleRepository;

    public UserRoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public static UserRoleDto roleToUserRoleDto(RoleEntity role) {
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

    @Override
    public UserRoleDto add(UserRoleParam userRoleParam) {
        RoleEntity initBuild = RoleEntity.builder().role(userRoleParam.getRole()).build();
        RoleEntity role = add(initBuild);
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

    @Override
    public RoleEntity add(RoleEntity role) {
        return roleRepository.add(role);
    }

    @Override
    public UserRoleDto update(UserRoleParam userRoleParam) {
        RoleEntity role = getEntityById(userRoleParam.getId());
        role.setRole(userRoleParam.getRole());
        return roleToUserRoleDto(update(role));
    }

    @Override
    public RoleEntity update(RoleEntity role) {
        return roleRepository.update(role);
    }

    @Override
    public UserRoleDto delete(UserRoleParam userRoleParam) {
        RoleEntity roleById = getEntityById(userRoleParam.getId());
        return roleToUserRoleDto(delete(roleById));
    }

    @Override
    public RoleEntity delete(RoleEntity role) {
        return roleRepository.deleteById2(role);
    }

    @Override
    public UserRoleDto getById(long id) {
        RoleEntity role = getEntityById(id);
        return roleToUserRoleDto(role);
    }

    @Override
    public RoleEntity getEntityById(long id) {
        return roleRepository.getById(id);
    }

    @Override
    public List<RoleEntity> getAll(Pageable pageable) {
        return roleRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserRoleDto> convertToDtos(List<RoleEntity> entities) {
        return entities.stream().map(UserRoleServiceImpl::roleToUserRoleDto).collect(Collectors.toList());
    }

    public RoleEntity getByUserRole(UserRole userRole) {
        return roleRepository.findByRole(userRole);
    }

}
