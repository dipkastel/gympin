package com.notrika.gympin.domain.place.Gym;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.placeBase.dto.PlaceContractDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceTypeEnum;
import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeGym.Gym.query.PlaceGymQuery;
import com.notrika.gympin.common.place.placeGym.Gym.service.PlaceGymService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.common.util.exception.place.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.MultimediaConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class GymServiceImpl extends AbstractBaseService<PlaceGymParam, PlaceGymDto, PlaceGymQuery, GymEntity> implements PlaceGymService {

    @Autowired
    private GymRepository placeGymRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ManageLocationRepository manageLocationRepository;

    @Autowired
    private SmsInService smsInService;

    @Override
    public PlaceGymDto add(PlaceGymParam placeParam) {
        GymEntity initPlace = GymEntity.builder()
                .name(placeParam.getName())
                .status(PlaceStatusEnum.INACTIVE)
                .placeType(PlaceTypeEnum.GYM)
                .build();
        return PlaceConvertor.ToGymDto(placeGymRepository.add(initPlace));
    }

    @Override
    public GymEntity add(GymEntity place) {
        return placeGymRepository.add(place);
    }


    @Override
    public PlaceGymDto update(PlaceGymParam placeParam) {
        GymEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setActiveTimes(placeParam.getActiveTimes());
        //TODO remove set has contract and set seprate api for panel with admin access only
        initPlace.setHasContract(placeParam.getHasContract());
        initPlace.setTell(placeParam.getTell());
        initPlace.setCallUs(placeParam.getCallUs());
        initPlace.setAutoDiscount(placeParam.getAutoDiscount());
        if (placeParam.getLocation() != null && placeParam.getLocation().getId() != null && placeParam.getLocation().getId() > 0) {
            ManageLocationEntity location = manageLocationRepository.getById(placeParam.getLocation().getId());
            initPlace.setLocation(location);
        }
        GymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }


    @Override
    public PlaceGymDto updateOrder(PlaceGymParam placeParam) {
        GymEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setOrder(placeParam.getOrder());
        GymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto updateContract(PlaceGymParam placeParam) {
        GymEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setContractData(placeParam.getContractData());
        GymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public GymEntity update(GymEntity place) {
        return placeGymRepository.update(place);
    }

    @Override
    public PlaceGymDto delete(PlaceGymParam placeParam) {
        GymEntity item = getEntityById(placeParam.getId());
        GymEntity deletedPlace = delete(item);
        return PlaceConvertor.ToGymDto(deletedPlace);
    }

    @Override
    public GymEntity delete(GymEntity place) {
        return placeGymRepository.deleteById2(place);
    }

    @Override
    public List<GymEntity> getAll(Pageable pageable) {
        return placeGymRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<GymEntity> findAll(Specification<GymEntity> specification, Pageable pageable) {
        return placeGymRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceGymDto> convertToDtos(List<GymEntity> entities) {
        return PlaceConvertor.ToGymDto(entities);
    }

    @Override
    public Page<PlaceGymDto> convertToDtos(Page<GymEntity> entities) {
        return PlaceConvertor.ToGymDto(entities);
    }

    @Override
    public PlaceGymDto getById(long id) {
        GymEntity place = getEntityById(id);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public GymEntity getEntityById(long id) {
        return placeGymRepository.getById(id);
    }

    @Override
    public PlaceGymDto changeStatus(PlaceGymParam param) {
        GymEntity place = placeGymRepository.getById(param.getId());
        place.setStatus(param.getStatus());
        if (param.getStatus() == PlaceStatusEnum.ACTIVE) {
            if (place.getName() == null) {
                throw new PlaceNameCanNotBeNull();
            }
//            if (place.getPlaceOwners().size() < 1) {
//                throw new PlaceOwnersCanNotBeEmpty();
//            }
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
//            if (place.getHalls().size() < 1) {
//                throw new PlaceHALLMustBeAdded();
//            }
//            if (place.getTicketSubscribes().size() < 1) {
//                throw new PlaceTicketSubscribesCanNotBeEmpty();
//            }
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
        return PlaceConvertor.ToGymDto(placeGymRepository.update(place));
    }

    @Override
    public List<PlaceGymDto> getPlacesByLocation(LocationParam param) {
        ManageLocationEntity location = ManageLocationEntity.builder().id(param.getId()).build();
        List<GymEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.ToGymDto(placeList);
    }

    public List<GymEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeGymRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<PlaceGymDto> getPlacesByUser(UserParam userParam) {
        List<GymEntity> places = placeGymRepository.getPlaceByUser(userParam.getId()).stream().filter(o -> !o.isDeleted()).filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.ToGymDto(places);
    }

    @Override
    public List<MultimediaDto> getMultimedias(PlaceGymParam param) {
        GymEntity place = getEntityById(param.getId());
        List<MultimediaEntity> multimedias = place.getMultimedias();
        return MultimediaConvertor.toDto(multimedias);
    }

    @Override
    public PlaceGymDto addMultimedia(PlaceMultimediaParam param) {
        GymEntity place = getEntityById(param.getPlaceParam().getId());
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        place.getMultimedias().add(multimedia);
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto setDefaultMultimedia(PlaceMultimediaParam param) {
        List<MultimediaEntity> updateList = new ArrayList<>();
        GymEntity place = getEntityById(param.getPlaceParam().getId());
        for (MultimediaEntity multimedia : place.getMultimedias()){
            if(multimedia.getIsDef())
            {
                multimedia.setIsDef(false);
                updateList.add(multimedia);
            }
        }
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        multimedia.setIsDef(true);
        updateList.add(multimedia);
        multimediaRepository.updateAll(updateList);
        place = getEntityById(param.getPlaceParam().getId());
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto addMultimediaList(PlaceMultimediaListParam param) {
        GymEntity place = getEntityById(param.getPlaceParam().getId());
        for (MultimediaRetrieveParam image : param.getMultimedias()) {
            MultimediaEntity multimedia = multimediaRepository.getById(image.getId());
            place.getMultimedias().add(multimedia);
        }
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto removeMultimedia(PlaceMultimediaParam param) {
        GymEntity place = getEntityById(param.getPlaceParam().getId());
        place.getMultimedias().removeIf(m -> Objects.equals(m.getId(), param.getMultimedia().getId()));
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public List<SportDto> getSportsOfPlace(PlaceGymDto place) {
        return SportConvertor.toDto(placeGymRepository.getSportsOfPlace(GymEntity.builder().id(place.getId()).build()));
    }

    @Override
    public InviteCode getPlaceInviteCode(PlaceGymParam param) {
        GymEntity place = placeGymRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P" + GeneralHelper.getInviteCode(place.getId(), 1))
                .isActive(true)
                .build();
        return code;
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param) {
        GymEntity place = placeGymRepository.getById(param.getId());
        return place.getTicketSubscribes().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Boolean sendContractCode(PlaceContractSmsParam param) {
        ObjectMapper objectMapper = new ObjectMapper();
        GymEntity place = placeGymRepository.getById(param.getPlaceId());
        String contractData = place.getContractData();
        String code = MyRandom.GenerateRandomVerificationSmsCode();
        try {
            PlaceContractDto contractDto = objectMapper.readValue(contractData, PlaceContractDto.class);
            smsInService.sendPlaceContractCode(place.getId(), SmsDto.builder()
                    .smsType(SmsTypes.JOINED_TO_PLACE)
                    .userNumber(contractDto.ownerPhoneNumber)
                    .text1(code)
                    .build()
            );
        } catch (Exception e) {
            return false;
        }
        return true;
    }


    @Override
    public PlaceGymDto signContract(PlaceGymParam placeParam) {
        GymEntity initPlace = getEntityById(placeParam.getId());
        if (passwordEncoder.matches(placeParam.getSignCode(), initPlace.getContractCode().getCode())) {
            initPlace.setHasContract(placeParam.getHasContract());
            GymEntity place = update(initPlace);
            return PlaceConvertor.ToGymDto(place);
        }
        return null;
    }

}
