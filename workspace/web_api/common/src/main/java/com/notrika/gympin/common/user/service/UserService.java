package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;

public interface UserService extends UserDetailsService {

/*    UserRegisterDto saveOrUpdateUser(UserRegisterDto TBLUser);

    void deleteUser(int userId);

    UserDto findByUsername(String username);

    List<UserDto> findAllUsers();

    Long numberOfUsers();

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;*/

    ResponseEntity<?> register( UserRegisterDto dto);

    ResponseEntity<?> getUser(Principal principal);

    ResponseEntity<?> activeUserViaSms(String code);
}
