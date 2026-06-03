package com.notrika.gympin.persistence.dao.repository.corporate;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CorporatePersonnelCreditRepository extends BaseRepository<FinanceCorporatePersonnelCreditEntity, Long> {

    @Query(value = "SELECT sum(creditAmount) FROM FinanceCorporatePersonnelCreditEntity  where status = :#{#status} and  corporatePersonnel.corporate.id = :#{#corporateId} and corporatePersonnel.deleted = false and deleted = false")
    Long getTotalCreditByCorporateId(Long corporateId, CorporatePersonnelCreditStatusEnum status);
}
