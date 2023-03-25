package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportSettingRepository extends BaseRepository<ReportSettingsEntity, Long> {

    ReportSettingsEntity getFirstByKey(String key);

}
