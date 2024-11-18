package com.notrika.gympin.persistence.dao.repository.authCodes;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.authCodes.UserActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserActivationCodeRepository extends BaseRepository<UserActivationCodeEntity, Long> {

    Optional<List<UserActivationCodeEntity>> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("update UserActivationCodeEntity a set a.deleted=1 where a.user.id=:#{#userId}")
    void expirationCode(Long userId);

    @Transactional
    @Modifying
    void deleteAllByUser(UserEntity user);

}
