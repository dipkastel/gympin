package com.notrika.gympin.persistence.dao.repository.authCodes;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.authCodes.PlaceContractCodeEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceContractCodeRepository extends BaseRepository<PlaceContractCodeEntity, Long> {

    Optional<List<PlaceContractCodeEntity>> findByPlaceId(Long placeId);

    @Transactional
    @Modifying
    @Query("update PlaceContractCodeEntity a set a.deleted=1 where a.place.id=:#{#placeId}")
    void expirationCode(Long placeId);

    @Transactional
    @Modifying
    void deleteAllByPlace(PlaceGymEntity place);

}
