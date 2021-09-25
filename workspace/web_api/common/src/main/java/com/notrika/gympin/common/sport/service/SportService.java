package com.notrika.gympin.common.sport.service;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface SportService {

    SportDto addSport(SportParam sportParam);

    SportDto updateSport(SportParam sportParam);

    SportDto getSportDtoById(long id);

    List<SportDto> getAllSportDto();

    void deleteSport(SportParam sportParam);

}
