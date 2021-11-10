package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BaseParam;
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
    @PostMapping("/add")
    public ResponseEntity<UserDto> add(@RequestBody UserParam administratorParam) {
        return new ResponseEntity<>(administratorService.add(administratorParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody UserParam administratorParam) {
        return new ResponseEntity<>(administratorService.update(administratorParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete")
    public ResponseEntity<UserDto> delete(@RequestBody UserParam administratorParam) {
       return new ResponseEntity<UserDto>(administratorService.delete(administratorParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getall")
    public ResponseEntity<List<UserDto>> getAll(BaseParam pagingParam) {
        return new ResponseEntity<List<UserDto>>(administratorService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getbyid")
    public ResponseEntity<UserDto> getById(long id) {
        return new ResponseEntity<UserDto>(administratorService.getById(id), HttpStatus.OK);
    }
}
