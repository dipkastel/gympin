package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceAboutRepository extends BaseRepository<PlaceAboutEntity, Long> {

    @Query("select a from PlaceAboutEntity a where a.place.id=:#{#id} and a.deleted=false ")
    List<PlaceAboutEntity> findByPlaceId(Long id);
}
