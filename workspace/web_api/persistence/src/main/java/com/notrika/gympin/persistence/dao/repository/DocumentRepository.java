package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.accounting.DocumentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends BaseRepository<DocumentEntity,Long> {

    @Query("select max(d.documentNumber) from DocumentEntity d")
    Long findMaxDocNum();

}
