package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageServiceExecutionRepository extends BaseRepository<ManageServiceExecutionEntity, Long> {
//
//    @Modifying
//    @Query("UPDATE ManageServiceExecutionEntity SET is_deleted=1 where id=:#{#id}")
//    void forceDelete(long i);

}
