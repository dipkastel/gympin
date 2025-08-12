package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeCatering.service.PlaceCateringService;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util.exception.place.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCateringRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceCateringServiceImpl extends AbstractBaseService<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery, PlaceCateringEntity> implements PlaceCateringService {

    @Autowired
    private PlaceCateringRepository placeCateringRepository;


    @Autowired
    private ManageLocationRepository manageLocationRepository;


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
    public PlaceCateringDto changeStatus(PlaceCateringParam param) {
        PlaceCateringEntity catering = placeCateringRepository.getById(param.getId());
        catering.setStatus(param.getStatus());
        if (param.getStatus() == PlaceStatusEnum.ACTIVE) {
            if (catering.getName() == null) {
                throw new PlaceNameCanNotBeNull();
            }
            if (catering.getLatitude() == 0) {
                throw new PlaceLocationMustSelectOnMap();
            }
            if (catering.getLongitude() == 0) {
                throw new PlaceLocationMustSelectOnMap();
            }
            if (catering.getLocation() == null) {
                throw new PlaceLocationCanNotBeNull();
            }
            if (catering.getAddress() == null) {
                throw new PlaceAdressCanNotBeNull();
            }
            if (catering.isDeleted()) {
                throw new PlaceIsDeleted();
            }
        }
        return PlaceConvertor.ToCateringDto(placeCateringRepository.update(catering));
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
    public List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param) {
        PlaceCateringEntity place = placeCateringRepository.getById(param.getId());
        return place.getTicketFoodItems().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }


    @Override
    public PlaceCateringEntity getEntityById(long id) {
        return placeCateringRepository.getById(id);
    }

}
