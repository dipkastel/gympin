package com.notrika.gympin.domain.place.Catering;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.enums.PlaceTypeEnum;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeCatering.service.PlaceCateringService;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util.exception.place.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Catering.PlaceCateringRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.Catering.CateringEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceCateringServiceImpl extends AbstractBaseService<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery, CateringEntity> implements PlaceCateringService {

    @Autowired
    private PlaceCateringRepository placeCateringRepository;


    @Autowired
    private ManageLocationRepository manageLocationRepository;


    @Override
    public PlaceCateringDto add(PlaceCateringParam placeParam) {
        CateringEntity initPlace = CateringEntity.builder()
                .name(placeParam.getName())
                .status(PlaceStatusEnum.INACTIVE)
                .hasDishesPrice(false)
                .freeDeliveryPrice(BigDecimal.ZERO)
                .placeType(PlaceTypeEnum.CATERING)
                .build();
        return PlaceConvertor.ToCateringDto(placeCateringRepository.add(initPlace));
    }

    @Override
    public CateringEntity add(CateringEntity place) {
        return placeCateringRepository.add(place);
    }


    @Override
    public PlaceCateringDto update(PlaceCateringParam placeParam) {
        CateringEntity initPlace = getEntityById(placeParam.getId());
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
        CateringEntity place = update(initPlace);
        return PlaceConvertor.ToCateringDto(place);
    }


    @Override
    public CateringEntity update(CateringEntity place) {
        return placeCateringRepository.update(place);
    }

    @Override
    public PlaceCateringDto delete(PlaceCateringParam placeParam) {
        CateringEntity item = getEntityById(placeParam.getId());
        CateringEntity deletedPlace = delete(item);
        return PlaceConvertor.ToCateringDto(deletedPlace);
    }

    @Override
    public CateringEntity delete(CateringEntity place) {
        return placeCateringRepository.deleteById2(place);
    }

    @Override
    public List<CateringEntity> getAll(Pageable pageable) {
        return placeCateringRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CateringEntity> findAll(Specification<CateringEntity> specification, Pageable pageable) {
        return placeCateringRepository.findAll(specification, pageable);
    }

    @Override
    public PlaceCateringDto changeStatus(PlaceCateringParam param) {
        CateringEntity catering = placeCateringRepository.getById(param.getId());
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
    public List<PlaceCateringDto> convertToDtos(List<CateringEntity> entities) {
        return PlaceConvertor.ToCateringDto(entities);
    }

    @Override
    public Page<PlaceCateringDto> convertToDtos(Page<CateringEntity> entities) {
        return PlaceConvertor.ToCateringDto(entities);
    }

    @Override
    public PlaceCateringDto getById(long id) {
        CateringEntity place = getEntityById(id);
        return PlaceConvertor.ToCateringDto(place);
    }


    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param) {
        CateringEntity place = placeCateringRepository.getById(param.getId());
        return place.getTicketFoodItems().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }


    @Override
    public CateringEntity getEntityById(long id) {
        return placeCateringRepository.getById(id);
    }

}
