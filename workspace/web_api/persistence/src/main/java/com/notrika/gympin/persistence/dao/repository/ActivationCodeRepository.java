package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.activationCode.ActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivationCodeRepository extends BaseRepository<ActivationCodeEntity, Long> {

    Optional<List<ActivationCodeEntity>> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("update ActivationCodeEntity a set a.deleted=1 where a.user.id=:#{#userId}")
    void expirationCode(Long userId);

    @Transactional
    @Modifying
    void deleteAllByUser(UserEntity user);

}
