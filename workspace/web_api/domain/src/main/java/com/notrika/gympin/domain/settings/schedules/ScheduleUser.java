package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceType;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class ScheduleUser {

    @Autowired
    private PurchasedSubscribeRepository purchasedSubscribeRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private SmsInService smsService;

    @Autowired
    private SettingsService settingsService;



    @Transactional
    public void CloseOpenInvoices() {
        //close open Invoices
        List<InvoiceEntity> invoices = invoiceRepository.findByStatusAndTypeAndDeletedIsFalse(InvoiceStatus.DRAFT, InvoiceType.USER_SUBSCRIBE);
        for (InvoiceEntity invoice:invoices) {
            invoice.setStatus(InvoiceStatus.CANCELLED);
        }
        invoiceRepository.updateAll(invoices);
    }

    @Transactional
    public void sendAlarmToUsers() {
        //send sms to open invoice Users
        List<InvoiceEntity> invoices = invoiceRepository.findByStatusAndTypeAndDeletedIsFalse(InvoiceStatus.DRAFT,InvoiceType.USER_SUBSCRIBE);
        for (InvoiceEntity invoice:invoices) {
            try {
                String InvoiceUID = invoice.getSerial().getSerial().split("-")[invoice.getSerial().getSerial().split("-").length];
                smsService.sendCloseInvoiceWarning(new SmsDto(invoice.getUser().getPhoneNumber(), SmsTypes.USER_BUY_SUBSCRIBE,InvoiceUID ));
            } catch (Exception e) {
            }
        }
    }


    @Transactional
    public void sendAlarmReserveExpire() {
        Date now = new Date();

        long totalHours = getTicketUsageThreshold();
        long warningBeforeHours = 24;
        long executeEvery = 30L * 60 * 1000;

        List<PurchasedSubscribeEntity> subs =
                purchasedSubscribeRepository.findAllByDeletedIsFalseAndStatus(SubscribePurchasedStatus.READY_TO_ACTIVE);

        for (PurchasedSubscribeEntity sub : subs) {
            Date created = sub.getCreatedDate();
            if (created == null) continue;

            long expireTime = created.getTime() + (totalHours * 60 * 60 * 1000);
            long warningTime = expireTime - (warningBeforeHours * 60 * 60 * 1000);

            if (now.getTime() >= warningTime && now.getTime() < warningTime + executeEvery) {

                try {
                    smsService.sendYouReserveWillExpireSoon(SmsDto.builder()
                            .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                            .userNumber(sub.getCustomer().getPhoneNumber())
                            .text1(sub.getName())
                            .text2("24")
                            .text3(sub.getKey())
                            .build()
                    );
                } catch (Exception e) {
                }
            }
        }
    }

    public Integer getTicketUsageThreshold() {
        try{
            return Integer.parseInt(settingsService.getByKey("TICKET_USAGE_THRESHOLD").getValue());
        }catch (Exception e){
            return 72;
        }
    }
}
