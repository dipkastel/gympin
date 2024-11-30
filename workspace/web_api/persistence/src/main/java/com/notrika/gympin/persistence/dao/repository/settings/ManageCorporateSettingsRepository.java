package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.common.settings.corporateSettings.enums.CorporateSettingTypesEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.settings.CorporateSettingsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageCorporateSettingsRepository extends BaseRepository<CorporateSettingsEntity, Long> {

    List<CorporateSettingsEntity> findAllByDeletedIsFalseAndCorporateId(Long corporateId);

    List<CorporateSettingsEntity> findAllByDeletedIsFalseAndCorporateIdAndKey(Long corporateId, CorporateSettingTypesEnum key);
}
