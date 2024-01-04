package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.option.service.OptionOfPlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceOptionOfPlaceRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceOptionRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class OptionOfPlaceServiceImpl extends AbstractBaseService<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>, PlaceOptionOfPlaceEntity> implements OptionOfPlaceService {

    @Autowired
    private PlaceOptionOfPlaceRepository placeOptionOfPlaceRepository;

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    @Transactional
    public OptionOfPlaceDto add(OptionOfPlaceParam optionOfPlaceParam) {
        PlaceEntity place = placeRepository.findById(optionOfPlaceParam.getPlace().getId()).get();
        PlaceOptionEntity placeOption = placeOptionRepository.findById(optionOfPlaceParam.getPlaceOption().getId()).get();
        PlaceOptionOfPlaceEntity initPlaceOption = PlaceOptionOfPlaceEntity.builder().place(place).placeOption(placeOption).build();
        PlaceOptionOfPlaceEntity optionOfPlace = add(initPlaceOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(optionOfPlace);
    }

    @Override
    @Transactional
    public PlaceOptionOfPlaceEntity add(PlaceOptionOfPlaceEntity placeOption) {
        if(getByPlaceId(placeOption.getPlace().getId()).stream().anyMatch(o-> Objects.equals(o.getPlaceOption().getId(), placeOption.getPlaceOption().getId())))
            throw new DuplicateEntryAddExeption();
        return placeOptionOfPlaceRepository.add(placeOption);
    }

    @Override
    public OptionOfPlaceDto update(OptionOfPlaceParam optionOfPlaceParam) {
//        PlaceOptionOfPlaceEntity initPlaceOption = getEntityById(PlacePlaceOptionParam.getId());
//        initPlaceOption.setPlace(PlacePlaceOptionParam.getPlace());
//        PlaceOptionEntity placeOption = update(initPlaceOption);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public PlaceOptionOfPlaceEntity update(PlaceOptionOfPlaceEntity placeOption) {
        return placeOptionOfPlaceRepository.update(placeOption);
    }

    @Override
    public List<PlaceOptionOfPlaceEntity> getAll(Pageable pageable) {
        return placeOptionOfPlaceRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceOptionOfPlaceEntity> findAll(Specification<PlaceOptionOfPlaceEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<OptionOfPlaceDto> convertToDtos(List<PlaceOptionOfPlaceEntity> entities) {
//        return OptionConvertor.placeOptionsToPlacePlaceOptionDtos(entities);
    return null;
    }

    @Override
    public Page<OptionOfPlaceDto> convertToDtos(Page<PlaceOptionOfPlaceEntity> entities) {
        return null;
    }

    @Override
    public OptionOfPlaceDto getById(long id) {
        PlaceOptionOfPlaceEntity placeOption = getEntityById(id);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public PlaceOptionOfPlaceEntity getEntityById(long id) {
        return placeOptionOfPlaceRepository.getById(id);
    }

    @Override
    public OptionOfPlaceDto delete(OptionOfPlaceParam optionOfPlaceParam) {
        PlaceOptionOfPlaceEntity placeOption = getEntityById(optionOfPlaceParam.getId());
        PlaceOptionOfPlaceEntity deletedPlaceOption = delete(placeOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(deletedPlaceOption);
    }

    @Override
    public PlaceOptionOfPlaceEntity delete(PlaceOptionOfPlaceEntity placeOption) {
        return placeOptionOfPlaceRepository.deleteById2(placeOption);
    }

    @Override
    public List<OptionOfPlaceDto> getByPlaceId(Long id) {
        List<PlaceOptionOfPlaceEntity> placeOptions = placeOptionOfPlaceRepository.getByPlaceId(id);
        return OptionConvertor.optionsOfPlaceToOptionsOfPlaceDto(placeOptions);
    }
}
