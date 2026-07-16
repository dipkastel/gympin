package com.notrika.gympin.persistence.dao.repository.place.Counseling;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingEntity;
import com.notrika.gympin.persistence.entity.place.Counseling.ProficienciesEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.Gym.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounselingRepository extends BaseRepository<CounselingEntity, Long> {

    List<CounselingEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);

    List<CounselingEntity> findAllByDeletedIsFalseAndAutoDiscountIsTrue();

    List<CounselingEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    @Query("select c from CounselingEntity c,PlacePersonnelEntity pp where c.id=pp.place.id and pp.deleted = false and pp.user.id = :#{#userId} ")
    List<CounselingEntity> getCounselingByUser(Long userId);


    @Query("select c.proficiencies from CounselingEntity c where c.id=:id and c.deleted = false ")
    List<ProficienciesEntity> getProficienciesOfCounseling(Long id);

}
