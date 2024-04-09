package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ManageSmsRepository extends BaseRepository<ManageSmsEntity, Long> {

    List<ManageSmsEntity> findAllByDeletedIsFalseAndSmsStatusAndSendTimeLessThan(SmsStatus smsStatus, Date date);

}
