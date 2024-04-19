package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelBuyableAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.personnel.service.PlacePersonnelService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.param.UserRegisterParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.AccountServiceImpl;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.place.*;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelRoleEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlacePersonnelServiceImpl extends AbstractBaseService<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>, PlacePersonnelEntity> implements PlacePersonnelService {

    @Autowired
    PlacePersonnelRepository placePersonnelRepository;

    @Autowired
    PlacePersonnelAccessRepository placePersonnelAccessRepository;

    @Autowired
    PlacePersonnelHallAccessRepository placePersonnelHallAccessRepository;

    @Autowired
    PlacePersonnelRoleRepository placePersonnelRoleRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private SmsInService smsService;

    @Override
    @Transactional
    public PlacePersonnelDto add(@NonNull PlacePersonnelParam placePersonnelParam) {
        UserEntity user = userRepository.findByPhoneNumber(placePersonnelParam.getPhoneNumber());
        PlaceEntity place = placeRepository.getById(placePersonnelParam.getPlace().getId());

        if (user == null) {
            RoleEnum role = placePersonnelParam.getUserRole() == PlacePersonnelRoleEnum.PLACE_COACH ? RoleEnum.COACH : place.getPlaceOwners().size() > 0 ? RoleEnum.PLACE_PERSONNEL : RoleEnum.PLACE_MANAGER;
            user = accountService.addUser(UserRegisterParam.
                    builder().
                    invitedBy("P" + GeneralHelper.getInviteCode(place.getId(), 1)).
                    phoneNumber(placePersonnelParam.getPhoneNumber()).
                    userRole(role)
                    .build());
        } else {
            //check for duplication
            UserEntity finalUser = user;
            if (place.getPlaceOwners().stream().anyMatch(p -> !p.isDeleted()&& Objects.equals(p.getUser().getId(), finalUser.getId())))
                throw new DuplicateEntryAddExeption();
        }
        var placePersonnelRole = placePersonnelParam.getUserRole() == PlacePersonnelRoleEnum.PLACE_COACH ? PlacePersonnelRoleEnum.PLACE_COACH : place.getPlaceOwners().size() > 0 ? (placePersonnelParam.getUserRole() != null ? placePersonnelParam.getUserRole() : PlacePersonnelRoleEnum.PLACE_PERSONNEL) : PlacePersonnelRoleEnum.PLACE_OWNER;
        PlacePersonnelEntity placePersonnelEntity = PlacePersonnelEntity.builder()
                .place(place)
                .user(user)
                .placePersonnelRoles(Set.of(PlacePersonnelRoleEntity.builder().role(placePersonnelRole).build()))
                .isBeneficiary(false)
                .isPublic(false)
                .commissionFee(0.0)
                .build();
        placePersonnelRepository.add(placePersonnelEntity);

        try {
            var role = placePersonnelRole.getName();
            smsService.sendJoinedToPlaceSms(new SmsDto(user.getPhoneNumber(), SmsTypes.JOINED_TO_PLACE,placePersonnelRole.getName(), place.getName()));
        } catch (Exception e) {
            throw new SendSmsException();
        }
        return PlaceConvertor.personnelToDto(placePersonnelEntity);
    }

    @Override
    public PlacePersonnelDto update(@NonNull PlacePersonnelParam placePersonnelParam) {
        return null;
    }

    @Override
    public PlacePersonnelDto addPlacePersonnelRole(@NonNull PlacePersonnelParam placePersonnelParam) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(placePersonnelParam.getId());
        if(placePersonnel.getPlacePersonnelRoles().stream().anyMatch(ppr->ppr.getRole()==placePersonnelParam.getUserRole()&&!ppr.isDeleted()))
            throw new DuplicateEntryAddExeption();
        placePersonnelRoleRepository.add(PlacePersonnelRoleEntity.builder().role(placePersonnelParam.getUserRole()).placePersonnel(placePersonnel).build());
        return PlaceConvertor.personnelToDto(placePersonnelRepository.getById(placePersonnelParam.getId()));
    }

    @Override
    public PlacePersonnelDto deletePlacePersonnelRole(@NonNull PlacePersonnelParam placePersonnelParam) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(placePersonnelParam.getId());
        try{
            var placepersonnelRole=placePersonnel.getPlacePersonnelRoles().stream().filter(pp->pp.getRole()==placePersonnelParam.getUserRole()&&!pp.isDeleted()).findFirst().orElse(null);
            if(placepersonnelRole!=null)
                placePersonnelRoleRepository.deleteById2(placepersonnelRole);
        }catch (Exception e){}
        return PlaceConvertor.personnelToDto(placePersonnelRepository.getById(placePersonnelParam.getId()));
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
    public List<PlacePersonnelDto> getPersonnelByUser(UserParam userParam) {
        List<PlacePersonnelEntity> placePersonnel = placePersonnelRepository.findAllByUserIdAndDeletedIsFalse(userParam.getId());
        return convertToDtos(placePersonnel);
    }

    @Override
    public PlacePersonnelDto updatePersonnelCommissionFee(PlacePersonnelParam param) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(param.getId());
        placePersonnel.setIsBeneficiary(param.getCommissionFee() > 0);
        placePersonnel.setCommissionFee(param.getCommissionFee());
        return PlaceConvertor.personnelToDto(placePersonnelRepository.update(placePersonnel));
    }

    @Override
    public List<PlacePersonnelAccessDto> updatePersonnelAccess(List<PlacePersonnelAccessParam> personnelAccess) {
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(personnelAccess.get(0).getPlacePersonelId());
        List<PlacePersonnelAccessEntity> toUpdate = new ArrayList<>();
        for (PlacePersonnelAccessParam param : personnelAccess) {
            try {
                PlacePersonnelAccessEntity access = placePersonnel.getPlacePersonnelAccess().stream().filter(a -> a.getSection() == param.getSection()).findFirst().get();
                access.setAccess(param.getAccess());
                toUpdate.add(access);
            } catch (Exception e) {
            }
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
                var currentAccessItem = currentAccess.stream().filter(a -> a.getSection().equals(section)).findFirst().orElse(null);
                if (currentAccessItem==null) {
                    var access = placePersonnel.getPlacePersonnelRoles().stream().anyMatch(ppr->(ppr.getRole()== PlacePersonnelRoleEnum.PLACE_OWNER&&!ppr.isDeleted())) || hasAccess;
                    toAdd.add(
                            PlacePersonnelAccessEntity.builder()
                                    .access(access)
                                    .placePerson(placePersonnel)
                                    .section(section)
                                    .build()
                    );
                }
                hasAccess = currentAccessItem.getAccess();
            } catch (Exception e) {
            }
            resultItem.setAccess(placePersonnel.getPlacePersonnelRoles().stream().anyMatch(ppr->(ppr.getRole()== PlacePersonnelRoleEnum.PLACE_OWNER&&!ppr.isDeleted())) || hasAccess);
            result.add(resultItem);
        }
        if (toAdd.size() > 0) {
            placePersonnelAccessRepository.addAll(toAdd);
        }
        return result;
    }

    @Override
    public List<PlacePersonnelDto> getPlaceBeneficiaries(Long placeId) {
        try {
            return placeRepository
                    .getById(placeId)
                    .getPlaceOwners()
                    .stream()
                    .filter(PlacePersonnelEntity::getIsBeneficiary)
                    .map(PlaceConvertor::personnelToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<PlacePersonnelBuyableAccessDto> updatePersonnelBuyableAccess(List<PlacePersonnelBuyableAccessParam> personnelhallAccess) {

        PlacePersonnelEntity placePersonnel = placePersonnelRepository.getById(personnelhallAccess.get(0).getPlacePersonelId());
        List<PlacePersonelBuyableAccessEntity> toUpdate = new ArrayList<>();
        for (PlacePersonnelBuyableAccessParam param : personnelhallAccess) {
            try {
                PlacePersonelBuyableAccessEntity access = placePersonnel.getPlacePersonnelBuyableAccess().stream().filter(a -> a.getBuyable().getId() == param.getBuyableParam().getId()).findFirst().get();
                access.setAccess(param.getAccess());
                toUpdate.add(access);
            } catch (Exception e) {
            }
        }
        placePersonnelHallAccessRepository.updateAll(toUpdate);
        return PlaceConvertor.personelBuyableAccessToDto(toUpdate);
    }

    @Override
    public List<PlacePersonnelBuyableAccessDto> getUserPlaceHallAccess(Long placeId, Long userId) {
        PlaceEntity place = placeRepository.getById(placeId);
        PlacePersonnelEntity placePersonnel = placePersonnelRepository.findByUserIdAndPlaceIdAndDeletedFalse(userId, placeId);
        if (placePersonnel == null)
            throw new UnknownUserException();
        List<PlacePersonelBuyableAccessEntity> currentAccess = placePersonnel.getPlacePersonnelBuyableAccess();
        List<PlacePersonelBuyableAccessEntity> toAdd = new ArrayList<>();
        List<PlacePersonnelBuyableAccessDto> result = new ArrayList<>();

        for (BuyableEntity placeBuyable : place.getBuyables()) {
            PlacePersonnelBuyableAccessDto resultItem = new PlacePersonnelBuyableAccessDto();
            resultItem.setBuyableDto(BuyableConvertor.ToDto(placeBuyable));
            resultItem.setPlacePersonelId(placePersonnel.getId());
            var hasAccess = false;
            try {
                var currentAccessItem = currentAccess.stream().filter(a -> a.getBuyable().getId().equals(placeBuyable.getId())).findFirst();
                if (currentAccessItem.isEmpty()) {
                    toAdd.add(
                            PlacePersonelBuyableAccessEntity.builder()
                                    .access(placePersonnel.getPlacePersonnelRoles().stream().anyMatch(ppr->(ppr.getRole()== PlacePersonnelRoleEnum.PLACE_OWNER&&!ppr.isDeleted())) || hasAccess)
                                    .placePerson(placePersonnel)
                                    .buyable(placeBuyable)
                                    .build()
                    );
                }
                hasAccess = currentAccessItem.get().getAccess();
            } catch (Exception e) {
            }
            resultItem.setAccess(placePersonnel.getPlacePersonnelRoles().stream().anyMatch(ppr->(ppr.getRole()== PlacePersonnelRoleEnum.PLACE_OWNER&&!ppr.isDeleted())) || hasAccess);
            result.add(resultItem);
        }

        if (toAdd.size() > 0) {
            placePersonnelHallAccessRepository.addAll(toAdd);
        }
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
