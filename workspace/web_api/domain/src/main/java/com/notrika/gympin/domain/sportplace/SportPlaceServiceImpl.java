package com.notrika.gympin.domain.sportplace;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.common.sportplace.service.SportPlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.domain.util.convertor.SportPlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.SportPlaceRepository;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportPlaceServiceImpl extends AbstractBaseService<SportPlaceParam, SportPlaceDto, BaseFilter<?>, SportPlaceEntity> implements SportPlaceService {

    @Autowired
    private PlaceServiceImpl placeService;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private SportPlaceRepository sportPlaceRepository;

    @Override
    public SportPlaceDto add(SportPlaceParam sportPlaceParam) {
        PlaceEntity place = placeService.getEntityById(sportPlaceParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(sportPlaceParam.getSport().getId());
        SportPlaceEntity initSportPlace = SportPlaceEntity.builder().place(place).sport(sport).build();
        SportPlaceEntity sportPlace = add(initSportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    @Override
    public SportPlaceEntity add(SportPlaceEntity sportPlace) {
        return sportPlaceRepository.add(sportPlace);
    }

    @Override
    public SportPlaceDto update(SportPlaceParam sportPlaceParam) {
        PlaceEntity place = placeService.getEntityById(sportPlaceParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(sportPlaceParam.getSport().getId());
        SportPlaceEntity initSportPlace = getEntityById(sportPlaceParam.getId());
        initSportPlace.setPlace(place);
        initSportPlace.setSport(sport);
        SportPlaceEntity sportPlace = update(initSportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    @Override
    public SportPlaceEntity update(SportPlaceEntity sportPlace) {
        return sportPlaceRepository.getById(sportPlace.getId());
    }

    @Override
    public SportPlaceDto delete(SportPlaceParam sportPlaceParam) {
        SportPlaceEntity sportPlace = getEntityById(sportPlaceParam.getId());
        SportPlaceEntity deletedSportPlace = delete(sportPlace);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(deletedSportPlace);
    }

    @Override
    public SportPlaceEntity delete(SportPlaceEntity sportPlace) {
        return sportPlaceRepository.deleteById2(sportPlace);
    }

    @Override
    public List<SportPlaceEntity> getAll(Pageable pageable) {
        return sportPlaceRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<SportPlaceDto> convertToDtos(List<SportPlaceEntity> entities) {
        return SportPlaceConvertor.sportPlacesToSportPlaceDtos(entities);
    }

    @Override
    public SportPlaceDto getById(long id) {
        SportPlaceEntity sportPlace = getEntityById(id);
        return SportPlaceConvertor.sportPlaceToSportPlaceDto(sportPlace);
    }

    @Override
    public SportPlaceEntity getEntityById(long id) {
        return sportPlaceRepository.getById(id);
    }

    @Override
    public List<SportDto> getSportsByPlace(PlaceParam placeParam) {
        PlaceEntity place = PlaceEntity.builder().id(placeParam.getId()).build();
        List<SportEntity> sportList = getSportsByPlace(place);
        return SportConvertor.sportsToSportDtos(sportList);
    }

    public List<SportEntity> getSportsByPlace(PlaceEntity place) {
        return sportPlaceRepository.getSportPlaceByPlace(place);
    }

}
