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
}
