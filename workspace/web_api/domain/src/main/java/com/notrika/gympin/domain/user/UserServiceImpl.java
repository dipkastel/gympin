package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.dao.ResponseModel;
import com.notrika.gympin.dao.repository.UserRepository;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.user.jwt.JwtTokenProvider;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;*/
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
/*
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
*/

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
    private PasswordEncoder passwordEncoder;

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
        if(TBLUser == null){
            throw new UsernameNotFoundException(username);
        }
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(TBLUser.getRole().name()));

        return new org.springframework.security.core.userdetails.User(
                TBLUser.getUsername(),
                TBLUser.getPhoneNumber(),
                grantedAuthorities
        );
    }


    public ResponseEntity<?> register(UserRegisterDto dto) {
        try {
            User insertedUser = UserConvertor.userRegisterDtoToUser(saveOrUpdateUser(dto));
            return new ResponseEntity<>(new ResponseModel(UserConvertor.userToUserDto(insertedUser)), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ResponseModel(new com.notrika.gympin.dao.Error(com.notrika.gympin.dao.Error.ErrorType.REGISTER_USER_EXIST,e)),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel(new com.notrika.gympin.dao.Error(com.notrika.gympin.dao.Error.ErrorType.Exception,e)), HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<?> getUser(Principal principal){
        if(principal == null){
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = UserConvertor.userDtoToUser(findByUsername(authenticationToken.getName()));
       // user.setToken(tokenProvider.generateToken(authenticationToken));
        String userToken = tokenProvider.generateToken(authenticationToken);

        return new ResponseEntity<>(new ResponseModel(userToken), HttpStatus.CREATED);
    }

    //@PostMapping("/sendsms")
//    public ResponseEntity sendsms(User_send_sms_dto dto) {
//        smsManager.sendSms(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION,"1488");
//        return new ResponseEntity<>(new ResponseModel(HttpStatus.OK), HttpStatus.OK);
//    }



    public ResponseEntity<?> activeUserViaSms(String code) {
        return new ResponseEntity<>("nist", HttpStatus.NOT_FOUND);
    }

}
