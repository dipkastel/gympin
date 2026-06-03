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

    @Scheduled(cron = "0 */2 * * * ?")
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

    @Scheduled(cron = "0 */9 * * * ?")
    public void UpdateWarningBaskets(){
        scheduleUser.sendAlarmToUsers();
    }


    @Scheduled(cron = "0 0 0 * * ?")
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

    @Scheduled(cron = "7 18 * * * ?")
    public void checkExpirePersonnelCredit(){
        scheduleCorporate.checkExpirePersonnelCredit();
    }


//    @Scheduled(cron = "11 */1 * * * ?")
    @Scheduled(cron = "11 */1 * * * ?")
    public void setIncrediblesDeactive(){
        scheduleReports.updateLastTimeIncredibleUpdate();
        scheduleIncredible.Deactive();
    }

//    @Scheduled(cron = "21 */2 * * * ?")
    @Scheduled(cron = "21 */1 * * * ?")
    public void setIncrediblesActive(){
        scheduleReports.updateLastTimeIncredibleUpdate();
        scheduleIncredible.Active();
    }

//    @Scheduled(cron = "31 */3 * * * ?")
    @Scheduled(cron = "31 */1 * * * ?")
    public void setIncrediblesAddBySystem(){
        scheduleReports.updateLastTimeIncredibleUpdate();
        scheduleIncredible.AddBySystem();
    }

    @Scheduled(cron = "0 */30 * * * ?")
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
