package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.multimedia.MultimediaServiceImpl;
import com.notrika.gympin.domain.relation.FollowServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.dao.repository.UserMultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.multimedia.UserMultimediaEntity;
import com.notrika.gympin.persistence.entity.user.Password;
import com.notrika.gympin.persistence.entity.user.Role;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl extends AbstractBaseService<UserParam, UserDto, User> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private UserRoleServiceImpl userRoleService;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private UserRateServiceImpl userRateService;

    @Autowired
    private UserMultimediaRepository userMultimediaRepository;

    @Autowired
    private MultimediaServiceImpl multimediaService;

    @Override
    @Transactional
    public UserDto add(UserParam userParam) {
        List<Role> roles = new ArrayList<>();
        for (UserRoleParam roleParam : userParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        if (roles.isEmpty()) {
            roles.add(userRoleService.getByUserRole(UserRole.USER));
        }
        User initUser = new User();
        initUser.setName(userParam.getName());
        initUser.setLastname(userParam.getLastname());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        initUser.setBirthday(userParam.getBirthday());
        initUser.setNationalCode(userParam.getNationalCode());
        initUser.setEmail(userParam.getEmail());
        initUser.setUserGroup(UserGroup.CLIENT);
        initUser.setUserRole(roles);
        initUser.setUserStatus(UserStatus.ENABLED);
        initUser.setBio(userParam.getBio());
        User user = userRepository.add(initUser);
        Password password = Password.builder().user(user).password(passwordEncoder.encode(userParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
        if(userParam.getAvatarId()!=null && userParam.getAvatarId()>0){
            Multimedia multimedia = multimediaService.getMultimediaById(userParam.getAvatarId());
            UserMultimediaEntity userAvatar = userMultimediaRepository.add(UserMultimediaEntity.builder().multimedia(multimedia).user(user).build());
            List<UserMultimediaEntity> multimediaEntities=new ArrayList<>();
            multimediaEntities.add(userAvatar);
            user.setUserMultimedias(multimediaEntities);
        }
        return UserConvertor.userToUserDtoComplete(user);
    }

    @Override
    public User add(User user) {
        return userRepository.add(user);
    }

    @Override
    @Transactional
    public UserDto update(UserParam userParam) {
        List<Role> roles = new ArrayList<>();
        for (UserRoleParam roleParam : userParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        User initUser = getEntityById(userParam.getId());
        initUser.setName(userParam.getName());
        initUser.setLastname(userParam.getLastname());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        initUser.setBirthday(userParam.getBirthday());
        initUser.setNationalCode(userParam.getNationalCode());
        initUser.setEmail(userParam.getEmail());
        initUser.setUserRole(roles);
        initUser.setBio(userParam.getBio());
        User user = update(initUser);
        if(userParam.getAvatarId()!=null && userParam.getAvatarId()>0){
            Multimedia multimedia = multimediaService.getMultimediaById(userParam.getAvatarId());
            UserMultimediaEntity userAvatar = userMultimediaRepository.add(UserMultimediaEntity.builder().multimedia(multimedia).user(user).build());
            List<UserMultimediaEntity> multimediaEntities=new ArrayList<>();
            multimediaEntities.add(userAvatar);
            user.setUserMultimedias(multimediaEntities);
        }
        return UserConvertor.userToUserDtoComplete(user);
    }

    @Override
    public User update(User user) {
        return userRepository.update(user);
    }

    @Override
    @Transactional
    public UserDto delete(UserParam userParam) {
        User user = getEntityById(userParam.getId());
        User deletedUser = delete(user);
        return UserConvertor.userToUserDtoComplete(deletedUser);
    }

    @Override
    public User delete(User user) {
        return userRepository.deleteById2(user);
    }

    @Override
    public List<User> getAll(Pageable pageable) {
        return userRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserDto> convertToDtos(List<User> entities) {
        return UserConvertor.usersToUserDtos(entities);
    }

    @Override
    public UserDto getById(long id) {
        User user = getEntityById(id);
        UserDto userDto = UserConvertor.userToUserDtoComplete(user);
        userDto.setFollowersCount(followService.getFollowersCount(user));
        userDto.setFollowingsCount(followService.getFollowingsCount(user));
        userDto.setRate(userRateService.calculateUserRate(UserParam.builder().id(id).build()));
        return userDto;
    }

    @Override
    public User getEntityById(long id) {
        return userRepository.getById(id);
    }

    public List<User> getOwnersPlace(Place place) {
        return userRepository.getOwnersPlace(place);
    }

    public User getByPhoneNumberAndUsernameAndEmail(String phoneNumber, String username, String email) {
        return userRepository.findByPhoneNumberAndUsernameAndEmail(phoneNumber, username, email);
    }

    public User getByPhoneNumberAndUsername(String phoneNumber, String username) {
        return userRepository.findByPhoneNumberAndUsername(phoneNumber, username);
    }

    public User getByPhoneNumberAndEmail(String phoneNumber, String email) {
        return userRepository.findByPhoneNumberAndEmail(phoneNumber, email);
    }

    public User getByUsernameAndEmail(String username, String email) {
        return userRepository.findByUsernameAndEmail(username, email);
    }

    public User getByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto suspendUser(UserParam userParam) {
        User user = getEntityById(userParam.getId());
        User suspendUser = suspendUser(user);
        return UserConvertor.userToUserDtoComplete(suspendUser);
    }

    public User suspendUser(User user) {
        User initUser = getEntityById(user.getId());
        initUser.setUserStatus(UserStatus.SUSPENDED);
        return update(initUser);
    }

    @Override
    public UserDto getUserByUsername(UserParam userParam) {
        return UserConvertor.userToUserDtoComplete(getByUsername(userParam.getUsername()));
    }

    @Override
    public UserDto getUserDtoByAnyKey(@NonNull UserParam userParam) {
        return UserConvertor.userToUserDtoComplete(getUserByAnyKey(userParam));
    }

    public User getUserByAnyKey(@NonNull UserParam userParam){
        userParam = GeneralHelper.requireNonNull(userParam,"userParam");
        String phoneNumber = userParam.getPhoneNumber();
        String username = userParam.getUsername();
        String email = userParam.getEmail();
        return getUserByAnyKey(phoneNumber, username, email);
    }

    public User getUserByAnyKey(String phoneNumber, String username, String email) {
        User user = null;
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

}
