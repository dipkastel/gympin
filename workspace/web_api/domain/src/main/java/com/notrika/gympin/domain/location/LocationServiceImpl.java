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
import com.notrika.gympin.dao.location.OptionOfPlace;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.location.PlaceOwner;
import com.notrika.gympin.dao.option.place.PlaceOption;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.option.place.PlaceOptionServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.OptionOfPlaceRepository;
import com.notrika.gympin.persistence.repository.PlaceOwnerRepository;
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
        PlaceOption placeOption;
        if (optionOfPlaceParam.getPlaceOptionParam().getId() == null) {
            PlaceOption initPlaceOption = PlaceOption.builder().name(optionOfPlaceParam.getPlaceOptionParam().getName()).build();
            placeOption = placeOptionService.addPlaceOption(initPlaceOption);
            optionOfPlaceParam.getPlaceOptionParam().setId(placeOption.getId());
        } else {
            placeOption = placeOptionService.getPlaceOptionById(optionOfPlaceParam.getPlaceOptionParam().getId());
        }
        Place place = placeService.getPlaceById(optionOfPlaceParam.getPlaceParam().getId());
        OptionOfPlace initOptionOfPlace = OptionOfPlace.builder().place(place).placeOption(placeOption).build();
        OptionOfPlace optionOfPlace = optionOfPlaceRepository.add(initOptionOfPlace);
        return OptionOfPlaceDto.builder().id(optionOfPlace.getId()).createdDate(optionOfPlace.getCreatedDate()).updatedDate(optionOfPlace.getUpdatedDate()).isDeleted(optionOfPlace.isDeleted()).place(PlaceDto.builder().id(optionOfPlace.getPlace().getId()).build()).placeOption(PlaceOptionDto.builder().id(optionOfPlace.getPlaceOption().getId()).build()).build();
    }

    //    public OptionOfPlace addOptionOfPlace(OptionOfPlace optionOfPlace){
    //        return placeOptionService.addPlaceOption(optionOfPlace);
    //    }

    @Override
    public List<PlaceDto> getPlaceByUser(UserParam userParam) {
        User user = User.builder().id(userParam.getId()).userRole(userParam.getRole()).build();
        List<Place> placeByUser = getPlaceByUser(user);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeByUser, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    public List<Place> getPlaceByUser(User user) {
        return placeService.getPlaceByUser(user);
    }

    @Override
    public PlaceOwnerDto addPlaceOwner(PlaceOwnerParam placeOwnerParam) {
        Place place = placeService.getPlaceById(placeOwnerParam.getPlaceParam().getId());
        User user = userService.getUserById(placeOwnerParam.getUserParam().getId());
        PlaceOwner initPlaceOwner = PlaceOwner.builder().place(place).user(user).userRole(placeOwnerParam.getUserRole()).build();
        PlaceOwner placeOwner = placeOwnerRepository.add(initPlaceOwner);
        return LocationConvertor.placeOwnerToPlaceOwnerDto(placeOwner);
    }

    public PlaceOwner getPlaceOwnerById(long id) {
        return placeOwnerRepository.getById(id);
    }

    @Override
    public List<UserDto> getOwnersPlace(PlaceParam placeParam) {
        List<User> ownersPlace = userService.getOwnersPlace(Place.builder().id(placeParam.getId()).build());
        return UserConvertor.usersToUserDtos(ownersPlace);
    }

    @Override
    public PlaceOwnerDto deletePlaceOwner(PlaceOwnerParam placeOwnerParam) {
        PlaceOwner placeOwner = getPlaceOwnerById(placeOwnerParam.getId());
        PlaceOwner deletedPlaceOwner = deletePlaceOwner(placeOwner);
        return LocationConvertor.placeOwnerToPlaceOwnerDto(deletedPlaceOwner);
    }

    public PlaceOwner deletePlaceOwner(PlaceOwner placeOwner) {
        PlaceOwner deletedUser = placeOwnerRepository.deleteById2(placeOwner);
        return deletedUser;
    }
}
