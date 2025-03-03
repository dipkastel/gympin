package com.notrika.gympin.persistence.dao.repository.corporate;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporatePersonnelRepository extends BaseRepository<CorporatePersonnelEntity, Long> {

    CorporatePersonnelEntity findByUserIdAndCorporateIdAndDeletedIsFalse(Long userId,Long corporateId);
    List<CorporatePersonnelEntity> findByCorporateIdAndDeletedIsFalse(Long corporateId);
    List<CorporatePersonnelEntity> findByCorporateIdAndPersonnelGroupIdAndDeletedIsFalse(Long CorporateId,Long GroupId);
    List<CorporatePersonnelEntity> findByUserIdAndDeletedIsFalse(Long userId);
    List<CorporatePersonnelEntity> findByUserIdAndRoleAndDeletedIsFalse(Long userId, CorporatePersonnelRoleEnum userRole);
    List<CorporatePersonnelEntity> findAllByIdIn(List<Long> ids);
}
