package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.user.api.AdministratorController;
import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.param.AdministratorParam;
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
    public ResponseEntity<AdministratorDto> add(@RequestBody AdministratorParam administratorParam) {
        return new ResponseEntity<>(administratorService.add(administratorParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<AdministratorDto> update(@RequestBody AdministratorParam administratorParam) {
        return new ResponseEntity<>(administratorService.update(administratorParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete")
    public void delete(@RequestBody AdministratorParam administratorParam) {
        administratorService.delete(administratorParam);
    }

    @Override
    @GetMapping("/getall")
    public ResponseEntity<List<AdministratorDto>> getAll() {
        return new ResponseEntity<List<AdministratorDto>>(administratorService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getbyid")
    public ResponseEntity<AdministratorDto> getById(long id) {
        return new ResponseEntity<AdministratorDto>(administratorService.getById(id), HttpStatus.OK);
    }
}
