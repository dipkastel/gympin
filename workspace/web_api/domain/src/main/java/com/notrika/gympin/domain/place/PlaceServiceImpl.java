package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util.exception.place.*;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.place.query.PlaceQuery;
import com.notrika.gympin.common.place.place.service.PlaceService;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.MultimediaConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl extends AbstractBaseService<PlaceParam, PlaceDto, PlaceQuery, PlaceEntity> implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ManageLocationRepository manageLocationRepository;

    @Override
    public PlaceDto add(PlaceParam placeParam) {
        PlaceEntity initPlace = PlaceEntity.builder()
                .name(placeParam.getName())
                .status(PlaceStatusEnum.INACTIVE)
                .balance(BigDecimal.ZERO)
                .build();
        return PlaceConvertor.toDto(placeRepository.add(initPlace));
    }

    @Override
    public PlaceEntity add(PlaceEntity place) {
        return placeRepository.add(place);
    }


    @Override
    public PlaceDto update(PlaceParam placeParam) {
        PlaceEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setAutoDiscount(placeParam.getAutoDiscount());
        if (placeParam.getLocation() != null && placeParam.getLocation().getId() != null && placeParam.getLocation().getId() > 0) {
            ManageLocationEntity location = manageLocationRepository.getById(placeParam.getLocation().getId());
            initPlace.setLocation(location);
        }
        PlaceEntity place = update(initPlace);
        return PlaceConvertor.toDto(place);
    }

    @Override
    public PlaceEntity update(PlaceEntity place) {
        return placeRepository.update(place);
    }

    @Override
    public PlaceDto delete(PlaceParam placeParam) {
        PlaceEntity item = getEntityById(placeParam.getId());
        PlaceEntity deletedPlace = delete(item);
        return PlaceConvertor.toDto(deletedPlace);
    }

    @Override
    public PlaceEntity delete(PlaceEntity place) {
        return placeRepository.deleteById2(place);
    }

    @Override
    public List<PlaceEntity> getAll(Pageable pageable) {
        return placeRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceEntity> findAll(Specification<PlaceEntity> specification, Pageable pageable) {
        return placeRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceDto> convertToDtos(List<PlaceEntity> entities) {
        return PlaceConvertor.toDto(entities);
    }

    @Override
    public Page<PlaceDto> convertToDtos(Page<PlaceEntity> entities) {
        return PlaceConvertor.toDto(entities);
    }

    @Override
    public PlaceDto getById(long id) {
        PlaceEntity place = getEntityById(id);
        return PlaceConvertor.toDto(place);
    }

    @Override
    public PlaceEntity getEntityById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public PlaceDto changeStatus(PlaceParam param) {
        PlaceEntity place = placeRepository.getById(param.getId());
        place.setStatus(param.getStatus());
        if(param.getStatus()==PlaceStatusEnum.ACTIVE) {
            if (place.getName() == null) {
                throw new PlaceNameCanNotBeNull();
            }
            if (place.getPlaceOwners().size() < 1) {
                throw new PlaceOwnersCanNotBeEmpty();
            }
            if (place.getLatitude() == 0) {
                throw new PlaceLocationMustSelectOnMap();
            }
            if (place.getLongitude() == 0) {
                throw new PlaceLocationMustSelectOnMap();
            }
            if (place.getLocation() == null) {
                throw new PlaceLocationCanNotBeNull();
            }
            if (place.getAddress() == null) {
                throw new PlaceAdressCanNotBeNull();
            }
            //TODO fix this
//            if (place.getCommissionFee() > 100 || place.getCommissionFee() < 0) {
//                throw new PlaceCommissionIsNotCorrect();
//            }
            if (place.getHalls().size() < 1) {
                throw new PlaceHALLMustBeAdded();
            }
            if (place.getBuyables().size() < 1) {
                throw new PlaceTicketSubscribesCanNotBeEmpty();
            }
            if (place.getMultimedias().size() < 1) {
                throw new PlaceImagesIsEmpty();
            }
            if (place.getOptionsOfPlaces().size() < 1) {
                throw new PlaceOptionsIsEmpty();
            }
            if (place.isDeleted()) {
                throw new PlaceIsDeleted();
            }
        }
        return PlaceConvertor.toDto(placeRepository.update(place));
    }

    @Override
    public List<PlaceDto> getPlacesByLocation(LocationParam param) {
        ManageLocationEntity location = ManageLocationEntity.builder().id(param.getId()).build();
        List<PlaceEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.toDto(placeList);
    }

    public List<PlaceEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<PlaceDto> getPlacesByUser(UserParam userParam) {
        List<PlaceEntity> places = placeRepository.getPlaceByUser(userParam.getId()).stream().filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.toDto(places);
    }

    @Override
    public List<MultimediaDto> getMultimedias(PlaceParam param) {
        PlaceEntity place = getEntityById(param.getId());
        List<MultimediaEntity> multimedias = place.getMultimedias();
        Collections.reverse(multimedias);
        return MultimediaConvertor.toDto(multimedias);
    }

    @Override
    public PlaceDto addMultimedia(PlaceMultimediaParam param) {
        PlaceEntity place = getEntityById(param.getPlaceParam().getId());
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        place.getMultimedias().add(multimedia);
        update(place);
        return PlaceConvertor.toDto(place);
    }

    @Override
    public PlaceDto addMultimediaList(PlaceMultimediaListParam param) {
        PlaceEntity place = getEntityById(param.getPlaceParam().getId());
        for(MultimediaRetrieveParam image : param.getMultimedias()){
            MultimediaEntity multimedia = multimediaRepository.getById(image.getId());
            place.getMultimedias().add(multimedia);
        }
        update(place);
        return PlaceConvertor.toDto(place);
    }

    @Override
    public PlaceDto removeMultimedia(PlaceMultimediaParam param) {
        PlaceEntity place = getEntityById(param.getPlaceParam().getId());
        place.getMultimedias().removeIf(m -> Objects.equals(m.getId(), param.getMultimedia().getId()));
        update(place);
        return PlaceConvertor.toDto(place);
    }

    @Override
    public List<SportDto> getSportsOfPlace(PlaceDto place) {
        return SportConvertor.toDto(placeRepository.getSportsOfPlace(PlaceEntity.builder().id(place.getId()).build()));
    }

    @Override
    public InviteCode getPlaceInviteCode(PlaceParam param){
        PlaceEntity place = placeRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P"+GeneralHelper.getInviteCode(place.getId(),1))
                .isActive(true)
                .build();
        return code;
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceParam param) {
        PlaceEntity place = placeRepository.getById(param.getId());
        return place.getBuyables().stream().map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }


}
