package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    //@Query("select u from User u,PlaceOwner po where u.id=po.user.id and po.place.id=:#{#place.id}")
    List<User> getOwnersPlace(Place place);

    //findBy + fieldName
    User findByUsername(String username);

    User findByPhoneNumber(String phoneNumber);


}
