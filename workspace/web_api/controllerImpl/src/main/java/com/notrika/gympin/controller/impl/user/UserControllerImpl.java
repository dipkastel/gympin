package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.user.api.UserController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.query.UserQuery;
import com.notrika.gympin.common.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleUpdateParam;
import com.notrika.gympin.common.user.param.UserStatusParam;
import com.notrika.gympin.common.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<UserDto> add(UserParam userParam) {
        return ResponseEntity.ok(userService.add(userParam));
    }

    @Override
    public ResponseEntity<UserDto> update(UserParam userParam) {
        return ResponseEntity.ok(userService.update(userParam));
    }

    @Override
    public ResponseEntity<UserDto> delete(UserParam userParam) {
        return ResponseEntity.ok(userService.delete(userParam));
    }

    @Override
    public ResponseEntity<List<UserDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(userService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<UserDto> getById(Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }
    //status
    @Override
    @GetMapping("/getUserStatuses")
    public ResponseEntity<List<String>> getUserStatuses() {
        return ResponseEntity.ok(Arrays.stream(UserStatus.values()).map(Enum::toString).collect(Collectors.toList()));
    }

    @Override
    @PutMapping("/updateUserStatus")
    public ResponseEntity<UserDto> updateUserStatus(UserStatusParam userParam) {
        return ResponseEntity.ok(userService.updateUserStatus(userParam));
    }

    //avatar
    @Override
    @PutMapping("/updateUserAvatar")
    public ResponseEntity<UserDto> updateUserAvatar(UserAvatarParam userParam) {
        return ResponseEntity.ok(userService.updateUserAvatar(userParam));
    }

    //roles
    @Override
    @GetMapping("/getUserRoles")
    public ResponseEntity<List<UserRoleInfoDto>> getUserRoles() {
        return ResponseEntity.ok(userService.getAllRules());
    }

    @Override
    @PutMapping("/updateUserRole")
    public ResponseEntity<UserDto> updateUserRole(@RequestBody UserRoleUpdateParam userParam) {
        return ResponseEntity.ok(userService.UpdateUserRole(userParam));
    }

    @Override
    @GetMapping("/getUserByUsername")
    public ResponseEntity<UserDto> getUserByUsername(UserParam userParam) {
        return ResponseEntity.ok(userService.getUserByUsername(userParam));
    }

    @Override
    @GetMapping("/checkUsernameAvailable")
    public ResponseEntity<Boolean> checkUsernameAvailable(String username) {
        return ResponseEntity.ok(userService.checkUsernameAvailable(username));
    }

    @Override
    public ResponseEntity<Page<UserDto>> query(UserQuery param) {
        return ResponseEntity.ok(userService.query(param));
    }

}
