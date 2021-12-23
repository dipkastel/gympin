package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.user.api.AdministratorController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/administrator")
public class AdministratorControllerImpl implements AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @Override
    public ResponseEntity<UserDto> add(@RequestBody UserParam administratorParam) {
        return new ResponseEntity<>(administratorService.add(administratorParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserDto> update(@RequestBody UserParam administratorParam) {
        return new ResponseEntity<>(administratorService.update(administratorParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserDto> delete(@RequestBody UserParam administratorParam) {
       return new ResponseEntity<UserDto>(administratorService.delete(administratorParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<UserDto>>(administratorService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserDto> getById(long id) {
        return new ResponseEntity<UserDto>(administratorService.getById(id), HttpStatus.OK);
    }
}
