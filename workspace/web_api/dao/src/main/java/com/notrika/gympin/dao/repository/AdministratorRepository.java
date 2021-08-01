package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.administrator.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    //findBy + fieldName
    Optional<Administrator> findByAdministratorname(String username);
}
