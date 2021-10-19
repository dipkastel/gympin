package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.activationCode.ActivationCode;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivationCodeRepository extends BaseRepository<ActivationCode, Long> {

    Optional<List<ActivationCode>> findByUserId(Long userId);

    @Query("update ActivationCode a set a.isDeleted=1 where a.user.id=:#{#state.id} ")
    void expirationCode(Long userId);

}
