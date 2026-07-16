package com.notrika.gympin.domain.place.Gym;

import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.GymSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeGym.GymSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.place.placeGym.GymSport.service.GymSportService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceSportConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymSportRepository;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.Gym.SportEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymSportEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class GymSportServiceImpl extends AbstractBaseService<PlaceSportParam, PlaceSportDto, BaseQuery<?>, GymSportEntity> implements GymSportService {

    @Autowired
    private GymServiceImpl placeService;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private GymSportRepository placeSportRepository;

    @Override
    public PlaceSportDto add(PlaceSportParam placeSportParam) {
        GymEntity place = placeService.getEntityById(placeSportParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(placeSportParam.getSport().getId());
        GymSportEntity initPlaceSport = GymSportEntity.builder().place(place).sport(sport).build();
        GymSportEntity placeSport = add(initPlaceSport);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public GymSportEntity add(GymSportEntity placeSport) {
        if(getSportsByPlace(placeSport.getPlace()).stream().filter(o->!o.isDeleted()).anyMatch(o-> Objects.equals(o.getSport().getId(), placeSport.getSport().getId())))
            throw new DuplicateEntryAddExeption();
        return placeSportRepository.add(placeSport);
    }

    @Override
    public PlaceSportDto update(PlaceSportParam placeSportParam) {
        GymEntity place = placeService.getEntityById(placeSportParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(placeSportParam.getSport().getId());
        GymSportEntity initPlaceSport = getEntityById(placeSportParam.getId());
        initPlaceSport.setPlace(place);
        initPlaceSport.setSport(sport);
        GymSportEntity placeSport = update(initPlaceSport);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public GymSportEntity update(GymSportEntity placeSport) {
        return placeSportRepository.getById(placeSport.getId());
    }

    @Override
    public PlaceSportDto delete(PlaceSportParam placeSportParam) {
        GymSportEntity placeSport = getEntityById(placeSportParam.getId());
        GymSportEntity deletedPlaceSport = delete(placeSport);
        return PlaceSportConvertor.ToDto(deletedPlaceSport);
    }

    @Override
    public GymSportEntity delete(GymSportEntity placeSport) {
        return placeSportRepository.deleteById2(placeSport);
    }

    @Override
    public List<GymSportEntity> getAll(Pageable pageable) {
        return placeSportRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<GymSportEntity> findAll(Specification<GymSportEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceSportDto> convertToDtos(List<GymSportEntity> entities) {
        return PlaceSportConvertor.toDto(entities);
    }

    @Override
    public Page<PlaceSportDto> convertToDtos(Page<GymSportEntity> entities) {
        return null;
    }

    @Override
    public PlaceSportDto getById(long id) {
        GymSportEntity placeSport = getEntityById(id);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public GymSportEntity getEntityById(long id) {
        return placeSportRepository.getById(id);
    }

    @Override
    public List<PlaceSportDto> getSportsByPlace(PlaceGymParam placeParam) {
        GymEntity place = GymEntity.builder().id(placeParam.getId()).build();
        List<GymSportEntity> sportList = getSportsByPlace(place);
        return PlaceSportConvertor.toDto(sportList);
    }

    public List<GymSportEntity> getSportsByPlace(GymEntity place) {
        return placeSportRepository.getPlaceSportByPlace(place);
    }

}
