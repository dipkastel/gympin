package com.notrika.gympin.persistence.dao.repository.place.hall;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallRepository extends BaseRepository<HallEntity, Long> {

    List<HallEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);

    List<HallEntity> findAllBySportAndDeletedIsFalse(SportEntity sport);

    List<HallEntity> findAllByOwnerAndDeletedIsFalse(UserEntity owner);

}
