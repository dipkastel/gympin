package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionSimpleDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ManageServiceExecutionRepository extends BaseRepository<ManageServiceExecutionEntity, Long> {
//
//    @Modifying
//    @Query("UPDATE ManageServiceExecutionEntity SET is_deleted=1 where id=:#{#id}")
//    void forceDelete(long i);



   @Query("SELECT m FROM ManageServiceExecutionEntity m WHERE m.id IN (SELECT MAX(n.id) FROM ManageServiceExecutionEntity n WHERE n.executorUser IS NOT NULL  AND n.executionDate > :#{#fromDate} AND n.executionDate < :#{#toDate} GROUP BY n.executorUser)  AND m.executionDate > :#{#fromDate} AND m.executionDate < :#{#toDate} ORDER BY m.executionDate DESC")
    List<ManageServiceExecutionEntity> getUsersActive(Date fromDate,Date toDate);

   @Query("SELECT new com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionSimpleDto(Max(m.id), m.executorUser ,max(m.createdDate) ,max(m.executionDate)) FROM ManageServiceExecutionEntity m WHERE m.executionDate BETWEEN :#{#fromDate} AND :#{#toDate} AND m.executorUser.id IS NOT NULL GROUP BY m.executorUser.id ORDER BY MAX(m.id) Desc")
   List<ManageServiceExecutionSimpleDto> getFastUsersActive(Date fromDate,Date toDate);

   @Query("SELECT  n.executorUser.id FROM ManageServiceExecutionEntity n JOIN CorporatePersonnelEntity cp on cp.user.id = n.executorUser.id  WHERE cp.corporate.id = :#{#corporateId} AND n.executorUser.id IS NOT NULL  AND n.executionDate > :#{#fromDate} GROUP BY n.executorUser.id")
    List<Long> getActiveUsersByCorporate(Date fromDate,Long corporateId);

}
