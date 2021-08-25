package com.notrika.gympin.common.sport.service;

import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface SportService {

    SportDto addSport(SportParam sportParam);

    SportDto updateSport(SportParam sportParam);

    SportDto getSportById(LongParam id);

    List<SportDto> getAllSport();

    void deleteSport(SportParam sportParam);

}
