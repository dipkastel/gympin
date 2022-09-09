package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.PlaceOwnerDto;
import com.notrika.gympin.common.location.param.OptionOfPlaceParam;
import com.notrika.gympin.common.location.param.PlaceOwnerParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.option.place.PlaceOptionServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.OptionOfPlaceRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceOwnerRepository;
import com.notrika.gympin.persistence.entity.location.OptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.location.PlaceOwnerEntity;
import com.notrika.gympin.persistence.entity.option.place.PlaceOptionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private OptionOfPlaceRepository optionOfPlaceRepository;

    @Autowired
    private PlaceOptionServiceImpl placeOptionService;

    @Autowired
    private PlaceOwnerRepository placeOwnerRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PlaceServiceImpl placeService;

    @Override
    public OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam) {
        PlaceOptionEntity placeOption;
        if (optionOfPlaceParam.getPlaceOptionParam().getId() == null) {
            PlaceOptionEntity initPlaceOption = PlaceOptionEntity.builder().name(optionOfPlaceParam.getPlaceOptionParam().getName()).build();
            placeOption = placeOptionService.add(initPlaceOption);
            optionOfPlaceParam.getPlaceOptionParam().setId(placeOption.getId());
        } else {
            placeOption = placeOptionService.getEntityById(optionOfPlaceParam.getPlaceOptionParam().getId());
        }
        PlaceEntity place = placeService.getEntityById(optionOfPlaceParam.getPlaceParam().getId());
        OptionOfPlaceEntity initOptionOfPlace = OptionOfPlaceEntity.builder().place(place).placeOption(placeOption).build();
        OptionOfPlaceEntity optionOfPlace = optionOfPlaceRepository.add(initOptionOfPlace);
        return OptionOfPlaceDto.builder().id(optionOfPlace.getId()).createdDate(optionOfPlace.getCreatedDate()).updatedDate(optionOfPlace.getUpdatedDate()).isDeleted(optionOfPlace.isDeleted()).place(PlaceDto.builder().id(optionOfPlace.getPlace().getId()).build()).placeOption(PlaceOptionDto.builder().id(optionOfPlace.getPlaceOption().getId()).build()).build();
    }

    //    public OptionOfPlace addOptionOfPlace(OptionOfPlace optionOfPlace){
    //        return placeOptionService.addPlaceOption(optionOfPlace);
    //    }

    @Override
    public List<PlaceDto> getPlaceByUser(UserParam userParam) {
        UserEntity user = UserEntity.builder().id(userParam.getId())/*.userRole(userParam.getRole())*/.build();
        List<PlaceEntity> placeByUser = getPlaceByUser(user);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeByUser);
    }

    public List<PlaceEntity> getPlaceByUser(UserEntity user) {
        return placeService.getPlaceByUser(user);
    }

    @Override
    public PlaceOwnerDto addPlaceOwner(PlaceOwnerParam placeOwnerParam) {
        PlaceEntity place = placeService.getEntityById(placeOwnerParam.getPlaceParam().getId());
        UserEntity user = userService.getEntityById(placeOwnerParam.getUserParam().getId());
        PlaceOwnerEntity initPlaceOwner = PlaceOwnerEntity.builder().place(place).user(user).userRole(placeOwnerParam.getUserRole()).build();
        PlaceOwnerEntity placeOwner = placeOwnerRepository.add(initPlaceOwner);
        return LocationConvertor.placeOwnerToPlaceOwnerDto(placeOwner);
    }

    public PlaceOwnerEntity getPlaceOwnerById(long id) {
        return placeOwnerRepository.getById(id);
    }

    @Override
    public List<UserDto> getOwnersPlace(PlaceParam placeParam) {
        List<UserEntity> ownersPlace = userService.getOwnersPlace(PlaceEntity.builder().id(placeParam.getId()).build());
        return UserConvertor.usersToUserDtos(ownersPlace);
    }

    @Override
    public PlaceOwnerDto deletePlaceOwner(PlaceOwnerParam placeOwnerParam) {
        PlaceOwnerEntity placeOwner = getPlaceOwnerById(placeOwnerParam.getId());
        PlaceOwnerEntity deletedPlaceOwner = deletePlaceOwner(placeOwner);
        return LocationConvertor.placeOwnerToPlaceOwnerDto(deletedPlaceOwner);
    }

    public PlaceOwnerEntity deletePlaceOwner(PlaceOwnerEntity placeOwner) {
        return placeOwnerRepository.deleteById2(placeOwner);
    }
}
