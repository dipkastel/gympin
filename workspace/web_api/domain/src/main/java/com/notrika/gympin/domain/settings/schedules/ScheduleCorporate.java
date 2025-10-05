package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.domain.settings.sms.SmsInServiceImpl;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleCorporate {

    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private SmsInServiceImpl smsService;
    @Autowired
    private SettingsService settingsService;


    @Transactional
    public void checkLowBudgetsSms() {
        List<CorporateEntity> corporateEntities = corporateRepository.findAllByDeletedIsFalseAndStatus(CorporateStatusEnum.LOW_BUDGET);

        SettingDto canSend = settingsService.getByKey("SMS_LOWBUDGET_TO_CORPORATE");
        if(canSend==null&& !canSend.getValue().equals("1")){
            return;
        }
        for (CorporateEntity corporateEntity : corporateEntities) {
            try {
                List<CorporatePersonnelEntity> owners = corporateEntity.getPersonnel().stream().filter(o->!o.isDeleted()).filter(p->p.getRole()== CorporatePersonnelRoleEnum.ADMIN).collect(Collectors.toList());

                for (CorporatePersonnelEntity owner : owners) {
                    smsService.sendLowBudgetToCorporate(new SmsDto(owner.getUser().getPhoneNumber(), SmsTypes.CORPORATE_LOW_BUDGET,corporateEntity.getName()));
                }
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    public void checkExpirePersonnelCredit() {


    }
}
