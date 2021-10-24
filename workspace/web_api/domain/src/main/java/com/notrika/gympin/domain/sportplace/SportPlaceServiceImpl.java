package com.notrika.gympin.domain.sportplace;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.common.sportplace.service.SportPlaceService;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.domain.util.convertor.SportPlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.SportPlaceRepository;
import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.sport.Sport;
import com.notrika.gympin.persistence.entity.sportplace.SportPlace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportPlaceServiceImpl implements SportPlaceService {

    @Autowired
    private PlaceServiceImpl placeService;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private SportPlaceRepository sportPlaceRepository;

    @Override
    public SportPlaceDto add(SportPlaceParam sportPlaceParam) {
        Place place = placeService.getPlaceById(sportPlaceParam.getPlace().getId());
        Sport sport = sportService.getSportById(sportPlaceParam.getSport().getId());
        SportPlace initSportPlace = SportPlace.builder().place(place).sport(sport).build();
        SportPlace sportPlace = addSportPlace(initSportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    public SportPlace addSportPlace(SportPlace sportPlace) {
        return sportPlaceRepository.add(sportPlace);
    }

    @Override
    public SportPlaceDto update(SportPlaceParam sportPlaceParam) {
        Place place = placeService.getPlaceById(sportPlaceParam.getPlace().getId());
        Sport sport = sportService.getSportById(sportPlaceParam.getSport().getId());
        SportPlace initSportPlace = getSportPlaceById(sportPlaceParam.getId());
        initSportPlace.setPlace(place);
        initSportPlace.setSport(sport);
        SportPlace sportPlace = updateSportPlace(initSportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    public SportPlace updateSportPlace(SportPlace sportPlace) {
        return sportPlaceRepository.getById(sportPlace.getId());
    }

    @Override
    public SportPlaceDto delete(SportPlaceParam sportPlaceParam) {
        SportPlace sportPlace = getSportPlaceById(sportPlaceParam.getId());
        SportPlace deletedSportPlace = deleteSportPlace(sportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(deletedSportPlace);
    }

    public SportPlace deleteSportPlace(SportPlace sportPlace) {
        SportPlace deletedSportPlace = sportPlaceRepository.deleteById2(sportPlace);
        return deletedSportPlace;
    }

    @Override
    public List<SportPlaceDto> getAll() {
        throw new ExceptionBase(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.USER_NOT_FOUND);
        //return SportPlaceConvertor.sportPlacesToSportPlaceDtos(getAllSportPlace());
    }

    public List<SportPlace> getAllSportPlace() {
        return sportPlaceRepository.findAllUndeleted();
    }

    @Override
    public SportPlaceDto getById(long id) {
        SportPlace sportPlace = getSportPlaceById(id);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    public SportPlace getSportPlaceById(long id) {
        return sportPlaceRepository.getById(id);
    }

    @Override
    public List<SportDto> getSportsByPlace(PlaceParam placeParam) {
        Place place = Place.builder().id(placeParam.getId()).build();
        List<Sport> sportList = getSportsByPlace(place);
        List<SportDto> sportDtos = SportConvertor.sportsToSportDtos(sportList);
        return sportDtos;
    }

    public List<Sport> getSportsByPlace(Place place) {
        return sportPlaceRepository.getSportPlaceByPlace(place);
    }

}
