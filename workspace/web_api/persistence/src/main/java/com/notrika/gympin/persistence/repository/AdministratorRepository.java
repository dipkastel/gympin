package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.administrator.Administrator;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends BaseRepository<Administrator, Long> {

    //findBy + fieldName
    Administrator findByAdministratorName(String username);
}
