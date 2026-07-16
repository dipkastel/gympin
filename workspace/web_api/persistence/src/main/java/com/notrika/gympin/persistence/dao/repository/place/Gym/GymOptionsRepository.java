package com.notrika.gympin.persistence.dao.repository.place.Gym;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.Gym.OptionOfGymEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GymOptionsRepository extends BaseRepository<OptionOfGymEntity, Long> {


    @Query("select a from OptionOfGymEntity a where a.place.id=:#{#id} and a.deleted=false ")
    List<OptionOfGymEntity> getByPlaceId(Long id);
}
