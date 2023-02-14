package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporateRepository extends BaseRepository<CorporateEntity, Long> {

    @Query("select c from CorporateEntity c,CorporatePersonnelEntity cp where c.id=cp.corporate.id and cp.deleted = 0 and cp.user.id = :#{#userId} ")
    List<CorporateEntity> findByUserId(Long userId);
}
