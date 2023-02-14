package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacePersonnelRepository extends BaseRepository<PlacePersonnelEntity, Long> {

        List<PlacePersonnelEntity> getAllByPlaceAndDeletedFalse(PlaceEntity place);
        List<PlacePersonnelEntity> findAllByUser(UserEntity user);
        PlacePersonnelEntity findByUserIdAndPlaceIdAndDeletedFalse(Long userId,Long placeId);

}
