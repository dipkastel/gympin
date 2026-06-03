package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.placeBase.dto.PlaceContractDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.enums.PlaceTypeEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeCounseling.dto.PlaceCounselingDto;
import com.notrika.gympin.common.place.placeCounseling.param.PlaceCounselingParam;
import com.notrika.gympin.common.place.placeCounseling.query.PlaceCounselingQuery;
import com.notrika.gympin.common.place.placeCounseling.service.PlaceCounselingService;
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
import com.notrika.gympin.persistence.dao.repository.place.PlaceCounselingRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCounselingEntity;
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
public class PlaceCounselingServiceImpl extends AbstractBaseService<PlaceCounselingParam, PlaceCounselingDto, PlaceCounselingQuery, PlaceCounselingEntity> implements PlaceCounselingService {

    @Autowired
    private PlaceCounselingRepository placeCounselingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ManageLocationRepository manageLocationRepository;

    @Autowired
    private SmsInService smsInService;

    @Override
    public PlaceCounselingDto add(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity initPlace = PlaceCounselingEntity.builder()
                .name(placeParam.getName())
                .placeType(PlaceTypeEnum.COUNSELING)
                .status(PlaceStatusEnum.INACTIVE)
                .build();
        return PlaceConvertor.ToCounselingDto(placeCounselingRepository.add(initPlace));
    }

    @Override
    public PlaceCounselingEntity add(PlaceCounselingEntity place) {
        return placeCounselingRepository.add(place);
    }


    @Override
    public PlaceCounselingDto update(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity initPlace = getEntityById(placeParam.getId());
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
        PlaceCounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }


    @Override
    public PlaceCounselingDto updateOrder(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setOrder(placeParam.getOrder());
        PlaceCounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingDto updateContract(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setContractData(placeParam.getContractData());
        PlaceCounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingEntity update(PlaceCounselingEntity place) {
        return placeCounselingRepository.update(place);
    }

    @Override
    public PlaceCounselingDto delete(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity item = getEntityById(placeParam.getId());
        PlaceCounselingEntity deletedPlace = delete(item);
        return PlaceConvertor.ToCounselingDto(deletedPlace);
    }

    @Override
    public PlaceCounselingEntity delete(PlaceCounselingEntity place) {
        return placeCounselingRepository.deleteById2(place);
    }

    @Override
    public List<PlaceCounselingEntity> getAll(Pageable pageable) {
        return placeCounselingRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceCounselingEntity> findAll(Specification<PlaceCounselingEntity> specification, Pageable pageable) {
        return placeCounselingRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceCounselingDto> convertToDtos(List<PlaceCounselingEntity> entities) {
        return PlaceConvertor.ToCounselingDto(entities);
    }

    @Override
    public Page<PlaceCounselingDto> convertToDtos(Page<PlaceCounselingEntity> entities) {
        return PlaceConvertor.ToCounselingDto(entities);
    }

    @Override
    public PlaceCounselingDto getById(long id) {
        PlaceCounselingEntity place = getEntityById(id);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingEntity getEntityById(long id) {
        return placeCounselingRepository.getById(id);
    }

    @Override
    public PlaceCounselingDto changeStatus(PlaceCounselingParam param) {
        PlaceCounselingEntity place = placeCounselingRepository.getById(param.getId());
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
            if (place.getProficiencies().size() < 1) {
                throw new PlaceProficienciesIsEmpty();
            }
            if (place.isDeleted()) {
                throw new PlaceIsDeleted();
            }
        }
        return PlaceConvertor.ToCounselingDto(placeCounselingRepository.update(place));
    }

    @Override
    public List<PlaceCounselingDto> getPlacesByLocation(LocationParam param) {
        ManageLocationEntity location = ManageLocationEntity.builder().id(param.getId()).build();
        List<PlaceCounselingEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.ToCounselingDto(placeList);
    }

    public List<PlaceCounselingEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeCounselingRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<PlaceCounselingDto> getPlacesByUser(UserParam userParam) {
        List<PlaceCounselingEntity> places = placeCounselingRepository.getPlaceByUser(userParam.getId()).stream().filter(o -> !o.isDeleted()).filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.ToCounselingDto(places);
    }

    @Override
    public List<MultimediaDto> getMultimedias(PlaceCounselingParam param) {
        PlaceCounselingEntity place = getEntityById(param.getId());
        List<MultimediaEntity> multimedias = place.getMultimedias();
        return MultimediaConvertor.toDto(multimedias);
    }

    @Override
    public PlaceCounselingDto addMultimedia(PlaceMultimediaParam param) {
        PlaceCounselingEntity place = getEntityById(param.getPlaceParam().getId());
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        place.getMultimedias().add(multimedia);
        update(place);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingDto setDefaultMultimedia(PlaceMultimediaParam param) {
        List<MultimediaEntity> updateList = new ArrayList<>();
        PlaceCounselingEntity place = getEntityById(param.getPlaceParam().getId());
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
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingDto addMultimediaList(PlaceMultimediaListParam param) {
        PlaceCounselingEntity place = getEntityById(param.getPlaceParam().getId());
        for (MultimediaRetrieveParam image : param.getMultimedias()) {
            MultimediaEntity multimedia = multimediaRepository.getById(image.getId());
            place.getMultimedias().add(multimedia);
        }
        update(place);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public PlaceCounselingDto removeMultimedia(PlaceMultimediaParam param) {
        PlaceCounselingEntity place = getEntityById(param.getPlaceParam().getId());
        place.getMultimedias().removeIf(m -> Objects.equals(m.getId(), param.getMultimedia().getId()));
        update(place);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public InviteCode getPlaceInviteCode(PlaceCounselingParam param) {
        PlaceCounselingEntity place = placeCounselingRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P" + GeneralHelper.getInviteCode(place.getId(), 1))
                .isActive(true)
                .build();
        return code;
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(PlaceCounselingParam param) {
        PlaceCounselingEntity place = placeCounselingRepository.getById(param.getId());
        return place.getTicketAppointments().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Boolean sendContractCode(PlaceContractSmsParam param) {
        ObjectMapper objectMapper = new ObjectMapper();
        PlaceCounselingEntity place = placeCounselingRepository.getById(param.getPlaceId());
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
    public PlaceCounselingDto signContract(PlaceCounselingParam placeParam) {
        PlaceCounselingEntity initPlace = getEntityById(placeParam.getId());
        if (passwordEncoder.matches(placeParam.getSignCode(), initPlace.getContractCode().getCode())) {
            initPlace.setHasContract(placeParam.getHasContract());
            PlaceCounselingEntity place = update(initPlace);
            return PlaceConvertor.ToCounselingDto(place);
        }
        return null;
    }

}
