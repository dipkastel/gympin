package com.notrika.gympin.persistence.dao.repository.sport;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SportRepository extends BaseRepository<SportEntity, Long> {

    @Query("select count(s) from SportEntity s where s.deleted = 0")
    Long findFilterdCount(BaseQuery<?> filter);
}