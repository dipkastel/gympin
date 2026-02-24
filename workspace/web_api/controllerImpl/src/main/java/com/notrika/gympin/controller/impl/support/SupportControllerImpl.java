package com.notrika.gympin.controller.impl.support;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.support.dto.SupportMessageDto;
import com.notrika.gympin.common.support.query.SupportQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.support.api.SupportController;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.support.service.SupportService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
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
    public ResponseEntity<List<SupportDto>> getByPlace(PlaceGymParam param) {
        return new ResponseEntity<List<SupportDto>>(supportService.getByPlace(param),HttpStatus.OK);
    }
    @Override
    @GetMapping("/getByCorporate")
    public ResponseEntity<List<SupportDto>> getByCorporate(CorporateParam param) {
        return new ResponseEntity<List<SupportDto>>(supportService.getByCorporate(param),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCorporateSupportCount")
    public ResponseEntity<Long> getCorporateSupportCount(CorporateParam param) {
        return new ResponseEntity<Long>(supportService.getCorporateSupportCount(param),HttpStatus.OK);
    }

    @Override
    @GetMapping("/setMessagesRead")
    public ResponseEntity<Boolean> setMessagesRead(Long id) {
        return new ResponseEntity<Boolean>(supportService.setMessagesReadById(id),HttpStatus.OK);
    }

    @Override
    @PostMapping("/updateMessage")
    public ResponseEntity<SupportMessageDto> updateMessage(SupportMessageParam param) {
        return new ResponseEntity<>(supportService.updateMessage(param),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SupportDto> update(SupportParam supportParam) {
        return new ResponseEntity<SupportDto>(supportService.update(supportParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SupportDto> delete(SupportParam supportParam) {
        return new ResponseEntity<SupportDto>(supportService.delete(supportParam),HttpStatus.OK);
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
    public ResponseEntity<Page<SupportDto>> query(SupportQuery filter) {
        return new ResponseEntity<>(supportService.query(filter),HttpStatus.OK);
    }


}
