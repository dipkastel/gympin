package com.notrika.gympin.domain.settings.schedules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class gympinScheduleService {


    @Autowired
    scheduleDiscounts scheduleDiscounts;

    @Autowired
    scheduleReports scheduleReports;

    @Autowired
    scheduleCorporateSms scheduleCorporateSms;

    @Autowired
    schedulePeymentCheck schedulePeymentCheck;

    @Autowired
    scheduleSms scheduleSms;

    @Scheduled(cron = "0 0 2 * * ?")
    public void setDiscounts(){
        scheduleDiscounts.UpdateAutoTicketSubscribeDiscount();

    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void UpdateBaseReports(){
        scheduleReports.updateMaxSellByPlace();
        scheduleReports.updateMaxSellByTicketSubscribe();
        scheduleReports.updateMaxTicketSubscribePrice();
        scheduleReports.updateMinTicketSubscribePrice();
    }

    @Scheduled(cron = "0 0 10 ? * SUN,MON,TUE,WED,THU,SAT")
    public void checkCorporatesLowBudget(){
        scheduleCorporateSms.checkLowBudgets();
    }


    @Scheduled(cron = "0 */30 * * * ?")
    public void setPeymentChecks(){
        schedulePeymentCheck.checkPendingPayments();

    }
    @Scheduled(cron = "*/10 * * * * ?")
    public void sendSms(){
        scheduleSms.sendSms();
    }
}
