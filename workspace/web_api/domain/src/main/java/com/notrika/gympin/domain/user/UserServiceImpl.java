package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.dao.ResponseModel;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.notrika.gympin.dao.Error;

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


    private UserRegisterDto saveOrUpdateUser(UserRegisterDto userRegisterDto) {
        userRegisterDto.setPhoneNumber(passwordEncoder.encode(userRegisterDto.getPhoneNumber()));
        return UserConvertor.userToRegisterDto(userRepository.save(UserConvertor.userRegisterDtoToUser(userRegisterDto)));
    }


    private void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }


    private UserDto findByUsername(String username) {
        return UserConvertor.userToUserDto(userRepository.findByUsername(username).orElse(null));
    }


    private List<UserDto> findAllUsers() {
        List<UserDto> userDtos=new ArrayList<>();
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
        if(TBLUser == null && admin == null){
            throw new UsernameNotFoundException(username);
        }else if(TBLUser != null){
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(TBLUser.getUserRoles().name()));
            //
            ActivationCode activationCode = activationCodeRepository.findByUserId(TBLUser.getId()).orElse(null);
            if(activationCode == null){
                throw new UsernameNotFoundException(username+", sms code not found");
            }
            return new org.springframework.security.core.userdetails.User(
                    TBLUser.getUsername(),
                    activationCode.getCode(),
                    grantedAuthorities
            );
        }else {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(admin.getAdministratorRoles().name()));

            return new org.springframework.security.core.userdetails.User(
                    admin.getAdministratorname(),
                    admin.getPassword(),
                    grantedAuthorities
            );
        }
    }


    public ResponseEntity<?> register(UserRegisterDto dto) {
        try {
            User insertedUser = UserConvertor.userRegisterDtoToUser(saveOrUpdateUser(dto));
            return new ResponseEntity<>(new ResponseModel(UserConvertor.userToUserDto(insertedUser)), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.REGISTER_USER_EXIST,e)),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.Exception,e)), HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<?> getUser(Principal principal){

        if(principal == null){
            return new ResponseEntity<>(new ResponseModel(principal), HttpStatus.NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = UserConvertor.userDtoToUser(findByUsername(authenticationToken.getName()));
        UserDto userDto = UserConvertor.userToUserDto(user);
        userDto.setToken(tokenProvider.generateToken(authenticationToken));

        return new ResponseEntity<>(new ResponseModel(userDto), HttpStatus.CREATED);

    }

    //@PostMapping("/sendsms")
//    public ResponseEntity sendsms(User_send_sms_dto dto) {
//        smsManager.sendSms(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION,"1488");
//        return new ResponseEntity<>(new ResponseModel(HttpStatus.OK), HttpStatus.OK);
//    }



    public ResponseEntity<?> activeUserViaSms(String code) {
        return new ResponseEntity<>("nist", HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<?> loginPanel(Principal principal) {

        if(principal == null){
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        Administrator admin = administratorRepository.findByAdministratorname(authenticationToken.getName()).orElse(null);
        if(admin==null){
            return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.Client_Auth_Not_Setup)), HttpStatus.UNAUTHORIZED);
        }
        AdministratorLoginDto result =  AdministratorConvertor.administratorToAdministratorLoginDto(admin);
        result.setToken(tokenProvider.generateToken(authenticationToken));

        return new ResponseEntity<>(new ResponseModel(result), HttpStatus.CREATED);
    }

}
