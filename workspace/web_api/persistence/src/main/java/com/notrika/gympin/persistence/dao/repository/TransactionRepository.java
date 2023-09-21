package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends BaseRepository<TransactionEntity, Long> {


    List<TransactionEntity> findAllByPlaceIdAndDeletedFalse(Long placeId);
    List<TransactionEntity> findAllByUserIdAndDeletedFalse(Long userId);
    List<TransactionEntity> findAllByCorporateIdAndDeletedFalse(Long corporateId);
    List<TransactionEntity> findAllByCorporatePersonnelIdAndDeletedIsFalse(Long personnelId);
    List<TransactionEntity> findAllBySerialAndDeletedFalse(String serial);

    @Query("select sum (t.amount) from TransactionEntity t where t.corporate.id=:#{#corporateId}")
    BigDecimal getCorporateTotalDeposit(Long corporateId);

    @Query("select sum (t.amount) from TransactionEntity t where t.user.id=:#{#id}")
    BigDecimal getUserTotalDeposit(Long id);


    @Query(value = "SELECT tr1.* FROM `transaction` as tr1 RIGHT JOIN (SELECT MAX(Id) as Id, count(*) as count FROM `transaction` WHERE type = \"CHARGE_USER\" AND bank_pend = 1 GROUP BY serial) as tr2 ON tr1.Id = tr2.Id WHERE tr2.count <2",nativeQuery = true)
    List<TransactionEntity> findPendingRequests();
}
