package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporatePersonnelRepository extends BaseRepository<CorporatePersonnelEntity, Long> {

    List<CorporatePersonnelEntity> findByCorporateAndDeletedIsFalse(CorporateEntity entity);
    List<CorporatePersonnelEntity> findByUserIdAndDeletedIsFalse(Long userId);
}
