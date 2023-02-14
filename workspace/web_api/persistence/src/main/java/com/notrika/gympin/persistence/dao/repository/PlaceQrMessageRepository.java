package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceQrMessageRepository extends BaseRepository<PlaceQrMessageEntity, Long> {

    List<PlaceQrMessageEntity> findAllByPlaceIdAndDeletedFalse(Long id);
}
