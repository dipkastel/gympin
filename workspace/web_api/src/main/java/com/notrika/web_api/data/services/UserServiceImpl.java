package com.notrika.web_api.data.services;

import com.notrika.web_api.data.Entity.User;
import com.notrika.web_api.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

	//It will be provided on WebSecurityConfig as @Bean
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User saveUser(final User TBLUser){
        TBLUser.setPhoneNumber(passwordEncoder.encode(TBLUser.getPhoneNumber()));
        return userRepository.save(TBLUser);
    }

    //save = create or update
    @Override
    public User updateUser(final User TBLUser){
        return userRepository.save(TBLUser);
    }

    @Override
    public void deleteUser(final int userId){
        userRepository.deleteById(userId);
    }

    @Override
    public User findByUsername(final String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public Long numberOfUsers(){
        return userRepository.count();
    }

}
