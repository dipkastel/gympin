package com.notrika.gympin.persistence.dao.repository.corporate;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporatePersonnelGroupRepository extends BaseRepository<CorporatePersonnelGroupEntity, Long> {
    List<CorporatePersonnelGroupEntity> findByCorporateIdAndDeletedIsFalse(Long corporateId);
}
