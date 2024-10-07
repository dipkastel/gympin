package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.qrMessage.api.PlaceQrMessageController;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import com.notrika.gympin.common.place.qrMessage.service.PlaceQrMessageService;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeQrMessage")
public class PlaceQrMessageControllerImpl implements PlaceQrMessageController {

    @Autowired
    private PlaceQrMessageService placeQrMessageService;

    @Override
    public ResponseEntity<PlaceQrMessageDto> add( PlaceQrMessageParam placeQrMessageParam) {
        return new ResponseEntity<PlaceQrMessageDto>(placeQrMessageService.add(placeQrMessageParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceQrMessageDto> update( PlaceQrMessageParam placeQrMessageParam) {
        return new ResponseEntity<PlaceQrMessageDto>(placeQrMessageService.update(placeQrMessageParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceQrMessageDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceQrMessageDto>>(placeQrMessageService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceQrMessageDto> getById(Long id) {
        return new ResponseEntity<PlaceQrMessageDto>(placeQrMessageService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceQrMessageDto> delete(PlaceQrMessageParam placeQrMessageParam) {
        PlaceQrMessageDto placeQrMessageDto = placeQrMessageService.delete(placeQrMessageParam);
        return new ResponseEntity<PlaceQrMessageDto>(placeQrMessageDto, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceQrMessageDto>> query(BaseQuery<?> filter) {
        throw new FunctionNotAvalable();
    }

    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<PlaceQrMessageDto>> getByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<PlaceQrMessageDto>>(placeQrMessageService.getByPlaceId(placeParam.getId()), HttpStatus.OK);
    }
}
