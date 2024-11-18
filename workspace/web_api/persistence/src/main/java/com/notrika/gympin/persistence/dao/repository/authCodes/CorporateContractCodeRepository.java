package com.notrika.gympin.persistence.dao.repository.authCodes;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.authCodes.CorporateContractCodeEntity;
import com.notrika.gympin.persistence.entity.authCodes.PlaceContractCodeEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CorporateContractCodeRepository extends BaseRepository<CorporateContractCodeEntity, Long> {

    Optional<List<CorporateContractCodeEntity>> findByCorporateId(Long corporateId);

    @Transactional
    @Modifying
    @Query("update CorporateContractCodeEntity a set a.deleted=1 where a.corporate.id=:#{#corporateId}")
    void expirationCode(Long corporateId);

    @Transactional
    @Modifying
    void deleteAllByCorporate(CorporateEntity corporate);

}
