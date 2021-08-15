package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.user.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    //findBy + fieldName
    Optional<User> findByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

}
