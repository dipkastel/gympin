package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceUserParam;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.enums.*;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.query.UserQuery;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.relation.FollowServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.convertor.UserRoleConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceIncreaseUserDepositRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserPasswordRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserPasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl extends AbstractBaseService<UserParam, UserDto, UserQuery, UserEntity> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserPasswordRepository userPasswordRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private FinanceIncreaseUserDepositRepository financeIncreaseUserDepositRepository;



    //base
    @Override
    @Transactional
    public UserDto add(UserParam userParam) {
        UserEntity initUser = new UserEntity();
        initUser.setFullName(userParam.getFullName());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        initUser.setBirthday(userParam.getBirthday());
        initUser.setNationalCode(userParam.getNationalCode());
        initUser.setGender(userParam.getGender());
        initUser.setEmail(userParam.getEmail());
        initUser.setUserRole(UserRole.USER);
        initUser.setUserGroup(UserGroup.CLIENT);
        initUser.setUserStatus(UserStatus.ENABLED);
        initUser.setBio(userParam.getBio());
        UserEntity user = userRepository.add(initUser);
        UserPasswordEntity password = UserPasswordEntity.builder().user(user).password(passwordEncoder.encode(userParam.getPassword())).expired(false).build();
        userPasswordRepository.add(password);
        return UserConvertor.toDtoComplete(user);
    }

    @Override
    public UserEntity add(UserEntity user) {
        user = userRepository.add(user);
//        accountingService.add(user, AccountTopic.PISH_DARYAFT);
        return user;
    }

    @Override
    @Transactional
    public UserDto update(UserParam userParam) {
        UserEntity initUser = getEntityById(userParam.getId());
        if (StringUtils.hasText(userParam.getFullName()))
            initUser.setFullName(userParam.getFullName());
        if (StringUtils.hasText(userParam.getUsername()))
            initUser.setUsername(userParam.getUsername());
        if (userParam.getBirthday() != null)
            initUser.setBirthday(userParam.getBirthday());
        if (userParam.getGender() != null)
            initUser.setGender(userParam.getGender());
        if (StringUtils.hasText(userParam.getNationalCode()))
            initUser.setNationalCode(userParam.getNationalCode());
        if (StringUtils.hasText(userParam.getEmail()))
            initUser.setEmail(userParam.getEmail());
        if (StringUtils.hasText(userParam.getBio()))
            initUser.setBio(userParam.getBio());

        UserEntity user = update(initUser);
        return UserConvertor.toDtoComplete(user);
    }

    @Override
    public UserEntity update(UserEntity user) {
        return userRepository.update(user);
    }

    @Override
    @Transactional
    public UserDto delete(UserParam userParam) {
        UserEntity user = getEntityById(userParam.getId());
        UserEntity deletedUser = delete(user);
        return UserConvertor.toDtoComplete(deletedUser);
    }

    @Override
    public UserEntity delete(UserEntity user) {
        return userRepository.deleteById2(user);
    }

    @Override
    public List<UserEntity> getAll(Pageable pageable) {
        return userRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<UserEntity> findAll(Specification<UserEntity> specification, Pageable pageable) {
        return userRepository.findAll(specification, pageable);
    }

    @Override
    public List<UserDto> convertToDtos(List<UserEntity> entities) {
        return UserConvertor.toDto(entities);
    }

    @Override
    public Page<UserDto> convertToDtos(Page<UserEntity> entities) {
        return UserConvertor.toDto(entities);
    }

    @Override
    public UserDto getById(long id) {
        UserEntity user = getEntityById(id);
        UserDto userDto = UserConvertor.toDtoComplete(user);
        userDto.setFollowersCount(followService.getFollowersCount(user));
        userDto.setFollowingsCount(followService.getFollowingsCount(user));
        return userDto;
    }

    @Override
    public UserDto getMyInfo() {

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        UserDto userDto = UserConvertor.toDtoComplete(userRequester);
        userDto.setFollowersCount(followService.getFollowersCount(userRequester));
        userDto.setFollowingsCount(followService.getFollowingsCount(userRequester));
        userDto.setBalance(getCreditsByUser(UserParam.builder().id(userRequester.getId()).build()).getTotalCredit());
        return userDto;
    }

    @Override
    public UserEntity getEntityById(long id) {

        return userRepository.findById(id).stream().findFirst().get();
    }


    public List<UserEntity> getOwnersPlace(PlaceEntity place) {
        return userRepository.getOwnersPlace(place);
    }

    public UserEntity getByPhoneNumberAndUsernameAndEmail(String phoneNumber, String username, String email) {
        return userRepository.findByPhoneNumberAndUsernameAndEmail(phoneNumber, username, email);
    }

    public UserEntity getByPhoneNumberAndUsername(String phoneNumber, String username) {
        return userRepository.findByPhoneNumberAndUsername(phoneNumber, username);
    }

    public UserEntity getByPhoneNumberAndEmail(String phoneNumber, String email) {
        return userRepository.findByPhoneNumberAndEmail(phoneNumber, email);
    }

    public UserEntity getByUsernameAndEmail(String username, String email) {
        return userRepository.findByUsernameAndEmail(username, email);
    }

    public UserEntity getByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public UserEntity getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserEntity getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto getUserByUsername(UserParam userParam) {
        return UserConvertor.toDtoComplete(getByUsername(userParam.getUsername()));
    }

    @Override
    public UserDto getUserDtoByAnyKey(@NonNull UserParam userParam) {
        return UserConvertor.toDtoComplete(getUserByAnyKey(userParam));
    }

    @Override
    public UserDto UpdateUserRole(UserRoleUpdateParam userRoleUpdateParam) {
        UserEntity user = getEntityById(userRoleUpdateParam.getUserId());
        user.setUserRole(userRoleUpdateParam.getRole());
        return UserConvertor.toDtoComplete(userRepository.update(user));
    }

    @Override
    public List<UserRoleInfoDto> getAllRules() {
        return Arrays.stream(UserRole.values()).map(UserRoleConvertor::ToUserRoleInfoDto).collect(Collectors.toList());
    }

    @Override
    public Long getCount(BaseQuery<?> filter) {
        return userRepository.findFilterdCount(filter);
    }

    public UserEntity getUserByAnyKey(@NonNull UserParam userParam) {
        userParam = GeneralHelper.requireNonNull(userParam, "userParam");
        String phoneNumber = userParam.getPhoneNumber();
        String username = userParam.getUsername();
        String email = userParam.getEmail();
        return getUserByAnyKey(phoneNumber, username, email);
    }

    public UserEntity getUserByAnyKey(String phoneNumber, String username, String email) {
        UserEntity user = null;
        if (StringUtils.hasText(phoneNumber) && StringUtils.hasText(username) && StringUtils.hasText(email)) {
            user = this.getByPhoneNumberAndUsernameAndEmail(phoneNumber, username, email);
        } else if (StringUtils.hasText(phoneNumber) && StringUtils.hasText(username)) {
            user = this.getByPhoneNumberAndUsername(phoneNumber, username);
        } else if (StringUtils.hasText(phoneNumber) && StringUtils.hasText(email)) {
            user = this.getByPhoneNumberAndEmail(phoneNumber, email);
        } else if (StringUtils.hasText(username) && StringUtils.hasText(email)) {
            user = this.getByUsernameAndEmail(username, email);
        } else if (StringUtils.hasText(phoneNumber)) {
            user = this.getByPhoneNumber(phoneNumber);
        } else if (StringUtils.hasText(username)) {
            user = this.getByUsername(username);
        } else if (StringUtils.hasText(email)) {
            user = this.getByEmail(email);
        }
        return user;
    }

    //status

    @Override
    public UserDto updateUserStatus(UserStatusParam userStatusParam) {
        UserEntity user = getEntityById(userStatusParam.getId());
        user.setUserStatus(userStatusParam.getStatus());
        userRepository.update(user);
        return UserConvertor.toDtoComplete(user);
    }
    //avatar

    @Override
    public UserDto updateUserAvatar(UserAvatarParam userParam) {
        MultimediaEntity avatar = multimediaRepository.getById(userParam.getMultimediaId());
        UserEntity user = userRepository.getById(userParam.getUserId());
        user.setUserAvatar(avatar);
        return UserConvertor.toDtoComplete(userRepository.update(user));
    }

    @Override
    public Boolean checkUsernameAvailable(String userParam) {
        return userRepository.findByUsername(userParam)==null;
    }


    @Override
    public UserCreditDto getCreditsByUser(UserParam userParam) {
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();

//        corporate credits
        List<CorporatePersonnelEntity> personnelEntity = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(userParam.getId());
        for (CorporatePersonnelEntity personnel:personnelEntity){
            UserCreditDetailDto detail = new UserCreditDetailDto();
            detail.setCreditAmount(personnel.getCreditBalance());
            detail.setPersonnelId(personnel.getId());
            detail.setCreditType(CreditType.SPONSOR);
            if(personnel.getCorporate().getFinanceCorporate().getTotalDeposit().compareTo(personnel.getCreditBalance())>0){
                detail.setCreditPayableAmount(personnel.getCreditBalance());
            }else{
                detail.setCreditPayableAmount(personnel.getCorporate().getFinanceCorporate().getTotalDeposit());
            }
            detail.setCorporate(CorporateConvertor.toDto(personnel.getCorporate()));
            detalsList.add(detail);
        }

//        user personal credit
        UserEntity user =  userRepository.getById(userParam.getId());
        UserCreditDetailDto detail = new UserCreditDetailDto();
        BigDecimal userDebit = user.getFinanceUser().getTotalDeposit();
        detail.setCreditAmount(userDebit);
        detail.setCreditType(CreditType.PERSONAL);
        detail.setCreditPayableAmount(userDebit);
        detalsList.add(detail);


        result.setCreditDetail(detalsList);
        result.setTotalCredit(detalsList.stream().map(UserCreditDetailDto::getCreditPayableAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }

    @Override
    public UserCreditDto getMyCredits() {
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
//        corporate credits
        List<CorporatePersonnelEntity> personnelEntity = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(userRequester.getId());
        for (CorporatePersonnelEntity personnel:personnelEntity){
            UserCreditDetailDto detail = new UserCreditDetailDto();
            detail.setCreditAmount(personnel.getCreditBalance());
            detail.setPersonnelId(personnel.getId());
            detail.setCreditType(CreditType.SPONSOR);
            if(personnel.getCorporate().getFinanceCorporate().getTotalDeposit().compareTo(personnel.getCreditBalance())>0){
                detail.setCreditPayableAmount(personnel.getCreditBalance());
            }else{
                detail.setCreditPayableAmount(personnel.getCorporate().getFinanceCorporate().getTotalDeposit());
            }
            detail.setCorporate(CorporateConvertor.toDto(personnel.getCorporate()));
            detalsList.add(detail);
        }

//        user personal credit
        UserEntity user =  userRepository.getById(userRequester.getId());
        UserCreditDetailDto detail = new UserCreditDetailDto();
        BigDecimal userDebit = user.getFinanceUser().getTotalDeposit();
        detail.setCreditAmount(userDebit);
        detail.setCreditType(CreditType.PERSONAL);
        detail.setCreditPayableAmount(userDebit);
        detalsList.add(detail);


        result.setCreditDetail(detalsList);
        result.setTotalCredit(detalsList.stream().map(UserCreditDetailDto::getCreditPayableAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }
}
