package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.activationCode.ActivationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivationCodeRepository extends JpaRepository<ActivationCode, Long> {

    Optional<List<ActivationCode>> findByUserId(Long userId);

}
