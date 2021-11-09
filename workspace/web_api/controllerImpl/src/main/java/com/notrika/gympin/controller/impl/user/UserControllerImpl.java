package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BaseParam;
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
    @PostMapping("/add")
    public ResponseEntity<UserDto> add(@RequestBody UserParam userParam) {
        return new ResponseEntity<>(userService.add(userParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody UserParam userParam) {
        return new ResponseEntity<>(userService.update(userParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete")
    public ResponseEntity<UserDto> delete(@RequestBody UserParam userParam) {
        return new ResponseEntity<UserDto>(userService.delete(userParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getall")
    public ResponseEntity<List<UserDto>> getAll(BaseParam pagingParam) {
        return new ResponseEntity<List<UserDto>>(userService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getbyid")
    public ResponseEntity<UserDto> getById(@RequestBody long id) {
        return new ResponseEntity<UserDto>(userService.getById(id), HttpStatus.OK);
    }

    @Override
    @PutMapping("/suspendUser")
    public ResponseEntity<UserDto> suspendUser(UserParam userParam) {
        return new ResponseEntity<UserDto>(userService.suspendUser(userParam), HttpStatus.OK);
    }
}
