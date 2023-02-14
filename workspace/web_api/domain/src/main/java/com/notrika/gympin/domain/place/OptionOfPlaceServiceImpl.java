package com.notrika.gympin.domain.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.option.service.OptionOfPlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.OptionOfPlaceRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceOptionRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.OptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionOfPlaceServiceImpl extends AbstractBaseService<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>, OptionOfPlaceEntity> implements OptionOfPlaceService {

    @Autowired
    private OptionOfPlaceRepository OptionOfPlaceRepository;

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    public OptionOfPlaceDto add(OptionOfPlaceParam optionOfPlaceParam) {
        PlaceEntity place = placeRepository.findById(optionOfPlaceParam.getPlace().getId()).get();
        PlaceOptionEntity placeOption = placeOptionRepository.findById(optionOfPlaceParam.getPlaceOption().getId()).get();
        OptionOfPlaceEntity initPlaceOption = OptionOfPlaceEntity.builder().place(place).placeOption(placeOption).build();
        OptionOfPlaceEntity optionOfPlace = add(initPlaceOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(optionOfPlace);
    }

    @Override
    public OptionOfPlaceEntity add(OptionOfPlaceEntity placeOption) {
        return OptionOfPlaceRepository.add(placeOption);
    }

    @Override
    public OptionOfPlaceDto update(OptionOfPlaceParam optionOfPlaceParam) {
//        OptionOfPlaceEntity initPlaceOption = getEntityById(PlacePlaceOptionParam.getId());
//        initPlaceOption.setPlace(PlacePlaceOptionParam.getPlace());
//        PlaceOptionEntity placeOption = update(initPlaceOption);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public OptionOfPlaceEntity update(OptionOfPlaceEntity placeOption) {
        return OptionOfPlaceRepository.update(placeOption);
    }

    @Override
    public List<OptionOfPlaceEntity> getAll(Pageable pageable) {
        return OptionOfPlaceRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<OptionOfPlaceEntity> findAll(Specification<OptionOfPlaceEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<OptionOfPlaceDto> convertToDtos(List<OptionOfPlaceEntity> entities) {
//        return OptionConvertor.placeOptionsToPlacePlaceOptionDtos(entities);
    return null;
    }

    @Override
    public Page<OptionOfPlaceDto> convertToDtos(Page<OptionOfPlaceEntity> entities) {
        return null;
    }

    @Override
    public OptionOfPlaceDto getById(long id) {
        OptionOfPlaceEntity placeOption = getEntityById(id);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public OptionOfPlaceEntity getEntityById(long id) {
        return OptionOfPlaceRepository.getById(id);
    }

    @Override
    public OptionOfPlaceDto delete(OptionOfPlaceParam optionOfPlaceParam) {
        OptionOfPlaceEntity placeOption = getEntityById(optionOfPlaceParam.getId());
        OptionOfPlaceEntity deletedPlaceOption = delete(placeOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(deletedPlaceOption);
    }

    @Override
    public OptionOfPlaceEntity delete(OptionOfPlaceEntity placeOption) {
        return OptionOfPlaceRepository.deleteById2(placeOption);
    }

    @Override
    public List<OptionOfPlaceDto> getByPlaceId(Long id) {
        List<OptionOfPlaceEntity> placeOptions = OptionOfPlaceRepository.getByPlaceId(id);
        return OptionConvertor.optionsOfPlaceToOptionsOfPlaceDto(placeOptions);
    }
}
