package com.notrika.web_api.data.repository;

import com.notrika.web_api.data.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    //findBy + fieldName
    Optional<User> findByUsername(String username);
}
