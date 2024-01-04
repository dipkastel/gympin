package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.common.user.user.param.UserRoleParam;
import com.notrika.gympin.common.user.user.service.UserRoleService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.dao.repository.user.UserRoleRepository;
import com.notrika.gympin.persistence.entity.user.UserRoleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleServiceImpl extends AbstractBaseService<UserRoleParam, UserRoleDto, BaseQuery<?>, UserRoleEntity> implements UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public static UserRoleDto roleToUserRoleDto(UserRoleEntity role) {
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

    @Override
    public UserRoleDto add(UserRoleParam userRoleParam) {
        UserRoleEntity initBuild = UserRoleEntity.builder().role(userRoleParam.getRole()).build();
        UserRoleEntity role = add(initBuild);
        return UserRoleDto.builder().id(role.getId()).role(role.getRole()).build();
    }

    @Override
    public UserRoleEntity add(UserRoleEntity role) {
        return userRoleRepository.add(role);
    }

    @Override
    public UserRoleDto update(UserRoleParam userRoleParam) {
        UserRoleEntity role = getEntityById(userRoleParam.getId());
        role.setRole(userRoleParam.getRole());
        return roleToUserRoleDto(update(role));
    }

    @Override
    public UserRoleEntity update(UserRoleEntity role) {
        return userRoleRepository.update(role);
    }

    @Override
    public UserRoleDto delete(UserRoleParam userRoleParam) {
        UserRoleEntity roleById = getEntityById(userRoleParam.getId());
        return roleToUserRoleDto(delete(roleById));
    }

    @Override
    public UserRoleEntity delete(UserRoleEntity role) {
        return userRoleRepository.deleteById2(role);
    }

    @Override
    public UserRoleDto getById(long id) {
        UserRoleEntity role = getEntityById(id);
        return roleToUserRoleDto(role);
    }

    @Override
    public UserRoleEntity getEntityById(long id) {
        return userRoleRepository.findById(id).stream().findFirst().get();
    }

    @Override
    public List<UserRoleEntity> getAll(Pageable pageable) {
        return userRoleRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<UserRoleEntity> findAll(Specification<UserRoleEntity> specification, Pageable pageable) {

        return userRoleRepository.findAll(specification,pageable);
    }

    @Override
    public List<UserRoleDto> convertToDtos(List<UserRoleEntity> entities) {
        return entities.stream().map(UserRoleServiceImpl::roleToUserRoleDto).collect(Collectors.toList());
    }

    @Override
    public Page<UserRoleDto> convertToDtos(Page<UserRoleEntity> entities) {
        return null;
    }

    public UserRoleEntity getByUserRole(UserRole userRole) {
        return userRoleRepository.findByRole(userRole);
    }

}
