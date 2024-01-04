package com.notrika.gympin.persistence.dao.repository.support;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.List;

public interface SupportRepository extends BaseRepository<SupportEntity, Long> {
    List<SupportEntity> findAllByDeletedIsFalseAndPlace(PlaceEntity place);
    List<SupportEntity> findAllByDeletedIsFalseAndUser(UserEntity user);
    List<SupportEntity> findAllByDeletedIsFalseAndCorporate(CorporateEntity corporate);

}
