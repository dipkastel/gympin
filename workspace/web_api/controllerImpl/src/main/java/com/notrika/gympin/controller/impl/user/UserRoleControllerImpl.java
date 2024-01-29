package com.notrika.gympin.controller.impl.user;


import com.notrika.gympin.common.user.user.api.AccountController;
import com.notrika.gympin.common.user.user.api.UserRolesController;
import com.notrika.gympin.common.user.user.dto.*;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.user.user.query.UserRoleQuery;
import com.notrika.gympin.common.user.user.service.AccountService;
import com.notrika.gympin.common.user.user.service.UserRoleService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userRoles")
public class UserRoleControllerImpl implements UserRolesController {

    @Autowired
    private UserRoleService userRoleService;

    @Override
    @GetMapping("/getAllRoles")
    public ResponseEntity<List<RoleEnumDto>> getAllRoles() {
        return ResponseEntity.ok(userRoleService.getAllRoles());
    }

    @Override
    public ResponseEntity<UserRoleDto> add(UserRoleParam userRoleParam) {
        return ResponseEntity.ok(userRoleService.add(userRoleParam));
    }

    @Override
    public ResponseEntity<UserRoleDto> update(UserRoleParam userRoleParam) {
        return ResponseEntity.ok(userRoleService.update(userRoleParam));
    }

    @Override
    public ResponseEntity<UserRoleDto> delete(UserRoleParam userRoleParam) {
        return ResponseEntity.ok(userRoleService.delete(userRoleParam));
    }

    @Override
    public ResponseEntity<List<UserRoleDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(userRoleService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<UserRoleDto> getById(Long id) {
        return ResponseEntity.ok(userRoleService.getById(id));
    }

    @Override
    public ResponseEntity<Page<UserRoleDto>> query(UserRoleQuery param) {
        return ResponseEntity.ok(userRoleService.query(param));
    }
}
