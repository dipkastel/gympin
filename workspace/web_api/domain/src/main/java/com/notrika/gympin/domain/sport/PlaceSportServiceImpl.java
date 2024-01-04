package com.notrika.gympin.domain.sport;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.service.PlaceSportService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.place.PlaceServiceImpl;
import com.notrika.gympin.domain.util.convertor.PlaceSportConvertor;
import com.notrika.gympin.persistence.dao.repository.sport.PlaceSportRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PlaceSportServiceImpl extends AbstractBaseService<PlaceSportParam, PlaceSportDto, BaseQuery<?>, PlaceSportEntity> implements PlaceSportService {

    @Autowired
    private PlaceServiceImpl placeService;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private PlaceSportRepository placeSportRepository;

    @Override
    public PlaceSportDto add(PlaceSportParam placeSportParam) {
        PlaceEntity place = placeService.getEntityById(placeSportParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(placeSportParam.getSport().getId());
        PlaceSportEntity initPlaceSport = PlaceSportEntity.builder().place(place).sport(sport).build();
        PlaceSportEntity placeSport = add(initPlaceSport);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public PlaceSportEntity add(PlaceSportEntity placeSport) {
        if(getSportsByPlace(placeSport.getPlace()).stream().anyMatch(o-> Objects.equals(o.getSport().getId(), placeSport.getSport().getId())))
            throw new DuplicateEntryAddExeption();
        return placeSportRepository.add(placeSport);
    }

    @Override
    public PlaceSportDto update(PlaceSportParam placeSportParam) {
        PlaceEntity place = placeService.getEntityById(placeSportParam.getPlace().getId());
        SportEntity sport = sportService.getEntityById(placeSportParam.getSport().getId());
        PlaceSportEntity initPlaceSport = getEntityById(placeSportParam.getId());
        initPlaceSport.setPlace(place);
        initPlaceSport.setSport(sport);
        PlaceSportEntity placeSport = update(initPlaceSport);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public PlaceSportEntity update(PlaceSportEntity placeSport) {
        return placeSportRepository.getById(placeSport.getId());
    }

    @Override
    public PlaceSportDto delete(PlaceSportParam placeSportParam) {
        PlaceSportEntity placeSport = getEntityById(placeSportParam.getId());
        PlaceSportEntity deletedPlaceSport = delete(placeSport);
        return PlaceSportConvertor.ToDto(deletedPlaceSport);
    }

    @Override
    public PlaceSportEntity delete(PlaceSportEntity placeSport) {
        return placeSportRepository.deleteById2(placeSport);
    }

    @Override
    public List<PlaceSportEntity> getAll(Pageable pageable) {
        return placeSportRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceSportEntity> findAll(Specification<PlaceSportEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceSportDto> convertToDtos(List<PlaceSportEntity> entities) {
        return PlaceSportConvertor.toDto(entities);
    }

    @Override
    public Page<PlaceSportDto> convertToDtos(Page<PlaceSportEntity> entities) {
        return null;
    }

    @Override
    public PlaceSportDto getById(long id) {
        PlaceSportEntity placeSport = getEntityById(id);
        return PlaceSportConvertor.ToDto(placeSport);
    }

    @Override
    public PlaceSportEntity getEntityById(long id) {
        return placeSportRepository.getById(id);
    }

    @Override
    public List<PlaceSportDto> getSportsByPlace(PlaceParam placeParam) {
        PlaceEntity place = PlaceEntity.builder().id(placeParam.getId()).build();
        List<PlaceSportEntity> sportList = getSportsByPlace(place);
        return PlaceSportConvertor.toDto(sportList);
    }

    public List<PlaceSportEntity> getSportsByPlace(PlaceEntity place) {
        return placeSportRepository.getPlaceSportByPlace(place);
    }

}
