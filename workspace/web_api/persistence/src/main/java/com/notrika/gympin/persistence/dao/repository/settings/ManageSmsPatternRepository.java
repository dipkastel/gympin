package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageSmsPatternRepository extends BaseRepository<ManageSmsPatternEntity, Long> {

    ManageSmsPatternEntity findByPatternKeyAndDeletedFalse(String key);

    @Query("select p.id from ManageSmsPatternEntity p where p.patternKey = :key and p.deleted = false")
    Long findIdByPatternKeyAndDeletedFalse(@Param("key") String key);

}
