package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
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
import com.notrika.gympin.dao.activationCode.ActivationCode;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.AdministratorConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.ActivationCodeRepository;
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

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        User user = userService.findUserByPhoneNumber(dto.getPhoneNumber());
        if (user == null) throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_NOT_FOUND);

        String code = MyRandom.GenerateRandomVerificationSmsCode();

        //TODO check for last sms time > 2 min
        try {
            return smsService.sendVerificationSms(user.getId(), new SmsDto(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION, code));
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
    }

    @Override
    public UserRegisterDto register(UserRegisterParam dto) throws ExceptionBase {
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
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        String phoneNumber = getPhoneNumber(loginParam);
        String jwt = getJwt(loginParam, loginParam.getUsername());
        User user = userService.findUserByPhoneNumber(phoneNumber);
        UserDto result = UserConvertor.userToUserDto(user);
        result.setToken(jwt);
        activationCodeRepository.deleteById2((ActivationCode) GympinContextHolder.getContext().getEntry().get("AC"));
        return result;
    }

    private String getPhoneNumber(LoginParam loginParam) {
        String phoneNumber=null;
        switch (loginParam.getUsernameType()) {
            case PHONENUMBER:
                phoneNumber= loginParam.getUsername();
                break;
            case USERNAME:
                phoneNumber= userService.findByUsername(loginParam.getUsername()).getPhoneNumber();
                break;
            case EMAIL:
                phoneNumber= administratorService.findByEmail(loginParam.getUsername()).getBaseUser().getPhoneNumber();
                break;
        }
        return phoneNumber;
    }

    @Override
    public AdministratorLoginDto loginPanel(LoginParam loginParam) throws ExceptionBase {
        if (loginParam == null || loginParam.getUsername() == null || loginParam.getPassword() == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        String phoneNumber = getPhoneNumber(loginParam);
        String jwt = getJwt(loginParam, phoneNumber);
        Administrator admin = administratorService.findByPhoneNumber(phoneNumber);
        AdministratorLoginDto result = AdministratorConvertor.administratorToAdministratorLoginDto(admin);
        result.setToken(jwt);
        return result;
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
        if (user.getUserGroup().equals(UserGroup.CLIENT)) {
            List<ActivationCode> collect = user.getActivationCodes().stream().filter(c -> !c.isDeleted()).collect(Collectors.toList());
            if (collect.size() != 1) throw new ExceptionBase();
            GympinContextHolder.getContext().getEntry().put("AC",collect.get(0));
            password = collect.get(0).getCode();
        } else if (user.getUserGroup().equals(UserGroup.ADMINISTRATION)) {
            password=administratorService.findByPhoneNumber(phoneNumber).getPassword();
        }
        return new UserDetailsImpl(userRoles,password,phoneNumber,accountNonExpired,accountNonLocked,credentialsNonExpired,enabled);
    }


    private void setToken(User user, Principal principal) {

    }


    //@PostMapping("/sendsms")
    //    public ResponseEntity sendsms(User_send_sms_dto dto) {
    //        smsManager.sendSms(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION,"1488");
    //        return new ResponseEntity<>(new ResponseModel(HttpStatus.OK), HttpStatus.OK);
    //    }


    public String activeUserViaSms(String code) {
        return "nist";
    }


}
