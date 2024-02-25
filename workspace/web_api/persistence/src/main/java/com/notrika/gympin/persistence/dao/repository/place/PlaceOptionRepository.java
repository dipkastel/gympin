package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceOptionRepository extends BaseRepository<PlaceOptionEntity, Long> {
}