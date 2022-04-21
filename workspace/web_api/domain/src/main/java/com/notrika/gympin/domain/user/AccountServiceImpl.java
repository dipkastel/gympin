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
import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.TokenType;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.common.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.dao.repository.RoleRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
import com.notrika.gympin.persistence.entity.user.Role;
import com.notrika.gympin.persistence.entity.user.User;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private AdministratorServiceImpl administratorService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private SmsService smsService;
    @Autowired
    private ActivationCodeRepository activationCodeRepository;
    @Autowired
    private PasswordRepository passwordRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        log.info("Going to send activation sms...\n");
        User user = userService.findUserByPhoneNumber(dto.getPhoneNumber());
        if (user == null) throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_NOT_FOUND);
        String code = MyRandom.GenerateRandomVerificationSmsCode();
        if (user.getActivationCode() != null && user.getActivationCode().getExpiredDate() != null && user.getActivationCode().getExpiredDate().after(new Date())) {
            throw new ActivationCodeManyRequestException();
        }
        try {
            return smsService.sendVerificationSms(user.getId(), new SmsDto(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION, code));
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.OUT_SERVICE_EXCEPTION);
        }
    }

    @Override
    public UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase {
        log.info("Going to register user...\n");
        try {
            User insertedUser = addUser(userRegisterParam);
            return UserConvertor.userToRegisterDto(insertedUser);
        } catch (DataIntegrityViolationException e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.REGISTER_USER_EXIST);
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
    }

    private User addUser(UserRegisterParam userRegisterParam) {
        List<Role> roleList = new ArrayList<>();
        for (UserRoleParam userRole : userRegisterParam.getUserRole()) {
            roleList.add(roleRepository.getByRole(userRole.getRole()));
        }
        User user = new User();
        user.setUsername(userRegisterParam.getUsername());
        user.setPhoneNumber(userRegisterParam.getPhoneNumber());
        user.setUserRole(roleList);
        user.setUserGroup(UserGroup.CLIENT);
        user.setUserStatus(UserStatus.ENABLED);
        return userService.add(user);
    }

    @Transactional
    @Override
    public UserDto loginUser(LoginParam loginParam) throws ExceptionBase {
        log.info("Going to loginUser...\n");
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        String phoneNumber = getPhoneNumber(loginParam);
        User user = userService.findUserByPhoneNumber(phoneNumber);
        ActivationCode activationCode = user.getActivationCode();
        if (activationCode == null) {
            throw new ActivationCodeNotFoundException();
        }
        if (activationCode.isDeleted()) {
            throw new ActivationCodeExpiredException();
        }
        activationCode.setDeleted(true);
        activationCodeRepository.update(activationCode);
        String jwt = getJwt(loginParam, loginParam.getUsername(), TokenType.USER);
        String refreshJwt = getJwt(loginParam, loginParam.getUsername(), TokenType.REFRESH_TOKE);
        UserDto result = UserConvertor.userToUserDtoLessDetails(user);
        result.setToken(jwt);
        result.setRefreshToken(refreshJwt);
        log.info("user logined {}...\n", result);
        return result;
    }

    @Override
    public UserDto loginPanel(LoginParam loginParam) throws ExceptionBase {
        log.info("Going to loginPanel...\n");
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        String phoneNumber = getPhoneNumber(loginParam);
        User admin = userService.findUserByPhoneNumber(phoneNumber);
        ActivationCode activationCode = admin.getActivationCode();
        if (activationCode != null) {
            activationCode.setDeleted(true);
            activationCodeRepository.update(activationCode);
        }
        String jwt = getJwt(loginParam, phoneNumber, TokenType.ADMIN);
        String refreshJwt = getJwt(loginParam, loginParam.getUsername(), TokenType.REFRESH_TOKE);
        UserDto result = UserConvertor.administratorToAdministratorDto(admin);
        result.setToken(jwt);
        result.setRefreshToken(refreshJwt);
        log.info("Admin loggined {}...\n", result);
        return result;
    }

    private String getPhoneNumber(LoginParam loginParam) {
        String phoneNumber = null;
        switch (loginParam.getUsernameType()) {
            case PHONENUMBER:
                phoneNumber = loginParam.getUsername();
                break;
            case USERNAME:
                phoneNumber = userService.findByUsername(loginParam.getUsername()).getPhoneNumber();
                break;
            case EMAIL:
                phoneNumber = userService.findByEmail(loginParam.getUsername()).getPhoneNumber();
                break;
        }
        return phoneNumber;
    }

    private String getJwt(LoginParam loginParam, String phoneNumber, TokenType tokenType) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phoneNumber, loginParam.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.generateJwtToken(authentication, tokenType);
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        log.info("Going to loadUserByUsername ...\n");
        User user = userService.findUserByPhoneNumber(phoneNumber);
        if (user == null) {
            throw new UsernameNotFoundException(phoneNumber);
        }
        ArrayList<Role> userRoles = new ArrayList<>(user.getUserRole());
        boolean accountNonExpired = !user.isDeleted();
        boolean accountNonLocked = !(user.getUserStatus() == UserStatus.LOCKED);
        boolean credentialsNonExpired = true;
        boolean enabled = user.getUserStatus() == UserStatus.ENABLED;
        String password = null;
        if (user.getActivationCode() != null) {
            password = user.getActivationCode().getCode();
        }
        if (password == null) {
            password = passwordRepository.findByUserAndExpiredIsAndDeletedIs(user, false, false).getPassword();
        }
        if (password == null) {
            throw new ExceptionBase();
        }
        setUserContext(user);
        ArrayList<UserRole> roles = new ArrayList<>();
        for (Role userRole : userRoles) {
            roles.add(userRole.getRole());
        }
        UserDetailsImpl userDetails = new UserDetailsImpl(roles, password, phoneNumber, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
        log.info("User loaded: {}", userDetails);
        return userDetails;
    }

    @Override
    public String refreshToken(String refreshToken) {
        if (StringUtils.hasText(refreshToken) && tokenProvider.validateToken(refreshToken)) {
            return tokenProvider.refreshToken(refreshToken);
        } else {
            throw new ExceptionBase();
        }
    }

    private void setUserContext(User user) {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null) {
            context = new GympinContext();
        }
        context.getEntry().put(GympinContext.USER_KEY, user);
        GympinContextHolder.setContext(context);
    }

}
