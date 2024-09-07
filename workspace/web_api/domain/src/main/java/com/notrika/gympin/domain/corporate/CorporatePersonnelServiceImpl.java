package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelFileParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.query.CorporatePersonnelQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.UserRegisterParam;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.AccountServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CorporatePersonnelServiceImpl extends AbstractBaseService<CorporatePersonnelParam, CorporatePersonnelDto, CorporatePersonnelQuery, CorporatePersonnelEntity> implements CorporatePersonnelService {

    @Autowired
    private CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    private CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;
    @Autowired
    private CorporateServiceImpl corporateService;
    @Autowired
    private AccountServiceImpl accountService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SmsInService smsService;

    @Override
    public CorporatePersonnelDto add(@NonNull CorporatePersonnelParam Param) {

        UserEntity user = userRepository.findByPhoneNumber(Param.getPhoneNumber());
        CorporateEntity corporate = corporateService.getEntityById(Param.getCorporate().getId());
        if (user == null) {
            user = accountService.addUser(UserRegisterParam.builder().phoneNumber(Param.getPhoneNumber()).invitedBy("C" + GeneralHelper.getInviteCode(corporate.getId(), 1)).userRole(RoleEnum.USER).build());
        } else {
            //check for duplication
            UserEntity finalUser = user;
            if (corporate.getPersonnel().stream().anyMatch(p -> Objects.equals(p.getUser().getId(), finalUser.getId())&&!p.isDeleted()))
                throw new DuplicateEntryAddExeption();
        }

        CorporatePersonnelEntity corporatePersonnelEntity = CorporatePersonnelEntity.builder()
                .corporate(corporate)
                .user(user)
                .role(CorporatePersonnelRoleEnum.PERSONEL)
                .build();
        corporatePersonnelRepository.add(corporatePersonnelEntity);

        try {
            smsService.sendJoinedToCorporateSms(new SmsDto(user.getPhoneNumber(), SmsTypes.JOINED_TO_CORPORATE, corporate.getName()));
        } catch (Exception e) {
            throw new SendSmsException();
        }
        return CorporateConvertor.toPersonnelDto(corporatePersonnelEntity);
    }

    @Override
    public List<CorporatePersonnelDto> addList(@NonNull CorporatePersonnelFileParam Param) {
        if (!Param.getFile().isEmpty()) {
            try {
                List<CorporatePersonnelGroupEntity> groupEntities = corporatePersonnelGroupRepository.findByCorporateIdAndDeletedIsFalse(Param.getCorporateId());
                if (Param.getCorporateId() == null)
                    throw new Exception("شرکت نامشخص");
                byte[] bytes = Param.getFile().getBytes();
                String completeData = new String(bytes);
                String[] rows = completeData.split("\r\n");
                for (String row : rows) {
                    if (Param.getHasHeader() && rows[0] == row) {
                    } else {
                        String[] columns = row.split(",");
                        //check if user has other than phonenumber add user
                        if (!columns[0].isEmpty() || !columns[2].isEmpty() || !columns[3].isEmpty() || !columns[4].isEmpty()) {
                            UserEntity user = userRepository.findByPhoneNumber("0" + columns[1]);
                            if (user == null) {
                                try {
                                    user = accountService.addUser(UserRegisterParam.builder()
                                            .phoneNumber(columns[1])
                                            .invitedBy("C" + GeneralHelper.getInviteCode(Param.getCorporateId(), 1))
                                            .userRole(RoleEnum.USER)
                                            .build());
                                    if (!columns[0].isEmpty())
                                        user.setFullName(columns[0]);
                                    if (!columns[2].isEmpty())
                                        user.setGender(columns[2].equals("1") ? Gender.MALE : Gender.FEMALE);
                                    if (!columns[3].isEmpty())
                                        user.setNationalCode(columns[3]);
                                    if (!columns[4].isEmpty())
                                        user.setBirthday(new SimpleDateFormat("MM/dd/yyyy").parse(columns[4]));
                                    userRepository.update(user);
                                } catch (Exception e) {
                                }
                            }
                        }
                        //add user by create add(addparam)
                        var personnel = add(CorporatePersonnelParam.builder()
                                .role(CorporatePersonnelRoleEnum.PERSONEL)
                                .phoneNumber("0" + columns[1])
                                .corporate(CorporateParam.builder().id(Param.getCorporateId()).build())
                                .build());


                        //check if file has new personel group add group
                        if (!columns[5].isEmpty()) {
                            try {
                                var personnelEntity = getEntityById(personnel.getId());
                                var group = groupEntities.stream().filter(p -> p.getName().trim().equals(columns[5].trim())).findFirst();
                                if (group.isPresent()) {
                                    personnelEntity.setPersonnelGroup(group.get());
                                } else {
                                    var createdGroup = corporatePersonnelGroupRepository.add(CorporatePersonnelGroupEntity.builder()
                                            .name(columns[5])
                                            .corporate(corporateService.getEntityById(Param.getCorporateId()))
                                            .build());
                                    personnelEntity.setPersonnelGroup(createdGroup);
                                    groupEntities.add(createdGroup);
                                }
                                corporatePersonnelRepository.update(personnelEntity);
                            } catch (Exception e) {
                            }
                        }

                    }
                }
            } catch (Exception e) {
            }
        }
        return convertToDtos(corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(Param.getCorporateId()));
    }

    @Override
    public CorporatePersonnelDto update(@NonNull CorporatePersonnelParam corporatePersonnelParam) {
        CorporatePersonnelEntity entity = corporatePersonnelRepository.getById(corporatePersonnelParam.getId());
        if (corporatePersonnelParam.getRole() != null)
            entity.setRole(corporatePersonnelParam.getRole());
        if (corporatePersonnelParam.getPersonelGroup() != null) {
            CorporatePersonnelGroupEntity category = corporatePersonnelGroupRepository.getById(corporatePersonnelParam.getPersonelGroup().getId());
            entity.setPersonnelGroup(category);
        }
        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.update(entity));
    }

    @Override
    public CorporatePersonnelDto delete(@NonNull CorporatePersonnelParam corporateParam) {
        CorporatePersonnelEntity entity = corporatePersonnelRepository.getById(corporateParam.getId());
        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.deleteById2(entity));
    }

    @Override
    public CorporatePersonnelDto getById(long id) {
        return CorporateConvertor.toSecurePersonnelDto(corporatePersonnelRepository.getById(id));
    }

    @Override
    public CorporatePersonnelEntity add(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.add(entity);
    }

    @Override
    public CorporatePersonnelEntity update(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.update(entity);
    }

    @Override
    public CorporatePersonnelEntity delete(CorporatePersonnelEntity entity) {
        return corporatePersonnelRepository.deleteById2(entity);
    }

    @Override
    public CorporatePersonnelEntity getEntityById(long id) {
        return corporatePersonnelRepository.getById(id);
    }

    @Override
    public List<CorporatePersonnelEntity> getAll(Pageable pageable) {
        return corporatePersonnelRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CorporatePersonnelEntity> findAll(Specification<CorporatePersonnelEntity> specification, Pageable pageable) {
        return corporatePersonnelRepository.findAll(specification, pageable);
    }

    @Override
    public List<CorporatePersonnelDto> convertToDtos(List<CorporatePersonnelEntity> entities) {
        return entities.stream().map(CorporateConvertor::toPersonnelDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporatePersonnelDto> convertToDtos(Page<CorporatePersonnelEntity> entities) {
        return entities.map(CorporateConvertor::toPersonnelDto);
    }

    @Override
    public List<CorporatePersonnelDto> getPersonnelByCorporate(CorporateParam corporateParam) {
        return corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(corporateParam.getId()).stream().map(CorporateConvertor::toSecurePersonnelDto).collect(Collectors.toList());
    }

    @Override
    public List<CorporatePersonnelDto> getByUserid(Long userId) {
        return corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(userId).stream().map(CorporateConvertor::toSecurePersonnelDto).collect(Collectors.toList());
    }

    @Override
    public List<CorporatePersonnelDto> getOwnedByUserid(Long userId) {
        return corporatePersonnelRepository.findByUserIdAndRoleAndDeletedIsFalse(userId, CorporatePersonnelRoleEnum.ADMIN).stream().map(CorporateConvertor::toSecurePersonnelDto).collect(Collectors.toList());
    }
}
