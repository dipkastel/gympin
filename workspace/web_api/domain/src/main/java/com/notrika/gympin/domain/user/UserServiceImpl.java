package com.notrika.gympin.domain.user;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleUpdateParam;
import com.notrika.gympin.common.user.param.UserStatusParam;
import com.notrika.gympin.common.user.query.UserQuery;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.relation.FollowServiceImpl;
import com.notrika.gympin.domain.ticket.TicketServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.convertor.UserRoleConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.PasswordEntity;
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
    private PasswordRepository passwordRepository;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private TicketServiceImpl ticketService;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private UserRateServiceImpl userRateService;
//
//    @Autowired
//    private AccountingServiceImpl accountingService;


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
        PasswordEntity password = PasswordEntity.builder().user(user).password(passwordEncoder.encode(userParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
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
        if (StringUtils.hasText(userParam.getFullName())) initUser.setFullName(userParam.getFullName());
        if (StringUtils.hasText(userParam.getUsername())) initUser.setUsername(userParam.getUsername());
        if (userParam.getBirthday() != null) initUser.setBirthday(userParam.getBirthday());
        if (userParam.getGender() != null) initUser.setGender(userParam.getGender());
        if (StringUtils.hasText(userParam.getNationalCode())) initUser.setNationalCode(userParam.getNationalCode());
        initUser.setEmail(userParam.getEmail());
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
        userDto.setRate(userRateService.calculateUserRate(UserParam.builder().id(id).build()));
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

}
