package com.notrika.gympin.domain.schedules;

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

    @Scheduled(cron = "0 0 2 * * ?")
    public void setDiscounts(){
        scheduleDiscounts.UpdateAutoPlansDiscount();

    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void UpdateBaseReports(){
        scheduleReports.updateMaxSellByPlace();
        scheduleReports.updateMaxSellByPlan();
        scheduleReports.updateMaxPlanPrice();
        scheduleReports.updateMinPlanPrice();
    }

    @Scheduled(cron = "0 0 10 ? * SUN,MON,TUE,WED,THU,SAT")
    public void checkCorporatesLowBudget(){
        scheduleCorporateSms.checkLowBudgets();
    }


    @Scheduled(cron = "0 */10 * * * ?")
    public void setPeymentChecks(){
        schedulePeymentCheck.checkPendingPayments();

    }
}
