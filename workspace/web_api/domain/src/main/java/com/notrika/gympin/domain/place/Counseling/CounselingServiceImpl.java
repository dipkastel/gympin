package com.notrika.gympin.domain.place.Counseling;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.placeBase.dto.PlaceContractDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.enums.PlaceTypeEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeCounseling.Counseling.dto.CounselingDto;
import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.Counseling.query.CounselingQuery;
import com.notrika.gympin.common.place.placeCounseling.Counseling.service.CounselingService;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.common.util.exception.place.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.*;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.Counseling.CounselingRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingEntity;
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
public class CounselingServiceImpl extends AbstractBaseService<CounselingParam, CounselingDto, CounselingQuery, CounselingEntity> implements CounselingService {

    @Autowired
    private CounselingRepository placeCounselingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ManageLocationRepository manageLocationRepository;

    @Autowired
    private SmsInService smsInService;

    @Override
    public CounselingDto add(CounselingParam placeParam) {
        CounselingEntity initPlace = CounselingEntity.builder()
                .name(placeParam.getName())
                .placeType(PlaceTypeEnum.COUNSELING)
                .status(PlaceStatusEnum.INACTIVE)
                .build();
        return PlaceConvertor.ToCounselingDto(placeCounselingRepository.add(initPlace));
    }

    @Override
    public CounselingEntity add(CounselingEntity place) {
        return placeCounselingRepository.add(place);
    }


    @Override
    public CounselingDto update(CounselingParam placeParam) {
        CounselingEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setActiveTimes(placeParam.getActiveTimes());
        initPlace.setHasContract(placeParam.getHasContract());
        initPlace.setTell(placeParam.getTell());
        initPlace.setCallUs(placeParam.getCallUs());
        initPlace.setAutoDiscount(placeParam.getAutoDiscount());
        if (placeParam.getLocation() != null && placeParam.getLocation().getId() != null && placeParam.getLocation().getId() > 0) {
            ManageLocationEntity location = manageLocationRepository.getById(placeParam.getLocation().getId());
            initPlace.setLocation(location);
        }
        CounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }


    @Override
    public CounselingDto updateOrder(CounselingParam placeParam) {
        CounselingEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setOrder(placeParam.getOrder());
        CounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public CounselingDto updateContract(CounselingParam placeParam) {
        CounselingEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setContractData(placeParam.getContractData());
        CounselingEntity place = update(initPlace);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public CounselingEntity update(CounselingEntity place) {
        return placeCounselingRepository.update(place);
    }

    @Override
    public CounselingDto delete(CounselingParam placeParam) {
        CounselingEntity item = getEntityById(placeParam.getId());
        CounselingEntity deletedPlace = delete(item);
        return PlaceConvertor.ToCounselingDto(deletedPlace);
    }

    @Override
    public CounselingEntity delete(CounselingEntity place) {
        return placeCounselingRepository.deleteById2(place);
    }

    @Override
    public List<CounselingEntity> getAll(Pageable pageable) {
        return placeCounselingRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CounselingEntity> findAll(Specification<CounselingEntity> specification, Pageable pageable) {
        return placeCounselingRepository.findAll(specification, pageable);
    }

    @Override
    public List<CounselingDto> convertToDtos(List<CounselingEntity> entities) {
        return PlaceConvertor.ToCounselingDto(entities);
    }

    @Override
    public Page<CounselingDto> convertToDtos(Page<CounselingEntity> entities) {
        return PlaceConvertor.ToCounselingDto(entities);
    }

    @Override
    public CounselingDto getById(long id) {
        CounselingEntity place = getEntityById(id);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public CounselingEntity getEntityById(long id) {
        return placeCounselingRepository.getById(id);
    }

    @Override
    public CounselingDto changeStatus(CounselingParam param) {
        CounselingEntity place = placeCounselingRepository.getById(param.getId());
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
    public List<CounselingDto> getPlacesByLocation(LocationParam param) {
        ManageLocationEntity location = ManageLocationEntity.builder().id(param.getId()).build();
        List<CounselingEntity> placeList = getPlacesByLocation(location);
        return PlaceConvertor.ToCounselingDto(placeList);
    }

    public List<CounselingEntity> getPlacesByLocation(ManageLocationEntity location) {
        return placeCounselingRepository.findAllByLocationAndDeletedIsFalse(location);
    }

    @Override
    public List<CounselingDto> getPlacesByUser(UserParam userParam) {
        List<CounselingEntity> places = placeCounselingRepository.getCounselingByUser(userParam.getId()).stream().filter(o -> !o.isDeleted()).filter(p -> p.getStatus() != PlaceStatusEnum.PREREGISTER).collect(Collectors.toList());
        return PlaceConvertor.ToCounselingDto(places);
    }

    @Override
    public List<MultimediaDto> getMultimedias(CounselingParam param) {
        CounselingEntity place = getEntityById(param.getId());
        List<MultimediaEntity> multimedias = place.getMultimedias();
        return MultimediaConvertor.toDto(multimedias);
    }

    @Override
    public CounselingDto addMultimedia(PlaceMultimediaParam param) {
        CounselingEntity place = getEntityById(param.getPlaceParam().getId());
        MultimediaEntity multimedia = multimediaRepository.getById(param.getMultimedia().getId());
        place.getMultimedias().add(multimedia);
        update(place);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public CounselingDto setDefaultMultimedia(PlaceMultimediaParam param) {
        List<MultimediaEntity> updateList = new ArrayList<>();
        CounselingEntity place = getEntityById(param.getPlaceParam().getId());
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
    public List<ProficienciesDto> getProficienciesOfCounseling(CounselingParam place) {
        return placeCounselingRepository.getProficienciesOfCounseling(place.getId()).stream().map(ProficienciesConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public CounselingDto addMultimediaList(PlaceMultimediaListParam param) {
        CounselingEntity counseling = getEntityById(param.getPlaceParam().getId());
        for (MultimediaRetrieveParam image : param.getMultimedias()) {
            MultimediaEntity multimedia = multimediaRepository.getById(image.getId());
            counseling.getMultimedias().add(multimedia);
        }
        update(counseling);
        return PlaceConvertor.ToCounselingDto(counseling);
    }

    @Override
    public CounselingDto removeMultimedia(PlaceMultimediaParam param) {
        CounselingEntity place = getEntityById(param.getPlaceParam().getId());
        place.getMultimedias().removeIf(m -> Objects.equals(m.getId(), param.getMultimedia().getId()));
        update(place);
        return PlaceConvertor.ToCounselingDto(place);
    }

    @Override
    public InviteCode getPlaceInviteCode(CounselingParam param) {
        CounselingEntity place = placeCounselingRepository.getById(param.getId());
        InviteCode code = InviteCode.builder()
                .code("P" + GeneralHelper.getInviteCode(place.getId(), 1))
                .isActive(true)
                .build();
        return code;
    }

    @Override
    public List<TicketBuyableDto> getBuyableByPlace(CounselingParam param) {
        CounselingEntity place = placeCounselingRepository.getById(param.getId());
        return place.getTicketAppointments().stream().filter(b -> !b.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Boolean sendContractCode(PlaceContractSmsParam param) {
        ObjectMapper objectMapper = new ObjectMapper();
        CounselingEntity place = placeCounselingRepository.getById(param.getPlaceId());
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
    public CounselingDto signContract(CounselingParam placeParam) {
        CounselingEntity initPlace = getEntityById(placeParam.getId());
        if (passwordEncoder.matches(placeParam.getSignCode(), initPlace.getContractCode().getCode())) {
            initPlace.setHasContract(placeParam.getHasContract());
            CounselingEntity place = update(initPlace);
            return PlaceConvertor.ToCounselingDto(place);
        }
        return null;
    }

}
