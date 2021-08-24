package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.persistence.repository.UserRepository;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.dao.user.UserToken;
import com.notrika.gympin.domain.user.jwt.JwtTokenProvider;
import com.notrika.gympin.domain.util.convertor.AdministratorConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private SmsService smsService;

    @Override
    public boolean sendActivationSms(UserSendSmsParam dto) throws ExceptionBase {
        User user = userRepository.findByPhoneNumber(dto.getPhoneNumber()).orElse(null);
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
            User insertedUser = UserConvertor.userRegisterDtoToUser(saveOrUpdateUser(dto));
            return UserConvertor.userToRegisterDto(insertedUser);
        } catch (DataIntegrityViolationException e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.REGISTER_USER_EXIST);
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
    }

    @Override
    public UserDto loginUser(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = UserConvertor.userDtoToUser(findByUsername(authenticationToken.getName()));
        UserDto userDto = UserConvertor.userToUserDto(user);
        UserToken userToken = tokenProvider.generateToken(user, authenticationToken);
        userDto.setToken(userToken.getToken());
        return userDto;

    }

    @Override
    public AdministratorLoginDto loginPanel(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        Administrator admin = administratorRepository.findByAdministratorname(authenticationToken.getName()).orElse(null);
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

    private UserRegisterDto saveOrUpdateUser(UserRegisterParam userRegisterParam) {
        User user = new User();
        user.setUsername(userRegisterParam.getUsername());
        user.setPhoneNumber(userRegisterParam.getPhoneNumber());
        return UserConvertor.userToRegisterDto(userRepository.save(user));
    }


    private UserDto findByUsername(String username) {
        return UserConvertor.userToUserDto(userRepository.findByUsername(username).orElse(null));
    }


    private List<UserDto> findAllUsers() {
        List<UserDto> userDtos = new ArrayList<>();
        userDtos.add(UserConvertor.userToUserDto(userRepository.findAll().get(0)));
        return userDtos;
    }


    private Long numberOfUsers() {
        return userRepository.count();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User TBLUser = userRepository.findByPhoneNumber(username).orElse(null);
        Administrator admin = administratorRepository.findByAdministratorname(username).orElse(null);
        if (TBLUser == null && admin == null) {
            throw new UsernameNotFoundException(username);
        } else if (TBLUser != null) {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(TBLUser.getUserRoles().name()));
            var activationCode = smsService.getLastCode(TBLUser.getId());
            if (activationCode == null) {
                throw new UsernameNotFoundException(username + ", sms code not found");
            }
            return new org.springframework.security.core.userdetails.User(
                    TBLUser.getUsername(),
                    activationCode,
                    grantedAuthorities
            );
        } else {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(admin.getAdministratorRoles().name()));

            return new org.springframework.security.core.userdetails.User(
                    admin.getAdministratorname(),
                    admin.getPassword(),
                    grantedAuthorities
            );
        }
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
