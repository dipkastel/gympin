package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceQuery;
import com.notrika.gympin.common.place.placeBase.service.PlaceService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl extends AbstractBaseService<PlaceParam, PlaceDto, PlaceQuery, PlaceEntity> implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;


    @Override
    public PlaceDto add(PlaceParam placeParam) {
        return null;
    }

    @Override
    public PlaceEntity add(PlaceEntity place) {
        return null;
    }


    @Override
    public PlaceDto update(PlaceParam placeParam) {
        return null;
    }

    @Override
    public PlaceEntity update(PlaceEntity place) {
        return null;
    }

    @Override
    public PlaceDto delete(PlaceParam placeParam) {
        return null;
    }

    @Override
    public PlaceEntity delete(PlaceEntity place) {
        return null;
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
        return PlaceConvertor.ToDto(entities);
    }

    @Override
    public Page<PlaceDto> convertToDtos(Page<PlaceEntity> entities) {
        return PlaceConvertor.ToDto(entities);
    }

    @Override
    public PlaceDto getById(long id) {
        PlaceEntity place = getEntityById(id);
        return PlaceConvertor.ToDto(place);
    }

    @Override
    public PlaceEntity getEntityById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public List<PlaceDto> getPlacesByLocation(LocationParam param) {
        ManageLocationEntity location = ManageLocationEntity.builder().id(param.getId()).build();
        List<PlaceEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.ToDto(placeList);
    }

    public List<PlaceEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<PlaceDto> getPlacesByUser(UserParam userParam) {
        List<PlaceEntity> places = placeRepository.getPlaceByUser(userParam.getId()).stream().filter(o -> !o.isDeleted()).filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.ToDto(places);
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceParam param) {
        PlaceEntity place = placeRepository.getById(param.getId());
        return (List<TicketBuyableDto>) place.getBuyables().stream().filter(b -> !((BuyableEntity)b).isDeleted()).map(b->BuyableConvertor.ToDto((BuyableEntity)b)).collect(Collectors.toList());
    }

    @Override
    public InviteCode getPlaceInviteCode(PlaceParam param) {
        PlaceEntity place = placeRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P" + GeneralHelper.getInviteCode(place.getId(), 1))
                .isActive(true)
                .build();
        return code;
    }


}
