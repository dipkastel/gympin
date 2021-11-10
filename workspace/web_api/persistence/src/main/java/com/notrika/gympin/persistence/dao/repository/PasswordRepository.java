package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.user.Password;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordRepository extends BaseRepository<Password,Long> {

    List<Password> findByUser(User user);

    Password findByUserAndExpiredIsAndDeletedIs(User user,boolean expired,boolean deleted);


}
