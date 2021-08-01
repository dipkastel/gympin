package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.user.dto.UserRegisterDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;

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

    ResponseEntity<?> loginPanel(Principal principal);
}
