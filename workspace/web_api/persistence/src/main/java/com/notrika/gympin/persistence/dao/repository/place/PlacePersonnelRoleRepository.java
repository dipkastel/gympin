package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelRoleEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacePersonnelRoleRepository extends BaseRepository<PlacePersonnelRoleEntity, Long> {

}
