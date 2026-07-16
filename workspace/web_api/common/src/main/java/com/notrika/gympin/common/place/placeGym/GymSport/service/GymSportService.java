package com.notrika.gympin.common.place.placeGym.GymSport.service;

import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.GymSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.placeGym.GymSport.dto.PlaceSportDto;

import java.util.List;

public interface GymSportService extends BaseService<PlaceSportParam, PlaceSportDto, BaseQuery<?>> {

    List<PlaceSportDto> getSportsByPlace(PlaceGymParam placeParam);

}
