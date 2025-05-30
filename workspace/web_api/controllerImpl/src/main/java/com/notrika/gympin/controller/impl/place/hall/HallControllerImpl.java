package com.notrika.gympin.controller.impl.place.hall;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.hall.api.HallController;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.place.hall.filter.HallFilter;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.hall.service.HallService;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hall")
public class HallControllerImpl implements HallController {

    @Autowired
    private HallService hallService;

    @Override
    public ResponseEntity<HallDto> add(HallParam hallParam) {
        return ResponseEntity.ok(hallService.add(hallParam));
    }

    @Override
    public ResponseEntity<HallDto> update(HallParam hallParam) {
        return ResponseEntity.ok(hallService.update(hallParam));
    }

    @Override
    public ResponseEntity<HallDto> delete(HallParam hallParam) {
        return ResponseEntity.ok(hallService.delete(hallParam));
    }

    @Override
    public ResponseEntity<List<HallDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(hallService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<HallDto> getById(Long id) {
        return ResponseEntity.ok(hallService.getById(id));
    }

    @Override
    public ResponseEntity<Page<HallDto>> query(HallFilter param) {
        throw new FunctionNotAvalable();
    }

    @Override
    @GetMapping("/getHallsByPlace")
    public ResponseEntity<List<HallDto>> getHallsByPlace(PlaceGymParam place) {
        return ResponseEntity.ok(hallService.getHallsByPlace(place));
    }

    @Override
    @GetMapping("/getHallsBySport")
    public ResponseEntity<List<HallDto>> getHallsBySport(SportParam sport) {
        return ResponseEntity.ok(hallService.getHallsBySport(sport));
    }
}
