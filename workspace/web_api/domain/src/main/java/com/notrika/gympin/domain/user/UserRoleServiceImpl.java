package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.service.UserRoleService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.dao.repository.RoleRepository;
import com.notrika.gympin.persistence.entity.user.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleServiceImpl extends AbstractBaseService<UserRoleParam,UserRoleDto,Role> implements UserRoleService {

    private final RoleRepository roleRepository;

    public UserRoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public UserRoleDto add(UserRoleParam userRoleParam) {
        Role initBuild = Role.builder().role(userRoleParam.getRole()).build();
        Role role = add(initBuild);
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

    public Role add(Role role){
        return roleRepository.add(role);
    }

    @Override
    public UserRoleDto update(UserRoleParam userRoleParam) {
        Role role = getRoleById(userRoleParam.getId());
        role.setRole(userRoleParam.getRole());
        return roleToUserRoleDto(update(role));
    }

    public Role update(Role role){
        return roleRepository.update(role);
    }

    @Override
    public UserRoleDto delete(UserRoleParam userRoleParam) {
        Role roleById = getRoleById(userRoleParam.getId());
        return roleToUserRoleDto(delete(roleById));
    }

    public Role delete(Role role){
        return roleRepository.deleteById2(role);
    }

    @Override
    public UserRoleDto getById(long id) {
        Role role = getRoleById(id);
        return roleToUserRoleDto(role);
    }

    public Role getRoleById(long id){
        return roleRepository.getById(id);
    }

    @Override
    public List<Role> getAll(Pageable pageable) {
        return roleRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserRoleDto> convertToDtos(List<Role> entities) {
        return entities.stream().map(UserRoleServiceImpl::roleToUserRoleDto).collect(Collectors.toList());
    }

    public Role getByUserRole(UserRole userRole){
        return roleRepository.getByRole(userRole);
    }

    public static UserRoleDto roleToUserRoleDto(Role role){
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

}
