package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.rateAndComment.PlaceRateEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRateRepository extends BaseRepository<PlaceRateEntity, Long> {


    PlaceRateEntity findByDeletedIsFalseAndPlaceIdAndUserId(Long placeId, Long userId);
}
