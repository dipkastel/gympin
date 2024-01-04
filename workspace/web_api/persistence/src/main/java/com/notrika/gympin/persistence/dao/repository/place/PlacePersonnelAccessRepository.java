package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacePersonnelAccessRepository extends BaseRepository<PlacePersonnelAccessEntity, Long> {

}
