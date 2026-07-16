package com.notrika.gympin.persistence.dao.repository.place.Counseling;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingProficienciesEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymSportEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CounselingProficienciesRepository extends BaseRepository<CounselingProficienciesEntity, Long> {

    @Query("select cp from ProficienciesEntity pr,CounselingProficienciesEntity cp where pr.id=cp.proficiencies.id and cp.counseling.id=:counselingId and cp.deleted = false")
    List<CounselingProficienciesEntity> getProficienciesByCounseling(Long counselingId);
}
