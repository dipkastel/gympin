package com.notrika.gympin.domain.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.user.UnknownUserException;
import com.notrika.gympin.common.place.enums.PlacePersonnelRole;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.personnel.service.PlacePersonnelService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.AccountServiceImpl;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.persistence.dao.repository.PlacePersonnelAccessRepository;
import com.notrika.gympin.persistence.dao.repository.PlacePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlacePersonnelServiceImpl extends AbstractBaseService<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>, PlacePersonnelEntity> implements PlacePersonnelService {

    @Autowired
    PlacePersonnelRepository placePersonnelRepository;

    @Autowired
    PlacePersonnelAccessRepository placePersonnelAccessRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private SmsService smsService;

    @Override
    @Transactional
    public PlacePersonnelDto add(@NonNull PlacePersonnelParam placePersonnelParam) {
        UserEntity user = userRepository.findByPhoneNumber(placePersonnelParam.getPhoneNumber());
        if (user == null) {
            user = accountService.addUser(UserRegisterParam.builder().phoneNumber(placePersonnelParam.getPhoneNumber()).userRole(UserRoleParam.builder().role(UserRole.USER).build()).build());
        }
        PlaceEntity place = placeRepository.getById(placePersonnelParam.getPlaceParam().getId());

        PlacePersonnelEntity placePersonnelEntity = PlacePersonnelEntity.builder()
                .place(place)
                .user(user)
                .userRole(place.getPlaceOwners().size() > 0 ? PlacePersonnelRole.PLACE_PERSONNEL : PlacePersonnelRole.PLACE_OWNER)
                .build();
        placePersonnelRepository.add(placePersonnelEntity);

        try {
            smsService.sendJoinedToPlaceSms(new SmsDto(user.getPhoneNumber(), SmsTypes.JOINED_TO_PLACE, place.getName()));
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.OUT_SERVICE_EXCEPTION);
        }
        return PlaceConvertor.personnelToDto(placePersonnelEntity);
    }

    @Override
    public PlacePersonnelDto update(@NonNull PlacePersonnelParam placePersonnelParam) {
        return null;
    }

    @Override
    public PlacePersonnelDto delete(@NonNull PlacePersonnelParam placePersonnelParam) {
        PlacePersonnelEntity entity = getEntityById(placePersonnelParam.getId());
        return PlaceConvertor.personnelToDto(placePersonnelRepository.deleteById2(entity));
    }

    @Override
    public PlacePersonnelDto getById(long id) {
        return PlaceConvertor.personnelToDto(placePersonnelRepository.getById(id));
    }

    @Override
    public List<PlacePersonnelDto> getPersonnelByPlace(PlaceParam placeParam) {
        PlaceEntity place = placeRepository.getById(placeParam.getId());

        return convertToDtos(placePersonnelRepository.getAllByPlaceAndDeletedFalse(place));
    }

    @Override
    public List<PlacePersonnelAccessDto> updatePersonnelAccess(List<PlacePersonnelAccessParam> personnelAccess) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(personnelAccess.get(0).getPlacePersonelId());
        List<PlacePersonnelAccessEntity> toUpdate = new ArrayList<>();
        for (PlacePersonnelAccessParam param : personnelAccess) {
            try {
                PlacePersonnelAccessEntity access =  placePersonnel.getPlacePersonnelAccess().stream().filter(a->a.getSection()==param.getSection()).findFirst().get();
                access.setAccess(param.getAccess());
                toUpdate.add(access);
            }catch (Exception e){}
        }
        placePersonnelAccessRepository.updateAll(toUpdate);
        return PlaceConvertor.personnelAccessToDto(toUpdate);
    }

    @Override
    @Transactional
    public List<PlacePersonnelAccessDto> getUserPlaceAccess(Long placeId, Long userId) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.findByUserIdAndPlaceIdAndDeletedFalse(userId, placeId);
        if (placePersonnel == null)
            throw new UnknownUserException();
        List<PlacePersonnelAccessEntity> currentAccess = placePersonnel.getPlacePersonnelAccess();
        List<PlacePersonnelAccessEntity> toAdd = new ArrayList<>();
        List<PlacePersonnelAccessDto> result = new ArrayList<>();
        for (PlacePersonnelAccessEnum section : PlacePersonnelAccessEnum.values()) {
            PlacePersonnelAccessDto resultItem = new PlacePersonnelAccessDto();
            resultItem.setSection(section);
            resultItem.setPlacePersonelId(placePersonnel.getId());
            var hasAccess = false;
            try {
                var currentAccessItem = currentAccess.stream().filter(a -> a.getSection().equals(section)).findFirst();
                if (currentAccessItem.isEmpty()) {
                    toAdd.add(
                            PlacePersonnelAccessEntity.builder()
                                    .access(placePersonnel.getUserRole() == PlacePersonnelRole.PLACE_OWNER || hasAccess)
                                    .placePerson(placePersonnel)
                                    .section(section)
                                    .build()
                    );
                }
                hasAccess = currentAccessItem.get().getAccess();
            } catch (Exception e) {
            }
            resultItem.setAccess(placePersonnel.getUserRole() == PlacePersonnelRole.PLACE_OWNER || hasAccess);
            result.add(resultItem);
        }
        if(toAdd.size()>0)
            placePersonnelAccessRepository.addAll(toAdd);
        return result;
    }

    @Override
    public PlacePersonnelEntity add(PlacePersonnelEntity entity) {
        return placePersonnelRepository.add(entity);
    }

    @Override
    public PlacePersonnelEntity update(PlacePersonnelEntity entity) {
        return null;
    }

    @Override
    public PlacePersonnelEntity delete(PlacePersonnelEntity entity) {
        return placePersonnelRepository.deleteById2(entity);
    }

    @Override
    public PlacePersonnelEntity getEntityById(long id) {
        return placePersonnelRepository.getById(id);
    }

    @Override
    public List<PlacePersonnelEntity> getAll(Pageable pageable) {
        return placePersonnelRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlacePersonnelEntity> findAll(Specification<PlacePersonnelEntity> specification, Pageable pageable) {
        return placePersonnelRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlacePersonnelDto> convertToDtos(List<PlacePersonnelEntity> entities) {
        return entities.stream().map(PlaceConvertor::personnelToDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlacePersonnelDto> convertToDtos(Page<PlacePersonnelEntity> entities) {
        return null;
    }


}