package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.settings.ManageReportSettingsEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageReportSettingRepository extends BaseRepository<ManageReportSettingsEntity, Long> {

    ManageReportSettingsEntity getFirstByKey(String key);

}
