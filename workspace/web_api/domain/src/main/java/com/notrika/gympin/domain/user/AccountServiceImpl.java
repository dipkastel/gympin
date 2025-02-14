package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.support.service.SupportService;
import com.notrika.gympin.common.user.user.dto.*;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.enums.TokenType;
import com.notrika.gympin.common.user.user.enums.UserGroup;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.user.user.service.AccountService;
import com.notrika.gympin.common.user.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import com.notrika.gympin.common.util.exception.activation.code.ActivationCodeExpiredException;
import com.notrika.gympin.common.util.exception.activation.code.ActivationCodeManyRequestException;
import com.notrika.gympin.common.util.exception.activation.code.ActivationCodeNotFoundException;
import com.notrika.gympin.common.util.exception.activation.code.InviteCodeNotValid;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.common.util.exception.general.UserNotAllowedException;
import com.notrika.gympin.common.util.exception.purchased.EntryAlreadyExistException;
import com.notrika.gympin.common.util.exception.user.BadUserCredentialsException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.util.exception.user.UserLockedException;
import com.notrika.gympin.common.util.exception.user.UserSuspendedException;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.authCodes.UserActivationCodeRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageGiftCreditRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserPasswordRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserPasswordEntity;
import com.notrika.gympin.persistence.entity.user.UserRolesEntity;
import com.notrika.gympin.persistence.entity.authCodes.UserActivationCodeEntity;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private SmsInService smsService;
    @Autowired
    private UserActivationCodeRepository userActivationCodeRepository;
    @Autowired
    private UserPasswordRepository userPasswordRepository;
    @Autowired
    private SupportService supportService;

    @Autowired
    ManageGiftCreditRepository giftCreditRepository;



    @Override
    @Transactional
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        log.info("Going to send activation sms...\n");
        UserEntity user = userService.getByPhoneNumber(GeneralHelper.fixPhoneNumber(dto.getPhoneNumber()));
        if (user == null) throw new UnknownUserException();
//        if (user == null) {
//            user = addUser(UserRegisterParam.builder().userRole(UserRoleParam.builder().role(UserRole.USER).build()).phoneNumber(dto.getPhoneNumber()).build());
//        }
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
    public UserRegisterDto registerByInviteCode(UserRegisterParam userRegisterParam) {
        log.info("Going to register user by invite code...\n");
        UserEntity user = userService.getByPhoneNumber(GeneralHelper.fixPhoneNumber(userRegisterParam.getPhoneNumber()));
        if (user != null) throw new EntryAlreadyExistException();
        GeneralHelper.checkInviteCode(userRegisterParam.getInvitedBy(), userRepository,giftCreditRepository);
//        if (!)
//            throw new InviteCodeNotValid();
        try {
            userRegisterParam.setUserRole(RoleEnum.USER);
            UserEntity insertedUser = addUser(userRegisterParam);
            if(userRegisterParam.getInvitedBy().startsWith("G")){
                //updateInviteCode
                ManageGiftCreditEntity gift = giftCreditRepository.getByRegisterCodeAndDeletedIsFalse(userRegisterParam.getInvitedBy());
                gift.setStatus(GiftCreditStatusEnum.REGISTERED);
                gift.setCanRegister(false);
                gift.setUser(insertedUser);
            }
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


        if (userRegisterParam.getUserRole() == null)
            userRegisterParam.setUserRole(RoleEnum.USER);

        Set<UserRolesEntity> userRoles = new java.util.HashSet<>(Set.of(
                UserRolesEntity.builder().role(RoleEnum.USER).build()
        ));
        if (userRegisterParam.getUserRole() != RoleEnum.USER)
            userRoles.add(UserRolesEntity.builder().role(userRegisterParam.getUserRole()).build());
        user.setUserRoles(userRoles);


        if (userRegisterParam.getFullName() != null)
            user.setFullName(userRegisterParam.getFullName());
        if (userRegisterParam.getInvitedBy() != null)
            user.setInvitedBy(userRegisterParam.getInvitedBy());
        user.setUserGroup(UserGroup.CLIENT);
        user.setUserStatus(UserStatus.ENABLED);
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

        if (user == null)
            throw new UnknownUserException();
        if (user.isDeleted())
            throw new UnknownUserException();
        if (user.getUserStatus() == UserStatus.LOCKED)
            throw new UserLockedException();
        if (user.getUserStatus() == UserStatus.SUSPENDED)
            throw new UserSuspendedException();
        UserActivationCodeEntity activationCode = user.getActivationCode();
        if (activationCode == null) {
            throw new ActivationCodeNotFoundException();
        }
        if (activationCode.isDeleted()) {
            throw new ActivationCodeExpiredException();
        }

        if (!CheckUserAccess(user, loginParam.getApplication()))
            throw new UserNotAllowedException();

        activationCode.setDeleted(true);
        userActivationCodeRepository.update(activationCode);
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
        try {
            var auth1 = new UsernamePasswordAuthenticationToken(phoneNumber, loginParam.getPassword());
            Authentication authentication = authenticationManager.authenticate(auth1);
            if (!authentication.isAuthenticated())
                throw new BadUserCredentialsException();
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return tokenProvider.generateJwtToken(authentication, tokenType);
        } catch (Exception e) {
            throw new BadUserCredentialsException();
        }
    }

    private boolean CheckUserAccess(UserEntity user, ApplicationEnum application) {
        if (application == null) return false;
        switch (application) {
            case ANDROID:
                return true;
            case IOS:
                return true;
            case WEBPANEL:
                return user.getUserRoles().stream().map(UserRolesEntity::getRole).anyMatch(p -> p == RoleEnum.ADMIN
                        || p == RoleEnum.SUPER_ADMIN
                        || p == RoleEnum.MANAGER
                        || p == RoleEnum.MARKET);
            case WEBAPP:
                return true;
            case WEBMASTER:
                return user.getPlacePersonnel().size() > 0;
            case WEBCORPORATE:
                return user.getCorporatesPersonel().stream().filter(f -> f.getRole() == CorporatePersonnelRoleEnum.ADMIN).count() > 0;
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

        if (user.isDeleted())
            throw new UnknownUserException();
        if (user.getUserStatus() == UserStatus.LOCKED)
            throw new UserLockedException();
        if (user.getUserStatus() == UserStatus.SUSPENDED)
            throw new UserSuspendedException();

        boolean accountNonExpired = !user.isDeleted();
        boolean accountNonLocked = !(user.getUserStatus() == UserStatus.LOCKED);
        boolean credentialsNonExpired = true;
        boolean enabled = user.getUserStatus() == UserStatus.ENABLED;
        String password = null;
        if (user.getActivationCode() != null) {
            password = user.getActivationCode().getCode();
        }
        if (password == null) {
            UserPasswordEntity pass = userPasswordRepository.findByUserAndExpiredIsFalseAndDeletedIsFalse(user);
            password = pass != null ? pass.getPassword() : null;
        }
        if (password == null) {
            //            throw new ExceptionBase();
        }
        setUserContext(user);
        ArrayList<RoleEnum> roles = user.getUserRoles().stream().map(UserRolesEntity::getRole).collect(Collectors.toCollection(ArrayList::new));
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
        String title = "درخواست افزودن مجموعه توسط " + param.getFullName();
        String message = "افزودن مجموعه ورزشی " + param.getText() + " توسط " + param.getFullName() + " با شماره " + param.getPhoneNumber() + " درخواست شده.";
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .isRead(true)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    @Transactional
    public Boolean requestRegisterCorporate(RequestRegisterParam param) {
        String title = "درخواست افزودن سازمان توسط " + param.getFullName();
        String message = "افزودن سازمان " + param.getText() + " توسط " + param.getFullName() + " با شماره " + param.getPhoneNumber() + " درخواست شده.";
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .isRead(true)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    public Boolean requestRegisterAdvice(RequestRegisterParam param) {
        String title = "درخواست مشاوره از طرف " + param.getFullName();
        String message = param.getText() + " - " + param.getFullName() + " - " + param.getPhoneNumber();
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .isRead(true)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    public Boolean requestPublicMessage(RequestRegisterParam param) {
        String title = "پیام از" + param.getFullName();
        String message = param.getText() + " - " + param.getFullName() + " - " + param.getPhoneNumber();
        supportService.add(SupportParam.builder()
                .title(title)
                .supportMessages(SupportMessageParam.builder()
                        .status(SupportStatus.AWAITING_EXPERT)
                        .isAnswer(false)
                        .isRead(true)
                        .messages(message)
                        .build())
                .build());
        return true;

    }

    @Override
    public UserInviteCodesDto getUserInviteCodes() {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        UserInviteCodesDto codesDto = new UserInviteCodesDto();
        codesDto.setTitle("کد های دعوت شما");
        codesDto.setDescriptoin("با کد دعوت زیر 2 نفر از دوستان خود را به جیم پین دعوت کنید");
        String inviteCode1 = "U"+GeneralHelper.getInviteCode(userEntity.getId(), 1);
        String inviteCode2 = "U"+GeneralHelper.getInviteCode(userEntity.getId(), 2);
        codesDto.setFirstInviteCode(
                InviteCode
                        .builder()
                        .code(inviteCode1)
                        .isActive(userRepository.findByInvitedBy(inviteCode1).isEmpty())
                        .build());
        codesDto.setSecondInviteCode(
                InviteCode
                        .builder()
                        .code(inviteCode2)
                        .isActive(userRepository.findByInvitedBy(inviteCode2).isEmpty())
                        .build());
        return codesDto;
    }

    private boolean checkInviteByGifts(String inviteCode) {
        ManageGiftCreditEntity giftCreditEntity = giftCreditRepository.getByCodeAndDeletedIsFalse(inviteCode);
        return false;
    }

}
