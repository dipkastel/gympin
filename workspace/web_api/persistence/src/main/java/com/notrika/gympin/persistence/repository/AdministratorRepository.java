package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.administrator.Administrator;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends BaseRepository<Administrator, Integer> {

    //findBy + fieldName
    Optional<Administrator> findByAdministratorname(String username);
}
