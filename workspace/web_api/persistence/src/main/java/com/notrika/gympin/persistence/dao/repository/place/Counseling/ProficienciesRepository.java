package com.notrika.gympin.persistence.dao.repository.place.Counseling;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.Counseling.ProficienciesEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProficienciesRepository extends BaseRepository<ProficienciesEntity, Long> {

}
