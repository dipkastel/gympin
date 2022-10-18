package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GateRepository extends BaseRepository<GateEntity, Long> {

    List<GateEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);

    List<GateEntity> findAllBySportAndDeletedIsFalse(SportEntity sport);

    List<GateEntity> findAllByOwnerAndDeletedIsFalse(UserEntity owner);

}
