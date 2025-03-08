package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.place.place.service.PlaceService;
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
    ScheduleCorporate scheduleCorporate;

    @Autowired
    SchedulePlace schedulePlace;

    @Autowired
    schedulePeymentCheck schedulePeymentCheck;

    @Autowired
    scheduleSms scheduleSms;

    @Scheduled(cron = "0 0 2 * * ?")
    public void setDiscounts(){
        scheduleReports.updateLastTimeDiscountCheck();
        scheduleDiscounts.UpdateAutoTicketSubscribeDiscount();

    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void UpdateBaseReports(){
//        scheduleReports.updateMaxSellByPlace();
//        scheduleReports.updateMaxSellByTicketSubscribe();
//        scheduleReports.updateMaxTicketSubscribePrice();
//        scheduleReports.updateMinTicketSubscribePrice();
    }


    @Scheduled(cron = "0 0 2 * * ?")
    public void UpdatePlaceSearchesStr(){
        schedulePlace.UpdatePlaceSearchStr();
//        scheduleReports.updateMaxSellByPlace();
//        scheduleReports.updateMaxSellByTicketSubscribe();
//        scheduleReports.updateMaxTicketSubscribePrice();
//        scheduleReports.updateMinTicketSubscribePrice();
    }

    @Scheduled(cron = "0 0 10 ? * SUN,MON,TUE,WED,THU,SAT")
    public void checkCorporatesLowBudget(){
        scheduleReports.updateLastTimeCorporateChargeCheck();
        scheduleCorporate.checkLowBudgetsSms();
    }


    @Scheduled(cron = "0 */30 * * * ?")
    public void setPeymentChecks(){
        scheduleReports.updateLastTimePaymentCheck();
        schedulePeymentCheck.checkPendingPayments();

    }
    @Scheduled(cron = "*/10 * * * * ?")
    public void sendSms(){
        scheduleReports.updateLastTimeSmsCheck();
        scheduleSms.sendSms();
    }
}
