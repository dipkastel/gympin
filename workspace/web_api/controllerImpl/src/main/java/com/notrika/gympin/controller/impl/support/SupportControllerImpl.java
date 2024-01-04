package com.notrika.gympin.controller.impl.support;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.api.SupportController;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.support.service.SupportService;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/support")
public class SupportControllerImpl implements SupportController {

    @Autowired
    SupportService supportService;

    @Override
    public ResponseEntity<SupportDto> add(SupportParam supportParam) {
        return new ResponseEntity<SupportDto>(supportService.add(supportParam),HttpStatus.OK);
    }

    @Override
    @PostMapping("/addMessage")
    public ResponseEntity<SupportDto> addMessageToSupport(@RequestBody SupportMessageParam param) throws Exception {
        return new ResponseEntity<SupportDto>(supportService.addMessageToSupport(param),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByUser")
    public ResponseEntity<List<SupportDto>> getByUser(UserParam param) {
        return new ResponseEntity<List<SupportDto>>(supportService.getByUser(param),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<SupportDto>> getByPlace(PlaceParam param) {
        return new ResponseEntity<List<SupportDto>>(supportService.getByPlace(param),HttpStatus.OK);
    }
    @Override
    @GetMapping("/getByCorporate")
    public ResponseEntity<List<SupportDto>> getByCorporate(CorporateParam param) {
        return new ResponseEntity<List<SupportDto>>(supportService.getByCorporate(param),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SupportDto> update(SupportParam supportParam) {
        return null;
    }

    @Override
    public ResponseEntity<SupportDto> delete(SupportParam supportParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<SupportDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(supportService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SupportDto> getById(Long id) {
        return new ResponseEntity<>(supportService.getById(id),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<SupportDto>> query(BaseQuery<?> filter) {
        return new ResponseEntity<>(supportService.query(filter),HttpStatus.OK);
    }


}
