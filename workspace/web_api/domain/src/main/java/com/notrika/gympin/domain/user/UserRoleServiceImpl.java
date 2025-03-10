package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.user.dto.RoleEnumDto;
import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.UserRoleParam;
import com.notrika.gympin.common.user.user.service.UserRoleService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.purchased.EntryAlreadyExistException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.UserRoleConvertor;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRolesRepository;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserRolesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleServiceImpl extends AbstractBaseService<UserRoleParam, UserRoleDto, BaseQuery<?>, UserRolesEntity> implements UserRoleService {

    @Autowired
    private UserRolesRepository userRoleRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserRoleDto add(UserRoleParam userRoleParam) {
        UserEntity user = userRepository.getById(userRoleParam.getUser().getId());
        if (user.getUserRoles().contains(userRoleParam.getRole())) {
            throw new EntryAlreadyExistException();
        }
        var userRole = add(UserRolesEntity.builder()
                .user(user)
                .role(userRoleParam.getRole())
                .build()
        );
        return UserRoleConvertor.ToUserRoleDto(userRole.getUser());
    }

    @Override
    public UserRolesEntity add(UserRolesEntity role) {
        return userRoleRepository.add(role);
    }

    @Override
    public UserRoleDto update(UserRoleParam userRoleParam) {
        UserRolesEntity role = getEntityById(userRoleParam.getId());
        role.setRole(userRoleParam.getRole());
        return UserRoleConvertor.ToUserRoleDto(update(role).getUser());
    }

    @Override
    public UserRolesEntity update(UserRolesEntity role) {
        return userRoleRepository.update(role);
    }

    @Override
    public UserRoleDto delete(UserRoleParam userRoleParam) {
       var user =  userRepository.getById(userRoleParam.getUser().getId());
       var itemToDelete = user.getUserRoles().stream().filter(o->!o.isDeleted()).filter(ur->ur.getRole()==userRoleParam.getRole()).collect(Collectors.toList());
       userRoleRepository.deleteAll(itemToDelete);
        return UserRoleConvertor.ToUserRoleDto(user);
    }

    @Override
    public UserRolesEntity delete(UserRolesEntity role) {
        return userRoleRepository.deleteById2(role);
    }

    @Override
    public UserRoleDto getById(long id) {
        UserRolesEntity role = getEntityById(id);
        return UserRoleConvertor.ToUserRoleDto(role.getUser());
    }

    @Override
    public UserRolesEntity getEntityById(long id) {
        return userRoleRepository.findById(id).stream().filter(o->!o.isDeleted()).findFirst().get();
    }

    @Override
    public List<UserRolesEntity> getAll(Pageable pageable) {
        return userRoleRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<UserRolesEntity> findAll(Specification<UserRolesEntity> specification, Pageable pageable) {

        return userRoleRepository.findAll(specification, pageable);
    }

    @Override
    public List<UserRoleDto> convertToDtos(List<UserRolesEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(r -> UserRoleConvertor.ToUserRoleDto(r.getUser())).collect(Collectors.toList());
    }

    @Override
    public Page<UserRoleDto> convertToDtos(Page<UserRolesEntity> entities) {
        return entities.map(r -> UserRoleConvertor.ToUserRoleDto(r.getUser()));
    }


    @Override
    public List<RoleEnumDto> getAllRoles() {
        return Arrays.stream(RoleEnum.values()).map(R -> RoleEnumDto.builder().roleName(R.getName()).role(R).build()).collect(Collectors.toList());
    }
}
