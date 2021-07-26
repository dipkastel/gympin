package com.notrika.web_api.data.services;

import com.notrika.web_api.data.Entity.User;

import java.util.List;

public interface UserService {
    User saveUser(User TBLUser);

    User updateUser(User TBLUser);

    void deleteUser(int userId);

    User findByUsername(String username);

    List<User> findAllUsers();

    Long numberOfUsers();
}
