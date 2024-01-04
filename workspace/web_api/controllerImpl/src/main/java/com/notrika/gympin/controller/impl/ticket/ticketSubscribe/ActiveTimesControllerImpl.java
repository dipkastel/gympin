package com.notrika.gympin.controller.impl.ticket.ticketSubscribe;

import com.notrika.gympin.common.ticket.ticketSubscribe.service.ActiveTimesService;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.api.ActiveTimesController;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ticketSubscribeActiveTimes")
public class ActiveTimesControllerImpl implements ActiveTimesController {

    @Autowired
    private ActiveTimesService activeTimesService;

    @Override
    public ResponseEntity<ActiveTimesDto> add(ActiveTimesParam activeTimesParam) {
        return new ResponseEntity<>(activeTimesService.add(activeTimesParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ActiveTimesDto> update(ActiveTimesParam activeTimesParam) {
        return new ResponseEntity<>(activeTimesService.update(activeTimesParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ActiveTimesDto> delete(ActiveTimesParam activeTimesParam) {
        return new ResponseEntity<>(activeTimesService.delete(activeTimesParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ActiveTimesDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(activeTimesService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ActiveTimesDto> getById(Long id) {
        return new ResponseEntity<>(activeTimesService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<ActiveTimesDto>> query(BaseQuery<?> filter) {
        return null;
    }


    @Override
    @GetMapping("/getByHall")
    public ResponseEntity<List<ActiveTimesDto>> getTicketSubscribeActiveTimesByHall(HallParam hallParam) {
        return new ResponseEntity<>(activeTimesService.getByHallId(hallParam.getId()), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<ActiveTimesDto>> getTicketSubscribeActiveTimesByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<ActiveTimesDto>>(activeTimesService.getByPlaceId(placeParam.getId()),HttpStatus.OK);
    }

    @Override
    @PostMapping("/addAll")
    public ResponseEntity<List<ActiveTimesDto>> addAll(@RequestBody List<ActiveTimesParam> activeTimesParams) {
        return new ResponseEntity<List<ActiveTimesDto>>(activeTimesService.addAll(activeTimesParams), HttpStatus.OK);
    }


}
