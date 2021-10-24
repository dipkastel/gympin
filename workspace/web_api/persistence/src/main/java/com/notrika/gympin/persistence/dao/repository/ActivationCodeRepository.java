package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivationCodeRepository extends BaseRepository<ActivationCode, Long> {

    Optional<List<ActivationCode>> findByUserId(Long userId);

    @Transactional
    @Modifying
    //@Query("update ActivationCode a set a.deleted=1 where a.user.id=:#{#userId}")
    void expirationCode(Long userId);

    @Transactional
    @Modifying
    void deleteAllByUser(User user);

}
