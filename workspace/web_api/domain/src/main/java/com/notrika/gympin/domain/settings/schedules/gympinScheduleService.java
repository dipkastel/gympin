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
    ScheduleCorporate scheduleCorporate;

    @Autowired
    SchedulePlace schedulePlace;

    @Autowired
    ScheduleUser scheduleUser;

    @Autowired
    scheduleIncredible scheduleIncredible;

    @Autowired
    schedulePeymentCheck schedulePeymentCheck;

    @Autowired
    scheduleSms scheduleSms;

    @Scheduled(cron = "0 0 1 * * ?")
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

    @Scheduled(cron = "0 9 20 * * ?")
    public void UpdateWarningBaskets(){
        scheduleUser.sendAlarmToUsers();
    }


    @Scheduled(cron = "0 1 0 * * ?")
    public void UpdateBaskets(){
        scheduleUser.CloseOpenInvoices();
    }


    @Scheduled(cron = "30 */30 * * * ?")
    public void AlarmReserveExpire(){
        scheduleUser.sendAlarmReserveExpire();
    }


    @Scheduled(cron = "0 0 2 * * ?")
    public void UpdatePlaceSearchesStr(){
        schedulePlace.UpdatePlaceSearchStr();
//        scheduleReports.updateMaxSellByPlace();
//        scheduleReports.updateMaxSellByTicketSubscribe();
//        scheduleReports.updateMaxTicketSubscribePrice();
//        scheduleReports.updateMinTicketSubscribePrice();
    }

    @Scheduled(cron = "0 0 3 * * ?")
    public void UpdateExecution(){

    }

    @Scheduled(cron = "0 0 10 ? * SUN,MON,TUE,WED,THU,SAT")
    public void checkCorporatesLowBudget(){
        scheduleReports.updateLastTimeCorporateChargeCheck();
        scheduleCorporate.checkLowBudgetsSms();
    }

    @Scheduled(cron = "7 */10 * * * ?")
    public void checkExpirePersonnelCredit(){
        scheduleReports.updateLastTimeExpireCredits();
        scheduleCorporate.checkExpirePersonnelCredit();
    }


//    @Scheduled(cron = "11 */1 * * * ?")
    @Scheduled(cron = "1 */3 * * * ?")
    public void setIncrediblesDeactive(){
        scheduleReports.updateLastTimeIncredibleDeactive();
        scheduleIncredible.Deactive();
    }

//    @Scheduled(cron = "21 */2 * * * ?")
    @Scheduled(cron = "21 */11 * * * ?")
    public void setIncrediblesActive(){
        scheduleReports.updateLastTimeIncredibleActive();
        scheduleIncredible.Active();
    }

//    @Scheduled(cron = "31 */1 * * * ?")
    @Scheduled(cron = "31 0 */4 * * ?")
    public void setIncrediblesAddBySystem(){
        scheduleReports.updateLastTimeIncredibleAddBySystem();
        scheduleIncredible.AddBySystem();
    }

    @Scheduled(cron = "35 */30 * * * ?")
    public void setPeymentChecks(){
        scheduleReports.updateLastTimePaymentCheck();
        schedulePeymentCheck.checkUserPendingPayments();

    }
    @Scheduled(cron = "*/10 * * * * ?")
    public void sendSms(){
        scheduleReports.updateLastTimeSmsCheck();
        scheduleSms.sendSms();
    }
}
