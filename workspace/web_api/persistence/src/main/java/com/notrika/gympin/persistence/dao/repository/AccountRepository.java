package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends BaseRepository<AccountEntity,Long> {

    @Query("select max(a.serial) from AccountEntity a where a.auditableEntity=:#{#auditableEntity}")
    Long findMaxOfSerial(AuditableEntitiesEntity auditableEntity);

    AccountEntity findByAuditableEntityAndDeletedIsFalse(AuditableEntitiesEntity entitiesEntity);


}
