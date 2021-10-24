package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.activation.code.ActivationCodeExpiredException;
import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.common.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
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

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AuthenticationManager authenticationManager;
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

    @Override
    @Transactional
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        log.info("Going to send activation sms...\n");
        User user = userService.findUserByPhoneNumber(dto.getPhoneNumber());
        if (user == null) throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_NOT_FOUND);
        String code = MyRandom.GenerateRandomVerificationSmsCode();
//        if (user.getActivationCode().getExpiredDate() == null || user.getActivationCode().getExpiredDate().after(new Date())) throw new ActivationCodeExpiredException();
        try {
            return smsService.sendVerificationSms(user.getId(), new SmsDto(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION, code));
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.OUT_SERVICE_EXCEPTION);
        }
    }

    @Override
    public UserRegisterDto register(UserRegisterParam dto) throws ExceptionBase {
        log.info("Going to register user...\n");
        try {
            User insertedUser = addUser(dto);
            return UserConvertor.userToRegisterDto(insertedUser);
        } catch (DataIntegrityViolationException e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.REGISTER_USER_EXIST);
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
    }

    private User addUser(UserRegisterParam userRegisterParam) {
        User user = new User();
        user.setUsername(userRegisterParam.getUsername());
        user.setPhoneNumber(userRegisterParam.getPhoneNumber());
        user.setUserRole(userRegisterParam.getUserRole());
        user.setUserGroup(UserGroup.CLIENT);
        user.setUserStatus(UserStatus.ENABLED);
        return userService.addUser(user);
    }

    @Override
    public UserDto loginUser(LoginParam loginParam) throws ExceptionBase {
        log.info("Going to loginUser...\n");
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        String phoneNumber = getPhoneNumber(loginParam);
        String jwt = getJwt(loginParam, loginParam.getUsername());
        User user = userService.findUserByPhoneNumber(phoneNumber);
        ActivationCode activationCode = user.getActivationCode();
        activationCode.setDeleted(true);
        activationCodeRepository.update(activationCode);
        UserDto result = UserConvertor.userToUserDtoLessDetails(user);
        result.setToken(jwt);
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
        String jwt = getJwt(loginParam, phoneNumber);
        User admin = userService.findUserByPhoneNumber(phoneNumber);
        UserDto result = UserConvertor.administratorToAdministratorDto(admin);
        result.setToken(jwt);
        log.info("admin logined {}...\n", result);
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

    private String getJwt(LoginParam loginParam, String phoneNumber) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phoneNumber, loginParam.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.generateJwtToken(authentication);
    }

    private User findByUsername(String username) {
        return userService.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        log.info("Going to loadUserByUsername ...\n");
        User user = userService.findUserByPhoneNumber(phoneNumber);
        if (user == null) {
            throw new UsernameNotFoundException(phoneNumber);
        }
        ArrayList<UserRole> userRoles = new ArrayList<>();
        userRoles.add(user.getUserRole());
        boolean accountNonExpired = !user.isDeleted();
        boolean accountNonLocked = !(user.getUserStatus() == UserStatus.LOCKED);
        boolean credentialsNonExpired = true;
        boolean enabled = user.getUserStatus() == UserStatus.ENABLED;
        String password = null;
        if (user.getActivationCode() != null) password = user.getActivationCode().getCode();
        if (password == null) {
            password = Objects.requireNonNull(user.getPassword().stream().filter(c -> !c.isExpired() && !c.isDeleted()).findAny().orElse(null)).getPassword();
        }
        if (password == null) throw new ExceptionBase();
        setUserContext(user);
        UserDetailsImpl userDetails = new UserDetailsImpl(userRoles, password, phoneNumber, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
        log.info("User loaded: {}", userDetails);
        return userDetails;
    }

    private void setUserContext(User user) {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null) {
            context = new GympinContext();
        }
        context.getEntry().put(GympinContext.USER_KEY, user);
    }

}
