package com.notrika.gympin.controller.impl.place.placeSport;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.api.PlaceSportController;
import com.notrika.gympin.common.place.placeSport.service.PlaceSportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeSport")
public class PlaceSportControllerImpl implements PlaceSportController {

    @Autowired
    private PlaceSportService placeSportService;

    @Override
    public ResponseEntity<PlaceSportDto> add(PlaceSportParam placeSportParam) {
        return new ResponseEntity<PlaceSportDto>(placeSportService.add(placeSportParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceSportDto> update(PlaceSportParam placeSportParam) {
        return new ResponseEntity<PlaceSportDto>(placeSportService.update(placeSportParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceSportDto> delete(PlaceSportParam placeSportParam) {
        var deleted = placeSportService.delete(placeSportParam);
        return new ResponseEntity<PlaceSportDto>(deleted, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceSportDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceSportDto>>(placeSportService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceSportDto> getById(Long id) {
        return new ResponseEntity<PlaceSportDto>(placeSportService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("getSportsByPlace")
    public ResponseEntity<List<PlaceSportDto>> getSportsByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<PlaceSportDto>>(placeSportService.getSportsByPlace(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<PlaceSportDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
