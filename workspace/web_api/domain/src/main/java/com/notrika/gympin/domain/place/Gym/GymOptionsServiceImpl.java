package com.notrika.gympin.domain.place.Gym;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.place.parts.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.parts.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.parts.option.service.GymOptionsService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymRepository;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymOptionsRepository;
import com.notrika.gympin.persistence.dao.repository.place.Gym.OptionRepository;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.Gym.OptionEntity;
import com.notrika.gympin.persistence.entity.place.Gym.OptionOfGymEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class GymOptionsServiceImpl extends AbstractBaseService<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>, OptionOfGymEntity> implements GymOptionsService {

    @Autowired
    private GymOptionsRepository GymOptionsRepository;
    @Autowired
    private GymRepository GymRepository;
    @Autowired
    private OptionRepository OptionRepository;

    @Override
    @Transactional
    public OptionOfPlaceDto add(OptionOfPlaceParam optionOfPlaceParam) {
        GymEntity place = GymRepository.findById(optionOfPlaceParam.getPlace().getId()).get();
        OptionEntity placeOption = OptionRepository.findById(optionOfPlaceParam.getPlaceOption().getId()).get();
        OptionOfGymEntity initPlaceOption = OptionOfGymEntity.builder().place(place).placeOption(placeOption).build();
        OptionOfGymEntity optionOfPlace = add(initPlaceOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(optionOfPlace);
    }

    @Override
    @Transactional
    public OptionOfGymEntity add(OptionOfGymEntity placeOption) {
        if(getByPlaceId(placeOption.getPlace().getId()).stream().filter(o->!o.isDeleted()).anyMatch(o-> Objects.equals(o.getPlaceOption().getId(), placeOption.getPlaceOption().getId())))
            throw new DuplicateEntryAddExeption();
        return GymOptionsRepository.add(placeOption);
    }

    @Override
    public OptionOfPlaceDto update(OptionOfPlaceParam optionOfPlaceParam) {
//        OptionOfGymEntity initPlaceOption = getEntityById(PlacePlaceOptionParam.getId());
//        initPlaceOption.setPlace(PlacePlaceOptionParam.getPlace());
//        OptionEntity placeOption = update(initPlaceOption);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public OptionOfGymEntity update(OptionOfGymEntity placeOption) {
        return GymOptionsRepository.update(placeOption);
    }

    @Override
    public List<OptionOfGymEntity> getAll(Pageable pageable) {
        return GymOptionsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<OptionOfGymEntity> findAll(Specification<OptionOfGymEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<OptionOfPlaceDto> convertToDtos(List<OptionOfGymEntity> entities) {
//        return OptionConvertor.placeOptionsToPlacePlaceOptionDtos(entities);
    return null;
    }

    @Override
    public Page<OptionOfPlaceDto> convertToDtos(Page<OptionOfGymEntity> entities) {
        return null;
    }

    @Override
    public OptionOfPlaceDto getById(long id) {
        OptionOfGymEntity placeOption = getEntityById(id);
//        return OptionConvertor.placeOptionToPlacePlaceOptionDto(placeOption);
        return null;
    }

    @Override
    public OptionOfGymEntity getEntityById(long id) {
        return GymOptionsRepository.getById(id);
    }

    @Override
    public OptionOfPlaceDto delete(OptionOfPlaceParam optionOfPlaceParam) {
        OptionOfGymEntity placeOption = getEntityById(optionOfPlaceParam.getId());
        OptionOfGymEntity deletedPlaceOption = delete(placeOption);
        return OptionConvertor.optionOfPlaceToOptionOfPlaceDto(deletedPlaceOption);
    }

    @Override
    public OptionOfGymEntity delete(OptionOfGymEntity placeOption) {
        return GymOptionsRepository.deleteById2(placeOption);
    }

    @Override
    public List<OptionOfPlaceDto> getByPlaceId(Long id) {
        List<OptionOfGymEntity> placeOptions = GymOptionsRepository.getByPlaceId(id);
        return OptionConvertor.optionsOfPlaceToOptionsOfPlaceDto(placeOptions);
    }
}
