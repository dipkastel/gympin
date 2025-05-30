package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.enums.UserGroup;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.common.user.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.param.UserStatusParam;
import com.notrika.gympin.common.user.user.query.UserQuery;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.domain.user.relation.FollowServiceImpl;
import com.notrika.gympin.domain.util.convertor.FinanceUserConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.convertor.UserRoleConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserPasswordRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserPasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserRolesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.*;
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
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private PlaceGymRepository placeGymRepository;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private UserServiceHelper userServiceHelper;

    @Autowired
    private FinanceHelper financeHelper;


    //base
    @Override
    @Transactional
    public UserDto add(UserParam userParam) {
        UserEntity user = addUser(userParam);
        UserPasswordEntity password = UserPasswordEntity.builder().user(user).password(passwordEncoder.encode(userParam.getPassword())).expired(false).build();
        userPasswordRepository.add(password);
        return UserConvertor.toDtoComplete(user);
    }

    public UserEntity addUser(UserParam userParam) {
        UserEntity initUser = new UserEntity();
        initUser.setFullName(userParam.getFullName());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        initUser.setBirthday(userParam.getBirthday());
        initUser.setNationalCode(userParam.getNationalCode());
        initUser.setGender(userParam.getGender());
        initUser.setEmail(userParam.getEmail());
        initUser.setUserRoles(Set.of(UserRolesEntity.builder().role((userParam.getRole() == null) ? RoleEnum.USER : userParam.getRole()).build()));
        initUser.setUserGroup(UserGroup.CLIENT);
        initUser.setUserStatus(UserStatus.ENABLED);
        initUser.setBio(userParam.getBio());
        return userRepository.add(initUser);
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
    @Transactional
    public UserDto getMyInfo() {

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        UserDto userDto = UserConvertor.toDtoComplete(userRequester);
        userDto.setFollowersCount(followService.getFollowersCount(userRequester));
        userDto.setFollowingsCount(followService.getFollowingsCount(userRequester));
        userDto.setBalance(getPurchaseableCreditsByUser(UserParam.builder().id(userRequester.getId()).build()).getTotalCredit());
        return userDto;
    }

    @Override
    public UserEntity getEntityById(long id) {

        return userRepository.findById(id).stream().filter(o -> !o.isDeleted()).findFirst().get();
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
    public List<UserRoleInfoDto> getAllRoles() {
        return Arrays.stream(RoleEnum.values()).map(UserRoleConvertor::ToUserRoleInfoDto).collect(Collectors.toList());
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
        return userRepository.findByUsername(userParam) == null;
    }


    @Override
    public UserCreditDto getAllCreditsByUser(UserParam param) {
        //inits
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();
        UserEntity user = userRepository.getById(param.getId());
//        corporate credits
        List<UserCreditDetailDto> creditsBySponcers = userServiceHelper.getUserCreditsByCorporate(param);
        detalsList.addAll(creditsBySponcers);
//        user wallets
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserPersonalWallet(user)));
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserNonWithdrawableWallet(user)));
        for (FinanceUserEntity wallet : financeHelper.getAllUserIncomeWallets(user))
            detalsList.add(FinanceUserConvertor.toDto(wallet));

        result.setCreditDetail(detalsList);
        result.setTotalCredit(detalsList.stream().filter(o -> !o.isDeleted()).map(UserCreditDetailDto::getCreditPayableAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }

    public UserCreditDto getPurchaseableCreditsByUser(UserParam param) {
        //inits
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();
        UserEntity user = userRepository.getById(param.getId());
//        corporate credits
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserNonWithdrawableWallet(user)));
        List<UserCreditDetailDto> creditsBySponcers = userServiceHelper.getUserCreditsByCorporate(param);
        detalsList.addAll(creditsBySponcers.stream().filter(o -> !o.isDeleted()).sorted(Comparator.comparing(UserCreditDetailDto::getExpireDate)).collect(Collectors.toList()));
//        user wallets
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserPersonalWallet(user)));

        result.setCreditDetail(detalsList);
        result.setTotalCredit(detalsList.stream().filter(o -> !o.isDeleted()).map(UserCreditDetailDto::getCreditPayableAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }

    @Override
    @Transactional
    public UserCreditDto getMyCredits() {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        return getPurchaseableCreditsByUser(UserParam.builder().id(userRequester.getId()).build());
    }

    @Override
    public UserCreditDto getMyPlaceWallet(PlaceGymParam param) {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        PlaceGymEntity place = placeGymRepository.getById(param.getId());
        UserEntity user = userRepository.getById(userRequester.getId());
        if (place.getPlaceOwners().stream().filter(o -> !o.isDeleted()).noneMatch(po -> userRequester.getId().equals(po.getUser().getId())))
            throw new NotFoundException();
        UserCreditDto result = new UserCreditDto();
        List<UserCreditDetailDto> detalsList = new ArrayList<>();
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserIncomeWallet(user, place)));
        detalsList.add(FinanceUserConvertor.toDto(financeHelper.getUserPersonalWallet(user)));
        result.setCreditDetail(detalsList);
        return result;
    }

}
