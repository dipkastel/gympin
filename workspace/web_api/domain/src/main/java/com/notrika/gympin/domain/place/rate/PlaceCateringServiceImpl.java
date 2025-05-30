package com.notrika.gympin.domain.place.rate;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeCatering.service.PlaceCateringService;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCateringRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceCateringServiceImpl extends AbstractBaseService<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery, PlaceCateringEntity> implements PlaceCateringService {

    @Autowired
    private PlaceCateringRepository placeCateringRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ManageLocationRepository manageLocationRepository;

    @Autowired
    private SmsInService smsInService;

    @Override
    public PlaceCateringDto add(PlaceCateringParam placeParam) {
        PlaceCateringEntity initPlace = PlaceCateringEntity.builder()
                .name(placeParam.getName())
                .status(PlaceStatusEnum.INACTIVE)
                .build();
        return PlaceConvertor.ToCateringDto(placeCateringRepository.add(initPlace));
    }

    @Override
    public PlaceCateringEntity add(PlaceCateringEntity place) {
        return placeCateringRepository.add(place);
    }


    @Override
    public PlaceCateringDto update(PlaceCateringParam placeParam) {
        PlaceCateringEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setTell(placeParam.getTell());
        initPlace.setAutoDiscount(placeParam.getAutoDiscount());
        if (placeParam.getLocation() != null && placeParam.getLocation().getId() != null && placeParam.getLocation().getId() > 0) {
            ManageLocationEntity location = manageLocationRepository.getById(placeParam.getLocation().getId());
            initPlace.setLocation(location);
        }
        PlaceCateringEntity place = update(initPlace);
        return PlaceConvertor.ToCateringDto(place);
    }


    @Override
    public PlaceCateringEntity update(PlaceCateringEntity place) {
        return placeCateringRepository.update(place);
    }

    @Override
    public PlaceCateringDto delete(PlaceCateringParam placeParam) {
        PlaceCateringEntity item = getEntityById(placeParam.getId());
        PlaceCateringEntity deletedPlace = delete(item);
        return PlaceConvertor.ToCateringDto(deletedPlace);
    }

    @Override
    public PlaceCateringEntity delete(PlaceCateringEntity place) {
        return placeCateringRepository.deleteById2(place);
    }

    @Override
    public List<PlaceCateringEntity> getAll(Pageable pageable) {
        return placeCateringRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceCateringEntity> findAll(Specification<PlaceCateringEntity> specification, Pageable pageable) {
        return placeCateringRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceCateringDto> convertToDtos(List<PlaceCateringEntity> entities) {
        return PlaceConvertor.ToCateringDto(entities);
    }

    @Override
    public Page<PlaceCateringDto> convertToDtos(Page<PlaceCateringEntity> entities) {
        return PlaceConvertor.ToCateringDto(entities);
    }

    @Override
    public PlaceCateringDto getById(long id) {
        PlaceCateringEntity place = getEntityById(id);
        return PlaceConvertor.ToCateringDto(place);
    }

    @Override
    public PlaceCateringEntity getEntityById(long id) {
        return placeCateringRepository.getById(id);
    }

}
