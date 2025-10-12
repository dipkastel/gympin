package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

public interface FinanceCorporatePersonnelCreditRepository extends BaseRepository<FinanceCorporatePersonnelCreditEntity, Long> {


    @Query("SELECT SUM(a.creditAmount) FROM FinanceCorporatePersonnelCreditEntity a where a.corporatePersonnel.user.id = :#{#userId} and a.status = 'ACTIVE' and a.corporatePersonnel.deleted!=1 ")
    BigDecimal getUserTotalCredit(Long userId);



    @Query("SELECT a FROM FinanceCorporatePersonnelCreditEntity a where a.corporatePersonnel.user.id = :#{#userId} and a.status = 'ACTIVE'")
    List<FinanceCorporatePersonnelCreditEntity> getActiveUserCredits(Long userId);


    @Query("SELECT fcpce FROM FinanceCorporatePersonnelCreditEntity fcpce " +
            "where fcpce.corporatePersonnel.deleted = false " +
            "and fcpce.status = 'ACTIVE' " +
            "and fcpce.deleted = false " +
            "and fcpce.ExpireDate < current_date ")
    List<FinanceCorporatePersonnelCreditEntity> getExpireCredits();

}
