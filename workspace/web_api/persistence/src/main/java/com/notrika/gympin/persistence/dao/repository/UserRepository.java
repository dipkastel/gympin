package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    //@Query("select u from User u,PlaceOwner po where u.id=po.user.id and po.place.id=:#{#place.id}")
    List<User> getOwnersPlace(Place place);

    User findByPhoneNumberAndUsernameAndEmail(String phoneNumber, String username, String email);

    User findByPhoneNumberAndUsername(String phoneNumber, String username);

    User findByPhoneNumberAndEmail(String phoneNumber, String email);

    User findByUsernameAndEmail(String username, String email);

    User findByPhoneNumber(String phoneNumber);

    User findByUsername(String username);

    User findByEmail(String email);

}
