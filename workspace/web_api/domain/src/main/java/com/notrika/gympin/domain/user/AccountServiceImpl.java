package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.domain.user.jwt.JwtTokenProvider;
import com.notrika.gympin.domain.util.convertor.AdministratorConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.entity.administrator.Administrator;
import com.notrika.gympin.persistence.entity.user.User;
import com.notrika.gympin.persistence.entity.user.UserToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AccountServiceImpl implements AccountService {

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
        return userService.addUser(user);
    }

    @Override
    public UserDto loginUser(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User user = findByUsername(authenticationToken.getName());
        UserToken userToken = tokenProvider.generateToken(user, authenticationToken);
        UserDto userDto = UserConvertor.userToUserDto(user);
        userDto.setToken(userToken.getToken());
        return userDto;

    }

    @Override
    public AdministratorLoginDto loginPanel(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
//        User userByPhoneNumber = userService.findUserByPhoneNumber(authenticationToken.getName());
        Administrator admin = (Administrator) authenticationToken.getPrincipal();// administratorService.getAdministratorByBaseUser(userByPhoneNumber);
        if (admin == null) {
            throw new ExceptionBase(HttpStatus.UNAUTHORIZED, Error.ErrorType.CLIENT_AUTH_NOT_SETUP);
            // return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.Client_Auth_Not_Setup)), HttpStatus.UNAUTHORIZED);
        }
        AdministratorLoginDto result = AdministratorConvertor.administratorToAdministratorLoginDto(admin);
        UserToken userToken = tokenProvider.generateToken(admin, authenticationToken);
        result.setToken(userToken.getToken());
        return result;
        //return new ResponseEntity<>(new ResponseModel(result), HttpStatus.CREATED);
    }

    private User findByUsername(String username) {
        return userService.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByPhoneNumber(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        if (user.getUserGroup().equals(UserGroup.CLIENT)) {
            //String activationCode = smsService.getLastCode(user.getId());
            if (user.getPassword() == null) {
                throw new UsernameNotFoundException(username + ", sms code not found");
            }
            return user;
        } else {
            return administratorService.getAdministratorByBaseUser(user);
        }


        //        User user = userRepository.findByPhoneNumber(username);
        //        Administrator admin = administratorRepository.findByAdministratorName(username);
        //        if (user == null && admin == null) {
        //            throw new UsernameNotFoundException(username);
        //        } else if (user != null) {
        //            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        //            grantedAuthorities.add(new SimpleGrantedAuthority(user.getUserRole().name()));
        //            var activationCode = smsService.getLastCode(user.getId());
        //            if (activationCode == null) {
        //                throw new UsernameNotFoundException(username + ", sms code not found");
        //            }
        //            return new org.springframework.security.core.userdetails.User(
        //                    user.getUsername(),
        //                    activationCode,
        //                    grantedAuthorities
        //            );
        //        } else {
        //            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        //            grantedAuthorities.add(new SimpleGrantedAuthority(admin.getBaseUser().getUserRole().name()));
        //
        //            return new org.springframework.security.core.userdetails.User(
        //                    admin.getAdministratorName(),
        //                    admin.getPassword(),
        //                    grantedAuthorities
        //            );
        //        }
    }


    private void setToken(User user,Principal principal){

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
