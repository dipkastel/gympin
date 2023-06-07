package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.activation.code.ActivationCodeExpiredException;
import com.notrika.gympin.common.exception.activation.code.ActivationCodeManyRequestException;
import com.notrika.gympin.common.exception.activation.code.ActivationCodeNotFoundException;
import com.notrika.gympin.common.exception.general.SendSmsException;
import com.notrika.gympin.common.exception.general.UserNotAllowedException;
import com.notrika.gympin.common.support.enums.SupportMessageStatus;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.support.service.SupportService;
import com.notrika.gympin.common.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.TokenType;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.*;
import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.common.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.PasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private SmsService smsService;
    @Autowired
    private ActivationCodeRepository activationCodeRepository;
    @Autowired
    private PasswordRepository passwordRepository;
    @Autowired
    private SupportService supportService;


    @Override
    @Transactional
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        log.info("Going to send activation sms...\n");
        UserEntity user = userService.getByPhoneNumber(GeneralHelper.fixPhoneNumber(dto.getPhoneNumber()));
//        if (user == null) throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_NOT_FOUND);
        if (user == null) {
            user = addUser(UserRegisterParam.builder().userRole(UserRoleParam.builder().role(UserRole.USER).build()).phoneNumber(dto.getPhoneNumber()).build());
        }
        if (!CheckUserAccess(user, dto.getApplication()))
            throw new UserNotAllowedException();
        String code = MyRandom.GenerateRandomVerificationSmsCode();
        if (user.getActivationCode() != null && user.getActivationCode().getExpiredDate() != null && user.getActivationCode().getExpiredDate().after(new Date())) {
            throw new ActivationCodeManyRequestException();
        }
        try {
            return smsService.sendVerificationSms(user.getId(), new SmsDto(user.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION, code));
        } catch (Exception e) {
            throw new SendSmsException();
        }
    }

    @Override
    public UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase {
        log.info("Going to register user...\n");
        try {
            UserEntity insertedUser = addUser(userRegisterParam);
            return UserConvertor.toRegisterDto(insertedUser);
        } catch (DataIntegrityViolationException e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.REGISTER_USER_EXIST);
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
    }

    public UserEntity addUser(UserRegisterParam userRegisterParam) {
        log.info("Going to addUser...\n");
        UserEntity user = new UserEntity();
        user.setUsername("USER_" + new Date().getTime());
        user.setPhoneNumber(GeneralHelper.fixPhoneNumber(userRegisterParam.getPhoneNumber()));
        user.setUserRole(userRegisterParam.getUserRole().getRole());
        user.setUserGroup(UserGroup.CLIENT);
        user.setUserStatus(UserStatus.ENABLED);
        user.setBalance(BigDecimal.ZERO);
        return userService.add(user);
    }

    @Override
    @Transactional
    public UserDto loginUser(LoginParam loginParam) throws ExceptionBase {
        log.info("Going to loginUser...\n");
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        UserEntity user = getUser(loginParam);
        ActivationCodeEntity activationCode = user.getActivationCode();
        if (activationCode == null) {
            throw new ActivationCodeNotFoundException();
        }
        if (activationCode.isDeleted()) {
            throw new ActivationCodeExpiredException();
        }

        if (!CheckUserAccess(user, loginParam.getApplication()))
            throw new UserNotAllowedException();

        activationCode.setDeleted(true);
        activationCodeRepository.update(activationCode);
        String jwt = getJwt(loginParam, GeneralHelper.fixPhoneNumber(loginParam.getUsername()), TokenType.USER);
        String refreshJwt = getJwt(loginParam, GeneralHelper.fixPhoneNumber(loginParam.getUsername()), TokenType.REFRESH_TOKE);
        UserDto result = UserConvertor.toDtoComplete(user);
        result.setToken(jwt);
        result.setRefreshToken(refreshJwt);
        log.info("user logined {}...\n", result);
        return result;
    }

    private UserEntity getUser(LoginParam loginParam) {
        UserEntity user = null;
        switch (loginParam.getUsernameType()) {
            case PHONENUMBER:
                user = userService.getByPhoneNumber(GeneralHelper.fixPhoneNumber(loginParam.getUsername()));
                break;
            case USERNAME:
                user = userService.getByUsername(loginParam.getUsername());
                break;
            case EMAIL:
                user = userService.getByEmail(loginParam.getUsername());
                break;
        }
        return user;
    }

    private String getJwt(LoginParam loginParam, String phoneNumber, TokenType tokenType) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phoneNumber, loginParam.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.generateJwtToken(authentication, tokenType);
    }

    private boolean CheckUserAccess(UserEntity user, ApplicationEnum application) {
        if(application==null) return false;
        switch (application) {
            case ANDROID:
                return user.getUserRole() == UserRole.USER;
            case IOS:
                return user.getUserRole() == UserRole.USER;
            case WEBPANEL:
                return user.getUserRole() == UserRole.ADMIN
                        || user.getUserRole() == UserRole.SUPER_ADMIN
                        || user.getUserRole() == UserRole.CONTENT
                        || user.getUserRole() == UserRole.MANAGER
                        || user.getUserRole() == UserRole.MARKET;
            case WEBAPP:
                return user.getUserRole() == UserRole.USER
                        ||user.getUserRole() == UserRole.ADMIN
                        || user.getUserRole() == UserRole.SUPER_ADMIN
                        || user.getUserRole() == UserRole.CONTENT
                        || user.getUserRole() == UserRole.MANAGER
                        || user.getUserRole() == UserRole.MARKET;
            case WEBMASTER:
                return user.getPlacePersonnel().size() > 0;
            case WEBCORPORATE:
                return user.getCorporatesPersonel().size() > 0;
        }
        return false;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        log.info("Going to loadUserByUsername ...\n");
        UserEntity user = userService.getByPhoneNumber(phoneNumber);
        if (user == null) {
            throw new UsernameNotFoundException(phoneNumber);
        }
        boolean accountNonExpired = !user.isDeleted();
        boolean accountNonLocked = !(user.getUserStatus() == UserStatus.LOCKED);
        boolean credentialsNonExpired = true;
        boolean enabled = user.getUserStatus() == UserStatus.ENABLED;
        String password = null;
        if (user.getActivationCode() != null) {
            password = user.getActivationCode().getCode();
        }
        if (password == null) {
            PasswordEntity pass = passwordRepository.findByUserAndExpiredIsFalseAndDeletedIsFalse(user);
            password = pass != null ? pass.getPassword() : null;
        }
        if (password == null) {
            //            throw new ExceptionBase();
        }
        setUserContext(user);
        ArrayList<UserRole> roles = new ArrayList<>();
        roles.add(user.getUserRole());
        UserDetailsImpl userDetails = new UserDetailsImpl(roles, password, phoneNumber, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
        log.info("User loaded: {}", userDetails);
        return userDetails;
    }

    @Override
    public RefreshTokenDto refreshToken(RefreshTokenParam refreshToken) {
        if (StringUtils.hasText(refreshToken.getRefreshToken()) && tokenProvider.validateToken(refreshToken.getRefreshToken())) {
            return tokenProvider.refreshToken(refreshToken.getRefreshToken());
        } else {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.INPUT_NOT_VALID);
        }
    }

    private void setUserContext(UserEntity user) {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null) {
            context = new GympinContext();
        }
        context.getEntry().put(GympinContext.USER_KEY, user);
        GympinContextHolder.setContext(context);
    }

    @Override
    @Transactional
    public Boolean requestRegisterPlace(RequestRegisterParam param) {
        //identify user
//        UserEntity user = userService.getByPhoneNumber(GeneralHelper.fixPhoneNumber(param.getPhoneNumber()));
//        if (user == null){
//            UserRoleParam userRole = new UserRoleParam();
//            userRole.setRole(UserRole.USER);
//            user = addUser(UserRegisterParam.builder().phoneNumber(GeneralHelper.fixPhoneNumber(param.getPhoneNumber())).userRole(userRole).build());
//        }
//        user.setFullName(param.getFullName());
//        userService.update(user);
//        //pre-register
//        PlaceEntity initPlace = new PlaceEntity();
//        initPlace.setName(param.getPlaceName());
//        initPlace.setStatus(PlaceStatusEnum.PREREGISTER);
//        initPlace.setAddress("");
//        initPlace.setCreatorUser(user);
//        PlaceEntity place = placeRepository.add(initPlace);
//        //add user To Place
//        PlacePersonnelEntity placePersonnelEntity = PlacePersonnelEntity.builder()
//                .place(place)
//                .user(user)
//                .userRole(PlacePersonnelRole.PLACE_OWNER)
//                .build();
//        placePersonnelRepository.add(placePersonnelEntity);
//
//        try {
//            smsService.sendRegisterCompleted(new SmsDto(user.getPhoneNumber(), SmsTypes.JOINED_TO_PLACE,param.getPlaceName()));
//        } catch (Exception e) {
//            throw new SendSmsException();
//        }
        String title = "درخواست افزودن مجموعه توسط " + param.getFullName();
        String message = "افزودن مجموعه ورزشی " + param.getPlaceName() + " توسط " + param.getFullName() + " با شماره " + param.getPhoneNumber() + " درخواست شده.";
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportMessageStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .messages(message)
                        .build())
                .build());

//        try {
//            smsService.sendRegisterCompleted(new SmsDto(param.getPhoneNumber(), SmsTypes.JOINED_TO_PLACE,param.getPlaceName()));
//        } catch (Exception e) {
//            throw new SendSmsException();
//        }
        return true;

    }

    @Override
    @Transactional
    public Boolean requestRegisterCorporate(RequestRegisterParam param) {
        String title = "درخواست افزودن سازمان توسط " + param.getFullName();
        String message = "افزودن سازمان " + param.getPlaceName() + " توسط " + param.getFullName() + " با شماره " + param.getPhoneNumber() + " درخواست شده.";
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportMessageStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    public Boolean requestRegisterAdvice(RequestRegisterParam param) {
        String title = "درخواست مشاوره از طرف " + param.getFullName();
        String message = param.getPlaceName() + " - " + param.getFullName() + " - " + param.getPhoneNumber();
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportMessageStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    public Boolean requestPublicMessage(RequestRegisterParam param) {
        String title = "پیام از" + param.getFullName();
        String message = param.getPlaceName() + " - " + param.getFullName() + " - " + param.getPhoneNumber();
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportMessageStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .messages(message)
                        .build())
                .build());
        return true;

    }
}
