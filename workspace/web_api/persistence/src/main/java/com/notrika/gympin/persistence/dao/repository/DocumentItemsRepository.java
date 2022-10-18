package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
import com.notrika.gympin.persistence.entity.accounting.DocumentEntity;
import com.notrika.gympin.persistence.entity.accounting.DocumentItemsEntity;
import com.notrika.gympin.persistence.result.SemiOverallTransactionResult;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentItemsRepository extends BaseRepository<DocumentItemsEntity,Long> {

    List<DocumentItemsEntity> findDocumentItemsEntitiesByAccount_AuditableEntityAndDeletedIsFalse(AuditableEntitiesEntity entitiesEntity);

    @Query("select new com.notrika.gympin.persistence.result.SemiOverallTransactionResult(dei.account.id,'tt',sum(dei.amount)) from DocumentItemsEntity dei group by dei.account.auditableEntity.id having dei.account.auditableEntity.id=:#{#entitiesEntity.id}")
    List<SemiOverallTransactionResult> t(AuditableEntitiesEntity entitiesEntity);

    @Query("select d.document from DocumentItemsEntity d where d.account.auditableEntity=:#{#entitiesEntity.id}")
    List<DocumentEntity> find(AuditableEntitiesEntity entitiesEntity);

}
