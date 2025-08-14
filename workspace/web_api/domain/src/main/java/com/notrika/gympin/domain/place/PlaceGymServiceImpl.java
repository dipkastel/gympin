package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymContractDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.place.placeGym.service.PlaceGymService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
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
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PlaceGymServiceImpl extends AbstractBaseService<PlaceGymParam, PlaceGymDto, PlaceGymQuery, PlaceGymEntity> implements PlaceGymService {

    @Autowired
    private PlaceGymRepository placeGymRepository;

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
        PlaceGymEntity initPlace = PlaceGymEntity.builder()
                .name(placeParam.getName())
                .status(PlaceStatusEnum.INACTIVE)
                .build();
        return PlaceConvertor.ToGymDto(placeGymRepository.add(initPlace));
    }

    @Override
    public PlaceGymEntity add(PlaceGymEntity place) {
        return placeGymRepository.add(place);
    }


    @Override
    public PlaceGymDto update(PlaceGymParam placeParam) {
        PlaceGymEntity initPlace = getEntityById(placeParam.getId());
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
        PlaceGymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }


    @Override
    public PlaceGymDto updateOrder(PlaceGymParam placeParam) {
        PlaceGymEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setOrder(placeParam.getOrder());
        PlaceGymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto updateContract(PlaceGymParam placeParam) {
        PlaceGymEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setContractData(placeParam.getContractData());
        PlaceGymEntity place = update(initPlace);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymEntity update(PlaceGymEntity place) {
        return placeGymRepository.update(place);
    }

    @Override
    public PlaceGymDto delete(PlaceGymParam placeParam) {
        PlaceGymEntity item = getEntityById(placeParam.getId());
        PlaceGymEntity deletedPlace = delete(item);
        return PlaceConvertor.ToGymDto(deletedPlace);
    }

    @Override
    public PlaceGymEntity delete(PlaceGymEntity place) {
        return placeGymRepository.deleteById2(place);
    }

    @Override
    public List<PlaceGymEntity> getAll(Pageable pageable) {
        return placeGymRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceGymEntity> findAll(Specification<PlaceGymEntity> specification, Pageable pageable) {
        return placeGymRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceGymDto> convertToDtos(List<PlaceGymEntity> entities) {
        return PlaceConvertor.ToGymDto(entities);
    }

    @Override
    public Page<PlaceGymDto> convertToDtos(Page<PlaceGymEntity> entities) {
        return PlaceConvertor.ToGymDto(entities);
    }

    @Override
    public PlaceGymDto getById(long id) {
        PlaceGymEntity place = getEntityById(id);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymEntity getEntityById(long id) {
        return placeGymRepository.getById(id);
    }

    @Override
    public PlaceGymDto changeStatus(PlaceGymParam param) {
        PlaceGymEntity place = placeGymRepository.getById(param.getId());
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
        List<PlaceGymEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.ToGymDto(placeList);
    }

    public List<PlaceGymEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeGymRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<PlaceGymDto> getPlacesByUser(UserParam userParam) {
        List<PlaceGymEntity> places = placeGymRepository.getPlaceByUser(userParam.getId()).stream().filter(o -> !o.isDeleted()).filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.ToGymDto(places);
    }

    @Override
    public List<MultimediaDto> getMultimedias(PlaceGymParam param) {
        PlaceGymEntity place = getEntityById(param.getId());
        List<MultimediaEntity> multimedias = place.getMultimedias();
        Collections.reverse(multimedias);
        return MultimediaConvertor.toDto(multimedias);
    }

    @Override
    public PlaceGymDto addMultimedia(PlaceGymMultimediaParam param) {
        PlaceGymEntity place = getEntityById(param.getPlaceParam().getId());
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        place.getMultimedias().add(multimedia);
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto addMultimediaList(PlaceGymMultimediaListParam param) {
        PlaceGymEntity place = getEntityById(param.getPlaceParam().getId());
        for (MultimediaRetrieveParam image : param.getMultimedias()) {
            MultimediaEntity multimedia = multimediaRepository.getById(image.getId());
            place.getMultimedias().add(multimedia);
        }
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public PlaceGymDto removeMultimedia(PlaceGymMultimediaParam param) {
        PlaceGymEntity place = getEntityById(param.getPlaceParam().getId());
        place.getMultimedias().removeIf(m -> Objects.equals(m.getId(), param.getMultimedia().getId()));
        update(place);
        return PlaceConvertor.ToGymDto(place);
    }

    @Override
    public List<SportDto> getSportsOfPlace(PlaceGymDto place) {
        return SportConvertor.toDto(placeGymRepository.getSportsOfPlace(PlaceGymEntity.builder().id(place.getId()).build()));
    }

    @Override
    public InviteCode getPlaceInviteCode(PlaceGymParam param) {
        PlaceGymEntity place = placeGymRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P" + GeneralHelper.getInviteCode(place.getId(), 1))
                .isActive(true)
                .build();
        return code;
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param) {
        PlaceGymEntity place = placeGymRepository.getById(param.getId());
        return place.getTicketSubscribes().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Boolean sendContractCode(PlaceGymContractSmsParam param) {
        ObjectMapper objectMapper = new ObjectMapper();
        PlaceGymEntity place = placeGymRepository.getById(param.getPlaceId());
        String contractData = place.getContractData();
        String code = MyRandom.GenerateRandomVerificationSmsCode();
        try {
            PlaceGymContractDto contractDto = objectMapper.readValue(contractData, PlaceGymContractDto.class);
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
        PlaceGymEntity initPlace = getEntityById(placeParam.getId());
        if (passwordEncoder.matches(placeParam.getSignCode(), initPlace.getContractCode().getCode())) {
            initPlace.setHasContract(placeParam.getHasContract());
            PlaceGymEntity place = update(initPlace);
            return PlaceConvertor.ToGymDto(place);
        }
        return null;
    }

}
