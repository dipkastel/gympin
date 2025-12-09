package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.*;
import com.notrika.gympin.common.corporate.corporatePersonnel.query.CorporatePersonnelQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.settings.userSettings.enums.UserSettingTypesEnum;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.UserRegisterParam;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.common.util.exception.user.LowDepositException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.domain.user.AccountServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageUserSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.management.settings.UserSettingsEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CorporatePersonnelServiceImpl extends AbstractBaseService<CorporatePersonnelParam, CorporatePersonnelDto, CorporatePersonnelQuery, CorporatePersonnelEntity> implements CorporatePersonnelService {

    @Autowired
    private SmsInService smsService;
    @Autowired
    private FinanceHelper financeHelper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountServiceImpl accountService;
    @Autowired
    private CorporateServiceImpl corporateService;
    @Autowired
    private FinanceSerialRepository financeSerialRepository;
    @Autowired
    private ManageUserSettingsRepository manageUserSettingsRepository;
    @Autowired
    private CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    private CorporatePersonelFinanceHelper corporatePersonelFinanceHelper;
    @Autowired
    private CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;

    @Override
    public CorporatePersonnelDto add(@NonNull CorporatePersonnelParam Param) {
        CorporatePersonnelEntity personnelEntity = addUserToCorporate(Param.getPhoneNumber(), Param.getFullName(), Param.getCorporate().getId());
        if (Param.getSendSms()) {
            try {
                smsService.sendJoinedToCorporateSms(new SmsDto(personnelEntity.getUser().getPhoneNumber(), SmsTypes.JOINED_TO_CORPORATE, personnelEntity.getCorporate().getName()));
            } catch (Exception e) {
                throw new SendSmsException();
            }
        }
        return CorporateConvertor.toPersonnelDto(personnelEntity);
    }

    private CorporatePersonnelEntity addUserToCorporate(String phoneNumber, String fullName, Long corporateId) {

        UserEntity user = userRepository.findByPhoneNumber(phoneNumber);
        CorporateEntity corporate = corporateService.getEntityById(corporateId);
        if (user == null) {
            user = accountService.addUser(UserRegisterParam.builder().phoneNumber(phoneNumber).fullName(fullName).invitedBy("C" + GeneralHelper.getInviteCode(corporate.getId(), 1)).userRole(RoleEnum.USER).build());
        } else {
            //check for duplication
            UserEntity finalUser = user;
            if (corporate.getPersonnel().stream().anyMatch(p -> Objects.equals(p.getUser().getId(), finalUser.getId()) && !p.isDeleted()))
                throw new DuplicateEntryAddExeption();
        }

        CorporatePersonnelEntity corporatePersonnelEntity = CorporatePersonnelEntity.builder()
                .corporate(corporate)
                .user(user)
                .role(CorporatePersonnelRoleEnum.PERSONEL)
                .build();
        return corporatePersonnelRepository.add(corporatePersonnelEntity);
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
                                var group = groupEntities.stream().filter(o -> !o.isDeleted()).filter(p -> p.getName().trim().equals(columns[5].trim())).findFirst();
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
    @Transactional
    public Boolean addPersonnelByList(List<CorporatePersonnelListItem> param) {

        try {
            for (CorporatePersonnelListItem person : param) {
                UserEntity user = userRepository.findByPhoneNumber("0" + person.getPhoneNumber());
                if (user == null) {
                    try {
                        user = accountService.addUser(UserRegisterParam.builder()
                                .phoneNumber(person.getPhoneNumber())
                                .invitedBy("C" + GeneralHelper.getInviteCode(person.getCorporate().getId(), 1))
                                .userRole(RoleEnum.USER)
                                .build());
                        if (!person.getFullName().isEmpty())
                            user.setFullName(person.getFullName());
                        if (person.getGender() != null)
                            user.setGender(person.getGender());
                        if (!person.getNationalCode().isEmpty())
                            user.setNationalCode(person.getNationalCode());
                        if (person.getBirthDay() != null)
                            user.setBirthday(person.getBirthDay());
                        userRepository.update(user);
                    } catch (Exception e) {
                    }
                }
                //add user by create add(addparam)
                add(CorporatePersonnelParam.builder()
                        .role(CorporatePersonnelRoleEnum.PERSONEL)
                        .phoneNumber("0" + person.getPhoneNumber())
                        .sendSms(person.getSendSms())
                        .PersonelGroup(CorporatePersonnelGroupParam.builder().id(person.getGroupId()).build())
                        .corporate(CorporateParam.builder().id(person.getCorporate().getId()).build())
                        .build());
            }
        } catch (Exception e) {
        }
        return true;

    }

    @Override
    public CorporatePersonnelDto update(@NonNull CorporatePersonnelParam corporatePersonnelParam) {
        CorporatePersonnelEntity entity = corporatePersonnelRepository.getById(corporatePersonnelParam.getId());
        if (corporatePersonnelParam.getRole() != null) {
            entity.setRole(corporatePersonnelParam.getRole());
            if (corporatePersonnelParam.getRole() == CorporatePersonnelRoleEnum.ADMIN) {
                try {
                    smsService.sendAdminRoleInCorporate(SmsDto.builder()
                            .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                            .userNumber(entity.getUser().getPhoneNumber())
                            .text1(entity.getCorporate().getName())
                            .build()
                    );
                } catch (Exception e) {
                }
            }
        }

        if (corporatePersonnelParam.getPersonelGroup() != null) {
            CorporatePersonnelGroupEntity category = corporatePersonnelGroupRepository.getById(corporatePersonnelParam.getPersonelGroup().getId());
            entity.setPersonnelGroup(category);
        }
        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.update(entity));
    }

    @Override
    @Transactional
    public CorporatePersonnelDto delete(@NonNull CorporatePersonnelParam corporateParam) {
        //init

        CorporatePersonnelEntity personnel = corporatePersonnelRepository.getById(corporateParam.getId());
        CorporateEntity corporate = personnel.getCorporate();
        FinanceCorporateEntity financeCorporate = corporate.getFinanceCorporate();
        var serial = FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_REMOVE_CORPORATE_PERSONNEL)
                .build();
        //calc total ammount
        List<FinanceCorporatePersonnelCreditEntity> credits = personnel.getCredits().stream().filter(o -> !o.isDeleted()).filter(pc -> pc.getStatus() == CorporatePersonnelCreditStatusEnum.ACTIVE).collect(Collectors.toList());
        BigDecimal totalAmount = credits.stream().filter(o -> !o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        //check corporate has deposit
        if (financeCorporate.getTotalDeposit().compareTo(totalAmount) < 0) {
            throw new LowDepositException();
        }
        if (totalAmount.compareTo(BigDecimal.ZERO) > 0) {
            financeSerialRepository.add(serial);
            //subtranct totaldeposit
            corporatePersonelFinanceHelper.decreaseCorporateTotalDeposit(financeCorporate, totalAmount, serial, null);

            //subtranct totalcredit
            corporatePersonelFinanceHelper.decreaseCorporateTotalCredit(financeCorporate, totalAmount, serial, null);

            //transfer to non withdrawable and decrease credit
            FinanceUserEntity wallet = financeHelper.getUserNonWithdrawableWallet(personnel.getUser());
            for (FinanceCorporatePersonnelCreditEntity cpe : credits) {
                BigDecimal amountBefore = cpe.getCreditAmount();
                corporatePersonelFinanceHelper.decreaseCorporatePersonnelCredit(cpe, cpe.getCreditAmount(), serial);
                wallet = financeHelper.increaseNonWithdrawableWallet(wallet, amountBefore, serial, "بابت اعتبار با شماره : " + cpe.getId());
            }
        }

        return CorporateConvertor.toPersonnelDto(corporatePersonnelRepository.deleteById2(personnel));
    }

    @Override
    public CorporatePersonnelDto getById(long id) {
        return CorporateConvertor.toSecurePersonnelDto(corporatePersonnelRepository.getById(id), corporatePersonelFinanceHelper);
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
        return entities.stream().filter(o -> !o.isDeleted()).map(CorporateConvertor::toPersonnelDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporatePersonnelDto> convertToDtos(Page<CorporatePersonnelEntity> entities) {
        return entities.map(CorporateConvertor::toPersonnelDto);
    }

    @Override
    public List<CorporatePersonnelDto> getPersonnelByCorporate(CorporateParam corporateParam) {
        return corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(corporateParam.getId()).stream().filter(o -> !o.isDeleted()).map(p -> CorporateConvertor.toSecurePersonnelDto(p, corporatePersonelFinanceHelper)).collect(Collectors.toList());
    }

    @Override
    public List<CorporatePersonnelDto> getByUserid(Long userId) {
        return corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(userId).stream().map(p -> CorporateConvertor.toSecurePersonnelDto(p, corporatePersonelFinanceHelper)).collect(Collectors.toList());
    }

    @Override
    public CorporatePersonnelDto getPersonnelByCorporateIdAndUserId(long corporateId, long userId) {
        CorporatePersonnelEntity pp = corporatePersonnelRepository.findByCorporateIdAndUserIdAndDeletedIsFalse(corporateId, userId);
        return CorporateConvertor.toPersonnelDto(pp);
    }

    @Override
    public List<CorporatePersonnelDto> getOwnedByUserid(Long userId) {
        return corporatePersonnelRepository.findByUserIdAndRoleAndDeletedIsFalse(userId, CorporatePersonnelRoleEnum.ADMIN).stream().map(p -> CorporateConvertor.toSecurePersonnelDto(p, corporatePersonelFinanceHelper)).collect(Collectors.toList());
    }

    @Override
    public Boolean setPersonelAccessToCatering(CorporatePersonnelCateringAccessParam param) {
        CorporatePersonnelEntity personnel = corporatePersonnelRepository.getById(param.getPersonnelId());
        List<UserSettingsEntity> settings = manageUserSettingsRepository.findAllByDeletedIsFalseAndUserIdAndKeyAndDataLike(personnel.getUser().getId(), UserSettingTypesEnum.CATERING_ACCESS, personnel.getId().toString());
        if (param.getAccess()) {
            //Add Access
            UserSettingsEntity access = settings.stream().filter(a -> a.getValue().equals(param.getCateringId().toString())).findFirst().orElse(null);
            if (access == null) {
                manageUserSettingsRepository.add(UserSettingsEntity.builder()
                        .key(UserSettingTypesEnum.CATERING_ACCESS)
                        .value(param.getCateringId().toString())
                        .user(personnel.getUser())
                        .data(personnel.getId().toString())
                        .build()
                );
            }
        } else {
            //removeAccess
            UserSettingsEntity access = settings.stream().filter(a -> a.getValue().equals(param.getCateringId().toString())).findFirst().orElse(null);
            if (access != null) {
                manageUserSettingsRepository.deleteById2(access);
            }
        }
        return true;
    }

    @Override
    public Boolean setAllPersonelAccessToCatering(CorporatePersonnelCateringAccessParam param) {
        List<CorporatePersonnelEntity> personnel = corporatePersonnelRepository.findByCorporateIdAndDeletedIsFalse(param.getCorporateId());
        for (CorporatePersonnelEntity person :
                personnel) {
            param.setPersonnelId(person.getId());
            setPersonelAccessToCatering(param);
        }
        return true;
    }
}
