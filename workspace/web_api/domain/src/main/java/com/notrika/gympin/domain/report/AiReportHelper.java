package com.notrika.gympin.domain.report;


import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.service.CorporateTransactionService;
import com.notrika.gympin.common.report.dto.ReportGenderCompetitionDto;
import com.notrika.gympin.common.report.dto.ReportPopularSportDto;
import com.notrika.gympin.common.report.dto.ReportUserEntryCountDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AiReportHelper {


    @Autowired
    CorporateTransactionService corporateTransactionService;

    public List<String> getAiReport(CorporateEntity corporate, BigDecimal UserdCharge, ReportGenderCompetitionDto gender, List<ReportPopularSportDto> popularSports, Long enterCount, ReportUserEntryCountDto actieUser) {
        long personnelsCount = corporate.getPersonnel().stream().filter(p -> !p.isDeleted()).count();
        List<String> result = new ArrayList<>();
        if (personnelsCount < 10) {
            return List.of("تعداد کارمندان فعال در پنل شما کمتر از حدی است که امکان تهیه گزارش تحلیلی فراهم شود. پس از ورود و فعالیت تعداد بیشتری از کارمندان، گزارش جامع در اختیارتان قرار خواهد گرفت");
        }

        if (corporate.getId() != 1) {
            result.add(getFirstLine(corporate));
            result.add(getSecondLine(corporateTransactionService.getCorporateTotalIncreases(CorporateTransactionParam.builder().financeCorporateId(corporate.getFinanceCorporate().getId()).build()),UserdCharge));
            result.add(getThirdLine(gender,popularSports,corporate,enterCount));
            result.add(getFourthLine());
            result.add(getFifthLine(actieUser));
        } else {
            return List.of("دیتای مورد نیاز برای این گزارش وجود ندارد لطفا بعدا مراجعه نمایید");
        }
        return result;
    }

    private String getFirstLine(CorporateEntity corporate) {
        long dayes = ((new Date()).getTime() - corporate.getContractDate().getTime())/ (1000 * 60 * 60 * 24);
        String res = "";
        res+= "گزارش زیر به منظور ارائه اطلاعات از فعالیت کارمندان شرکت ";
        res+= corporate.getName();
        res+= " در پنل جیم پین و استفاده از خدمات ورزشی طی ";
        res+= ""+dayes;
        res+= " روز گذشته تهیه شده است.";
        if(dayes<80){
            res+= " با توجه به اینکه این گزارش در اوایل فعالیت شرکت و با دیتای مختصر تهیه می‌  شود، عواملی مانند تعداد محدود کاربران، عدم تسلط کامل به محیط نرم‌  افزار و حجم ناکافی داده می‌  تواند دقت گزارش را تحت تأثیر قرار دهد.";
        }
       return res;
    }

    private String getSecondLine(BigDecimal charge,BigDecimal usedCharge) {
        long usedPersent = Math.round(usedCharge.doubleValue()/charge.doubleValue()*100);
        long notUsed = 100-Math.round(usedCharge.doubleValue()/charge.doubleValue()*100);
        String res = "تا کنون ";
        res+=usedPersent+"%";
        res+=" درصد از بودجه ی اختصاص داده شده به امر ورزش و سلامت، توسط کارمندان به مصرف رسیده است و ";
        res+=notUsed+"%";
        res+=" از بودجه (به مبلغ ";
        res+=toPriceWithComma(charge.subtract(usedCharge).longValue());
        res+=" تومان) از اعتبار سازمان ویستا در کیف پولش باقی مانده است.";

        return res;
    }


    private String getThirdLine(ReportGenderCompetitionDto gender, List<ReportPopularSportDto> popularSports,CorporateEntity corporate,Long enterCount) {
        String res = "بر اساس تعداد کل کارمندان ثبت شده در پنل جیم پین،  ";
        res+=gender.getUsesManInTotal()+"% آقایان و ";
        res+=gender.getUsesWomanInTotal()+"% خانم ها  در امر ورزش مشارکت داشته اند که از آن ";
        Long whole = popularSports.stream().map(ReportPopularSportDto::getSportCount).reduce(0L, Long::sum);
        for (ReportPopularSportDto part : popularSports) {
            res += Math.round(part.getSportCount()*100/whole) + "% مربوط به "+part.getSportName()+", ";
        }
        res = res.substring(0,res.length()-2);
        res+=" بوده است. مجموع مدت ورزش پرسنل مجموعه ی "+corporate.getName()+" ";
        int AllMin = (int) (enterCount*108);
        int singleUserMin = (int) (AllMin/corporate.getPersonnel().stream().filter(p->!p.isDeleted()).count());
        int Hour = Math.round(AllMin/60);
        int min = AllMin%60;
        int AverageHour = Math.round(singleUserMin/60);
        int AverageMin = singleUserMin%60;
        res+=Hour +" ساعت و "+min + " دقیقه که به طور میانگین برای هر نفر " +AverageHour+ " ساعت و "+AverageMin +" دقیقه تا کنون بوده";
        return res;
    }

    private String getFourthLine() {
        return "میانگین زمان حضور کاربران در پنل جیم پین، 18 دقیقه به ازای هر نفر بوده که کارمندان در این مدت به بررسی مراکز ورزشی طرف قرارداد پرداخته اند و بیشترین آمار جستجو مربوط به رشته های ماساژ، چربی سوزی و فیتنس بوده است.";
    }

    private String getFifthLine(ReportUserEntryCountDto actieUser) {
        String res="ورزشکار ترین افراد در مجموعه شما ";
        res+=actieUser.getUser().getGender()== Gender.MALE?"آقای ":"خانم ";
        res+=actieUser.getUser().getFullName();
        res+=" است که پیشنهاد میشود در صورت تمایل برای دوره بعدی اعتبار بیشتری دریافت کند.";
        return res;
    }

    private String toPriceWithComma(long amount) {
        DecimalFormat formatter = new DecimalFormat("#,###");
        return formatter.format(amount);
    }
}
