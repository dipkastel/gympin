package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.user.api.UserController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Override
    @PutMapping("/suspendUser")
    public ResponseEntity<UserDto> suspendUser(UserParam userParam) {
        return ResponseEntity.ok(userService.suspendUser(userParam));
    }

    @Override
    @GetMapping("/getUserByUsername")
    public ResponseEntity<UserDto> getUserByUsername(UserParam userParam) {
        return ResponseEntity.ok(userService.getUserByUsername(userParam));
    }
}
