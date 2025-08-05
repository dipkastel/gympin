package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ScheduleUser {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private SmsInService smsService;



    @Transactional
    public void CloseOpenInvoices() {
        //close open Invoices
        List<InvoiceEntity> invoices = invoiceRepository.findByStatusAndDeletedIsFalse(InvoiceStatus.DRAFT);
        for (InvoiceEntity invoice:invoices) {
            invoice.setStatus(InvoiceStatus.CANCELLED);
        }
        invoiceRepository.updateAll(invoices);
    }
    @Transactional
    public void sendAlarmToUsers() {
        //send sms to open Users
        List<InvoiceEntity> invoices = invoiceRepository.findByStatusAndDeletedIsFalse(InvoiceStatus.DRAFT);
        for (InvoiceEntity invoice:invoices) {
            try {
                String InvoiceUID = invoice.getSerial().getSerial().split("-")[invoice.getSerial().getSerial().split("-").length];
                smsService.sendCloseInvoiceWarning(new SmsDto(invoice.getUser().getPhoneNumber(), SmsTypes.USER_BUY_SUBSCRIBE,InvoiceUID ));
            } catch (Exception e) {
            }
        }
    }
}
