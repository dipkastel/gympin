package com.notrika.gympin.domain.sportplace;

import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.common.sportplace.service.SportPlaceService;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.sport.Sport;
import com.notrika.gympin.dao.sportplace.SportPlace;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportPlaceConvertor;
import com.notrika.gympin.persistence.repository.SportPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        SportPlace initSportPlace=SportPlace.builder().place(place).sport(sport).build();
        SportPlace sportPlace = addSportPlace(initSportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    public SportPlace addSportPlace(SportPlace sportPlace){
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

    public SportPlace updateSportPlace(SportPlace sportPlace){
        return sportPlaceRepository.getById(sportPlace.getId());
    }

    @Override
    public void delete(SportPlaceParam sportPlaceParam) {
        SportPlace sportPlace = getSportPlaceById(sportPlaceParam.getId());
        deleteSportPlace(sportPlace);
    }

    public void deleteSportPlace(SportPlace sportPlace){
        sportPlaceRepository.deleteById2(sportPlace);
    }

    @Override
    public List<SportPlaceDto> getAll() {
        return SportPlaceConvertor.sportPlacesToSportPlaceDtos(getAllSportPlace());
    }

    public List<SportPlace> getAllSportPlace(){
        return sportPlaceRepository.findAll();
    }

    @Override
    public SportPlaceDto getById(long id) {
        SportPlace sportPlace = getSportPlaceById(id);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    public SportPlace getSportPlaceById(long id){
        return sportPlaceRepository.getById(id);
    }
}
