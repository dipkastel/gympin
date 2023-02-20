package com.notrika.gympin.domain.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.about.param.PlaceAboutParam;
import com.notrika.gympin.common.place.about.service.PlaceAboutService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceAboutRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceAboutServiceImpl extends AbstractBaseService<PlaceAboutParam, PlaceAboutDto, BaseQuery<?>, PlaceAboutEntity> implements PlaceAboutService {

    @Autowired
    private PlaceAboutRepository placeAboutRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public PlaceAboutDto add(PlaceAboutParam placeAboutParam) {
        PlaceEntity place = placeRepository.findById(placeAboutParam.getPlace().getId()).get();
        PlaceAboutEntity initPlaceAbout = PlaceAboutEntity.builder()
                .place(place)
                .name(placeAboutParam.getName())
                .acceptable(placeAboutParam.getAcceptable())
                .active(placeAboutParam.getActive())
                .description(placeAboutParam.getDescription())
                .build();
        return PlaceConvertor.AboutToDto(add(initPlaceAbout));
    }

    @Override
    public PlaceAboutEntity add(PlaceAboutEntity entity) {
        return placeAboutRepository.add(entity);
    }

    @Override
    public PlaceAboutDto update(@NonNull PlaceAboutParam param) {
        PlaceAboutEntity init = getEntityById(param.getId());
        init.setName(param.getName());
        init.setPlace(placeRepository.getById(param.getPlace().getId()));
        init.setAcceptable(param.getAcceptable());
        init.setDescription(param.getDescription());
        init.setActive(param.getActive());
        return PlaceConvertor.AboutToDto(placeAboutRepository.update(init));
    }

    @Override
    public PlaceAboutDto delete(@NonNull PlaceAboutParam Param) {
        PlaceAboutEntity init = getEntityById(Param.getId());
        return  PlaceConvertor.AboutToDto(placeAboutRepository.deleteById2(init));
    }

    @Override
    public PlaceAboutDto getById(long id) {
        return PlaceConvertor.AboutToDto(placeAboutRepository.getById(id));
    }


    @Override
    public PlaceAboutEntity update(PlaceAboutEntity entity) {
        PlaceAboutEntity init = getEntityById(entity.getId());
        init.setName(entity.getName());
        init.setPlace(placeRepository.getById(entity.getPlace().getId()));
        init.setAcceptable(entity.getAcceptable());
        init.setDescription(entity.getDescription());
        init.setActive(entity.getActive());
        return placeAboutRepository.update(init);
    }

    @Override
    public PlaceAboutEntity delete(PlaceAboutEntity entity) {
        PlaceAboutEntity init = getEntityById(entity.getId());
        return placeAboutRepository.deleteById2(init);
    }

    @Override
    public PlaceAboutEntity getEntityById(long id) {
        return placeAboutRepository.getById(id);
    }

    @Override
    public List<PlaceAboutEntity> getAll(Pageable pageable) {
        return placeAboutRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceAboutEntity> findAll(Specification<PlaceAboutEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceAboutDto> convertToDtos(List<PlaceAboutEntity> entities) {
        return entities.stream().map(PlaceConvertor::AboutToDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlaceAboutDto> convertToDtos(Page<PlaceAboutEntity> entities) {
        return null;
    }

    public PlaceAboutDto convertToDtos(PlaceAboutEntity entities) {
        return PlaceConvertor.AboutToDto(entities);
    }

    @Override
    public List<PlaceAboutDto> getByPlaceId(Long id) {
        return placeAboutRepository.findByPlaceId(id).stream().map(PlaceConvertor::AboutToDto).collect(Collectors.toList());
    }
}