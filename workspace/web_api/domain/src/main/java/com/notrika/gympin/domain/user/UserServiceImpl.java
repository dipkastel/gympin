package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.PhoneNumberNotRegisterdException;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.common.util.MyRandom;
import com.notrika.gympin.dao.activationCode.ActivationCode;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.dao.repository.AdministratorRepository;
import com.notrika.gympin.dao.repository.UserRepository;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.user.jwt.JwtTokenProvider;
import com.notrika.gympin.domain.util.convertor.AdministratorConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
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
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private SmsService smsService;


    private UserRegisterDto saveOrUpdateUser(UserRegisterParam userRegisterParam) {
        User user = new User();
        user.setUsername(userRegisterParam.getUsername());
        user.setPhoneNumber(passwordEncoder.encode(userRegisterParam.getPhoneNumber()));
        return UserConvertor.userToRegisterDto(userRepository.save(user));
    }


    private void deleteUser(int userId) {
        userRepository.deleteById(userId);
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
        User TBLUser = userRepository.findByUsername(username).orElse(null);
        Administrator admin = administratorRepository.findByAdministratorname(username).orElse(null);
        if (TBLUser == null && admin == null) {
            throw new UsernameNotFoundException(username);
        } else if (TBLUser != null) {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(TBLUser.getUserRoles().name()));
            //
            ActivationCode activationCode = activationCodeRepository.findByUserId(TBLUser.getId()).orElse(null);
            if (activationCode == null) {
                throw new UsernameNotFoundException(username + ", sms code not found");
            }
            return new org.springframework.security.core.userdetails.User(
                    TBLUser.getUsername(),
                    activationCode.getCode(),
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


    @Override
    public boolean  sendActivationSms(String PhoneNumber) throws PhoneNumberNotRegisterdException {
        User user =userRepository.findByUsername(PhoneNumber).orElse(null);
        if(user==null) throw new PhoneNumberNotRegisterdException();
        String code = MyRandom.GenerateRandomVerificationSmsCode();
        ActivationCode activationCode = new ActivationCode(user.getId(),PhoneNumber,code);
        activationCodeRepository.save(activationCode);
        //TODO check for last sms time > 2 min
        return smsService.sendSms(new SmsDto(PhoneNumber, SmsTypes.CODE_TO_VERIFICATION,code));
    }

    public UserRegisterDto register(UserRegisterParam dto) throws ExceptionBase {
        try {
            User insertedUser = UserConvertor.userRegisterDtoToUser(saveOrUpdateUser(dto));
            return UserConvertor.userToRegisterDto(insertedUser);
        } catch (DataIntegrityViolationException e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.REGISTER_USER_EXIST);
        } catch (Exception e) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, Error.ErrorType.Exception);
        }
    }


    public UserDto getUser(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = UserConvertor.userDtoToUser(findByUsername(authenticationToken.getName()));
        UserDto userDto = UserConvertor.userToUserDto(user);
        userDto.setToken(tokenProvider.generateToken(authenticationToken));
        return userDto;

    }

    //@PostMapping("/sendsms")
//    public ResponseEntity sendsms(User_send_sms_dto dto) {
//        smsManager.sendSms(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION,"1488");
//        return new ResponseEntity<>(new ResponseModel(HttpStatus.OK), HttpStatus.OK);
//    }


    public String activeUserViaSms(String code) {
        return "nist";
    }

    @Override
    public AdministratorLoginDto loginPanel(Principal principal) throws ExceptionBase {
        if (principal == null) {
            throw new ExceptionBase(HttpStatus.NOT_FOUND, Error.ErrorType.USER_NOT_FOUND);
        }

        /*if(principal == null){
            return ResponseEntity.ok(principal);
        }*/
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        Administrator admin = administratorRepository.findByAdministratorname(authenticationToken.getName()).orElse(null);
        if (admin == null) {
            throw new ExceptionBase(HttpStatus.UNAUTHORIZED, Error.ErrorType.Client_Auth_Not_Setup);

            // return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.Client_Auth_Not_Setup)), HttpStatus.UNAUTHORIZED);
        }
        AdministratorLoginDto result = AdministratorConvertor.administratorToAdministratorLoginDto(admin);
        result.setToken(tokenProvider.generateToken(authenticationToken));
        return result;
        //return new ResponseEntity<>(new ResponseModel(result), HttpStatus.CREATED);
    }

    @Override
    public AdministratorLoginDto activeUserViaSms(Principal principal) throws ExceptionBase {
        return null;
    }

}
