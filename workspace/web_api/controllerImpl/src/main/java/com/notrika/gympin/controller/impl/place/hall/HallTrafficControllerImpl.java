package com.notrika.gympin.controller.impl.place.hall;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.hall.api.HallTrafficController;
import com.notrika.gympin.common.place.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.hall.param.HallTrafficParam;
import com.notrika.gympin.common.place.hall.service.HallTrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hallTraffic")
public class HallTrafficControllerImpl implements HallTrafficController {

    @Autowired
    HallTrafficService hallTrafficService;

    @Override
    public ResponseEntity<HallTrafficDto> add(HallTrafficParam hallTrafficParam) {
        return new ResponseEntity<>(hallTrafficService.add(hallTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<HallTrafficDto> update(HallTrafficParam hallTrafficParam) {
        return new ResponseEntity<>(hallTrafficService.update(hallTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<HallTrafficDto> delete(HallTrafficParam hallTrafficParam) {
        return new ResponseEntity<>(hallTrafficService.delete(hallTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<HallTrafficDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(hallTrafficService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<HallTrafficDto> getById(Long id) {
        return new ResponseEntity<>(hallTrafficService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<HallTrafficDto>> query(BaseQuery<?> filter) {
        return new ResponseEntity<>(hallTrafficService.query(filter), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByHall")
    public ResponseEntity<HallTrafficDto> getLatestTraficByHall(HallParam hallParam) {
        return new ResponseEntity<HallTrafficDto>(hallTrafficService.getLatestByHallId(hallParam.getId()), HttpStatus.OK);
    }
}
