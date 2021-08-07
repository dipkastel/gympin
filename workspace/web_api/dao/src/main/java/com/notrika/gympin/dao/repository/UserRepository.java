package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //findBy + fieldName
    Optional<User> findByUsername(String username);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
