package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelCategoryEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelCreditEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporatePersonnelCategoryRepository extends BaseRepository<CorporatePersonnelCategoryEntity, Long> {
    List<CorporatePersonnelCategoryEntity> findByCorporateIdAndDeletedIsFalse(Long corporateId);
}
