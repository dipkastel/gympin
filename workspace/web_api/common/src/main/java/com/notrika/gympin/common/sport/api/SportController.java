package com.notrika.gympin.common.sport.api;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SportController {

    ResponseEntity<SportDto> addSport(SportParam sportParam);

    ResponseEntity<SportDto> updateSport(SportParam sportParam);

    ResponseEntity<SportDto> getSportById(long id);

    ResponseEntity<List<SportDto>> getAllSport();

    ResponseEntity<BaseDto> deleteSport(SportParam sportParam);

}
