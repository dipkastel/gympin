package com.notrika.gympin.domain.report;

import com.notrika.gympin.common.report.dto.*;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.param.ReportPlaceViewsParam;
import com.notrika.gympin.common.report.service.ReportService;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.domain.util.convertor.ReportConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLinkRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageServiceExecutionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.management.links.ManageLinkEntity;
import com.notrika.gympin.persistence.entity.management.service.reportDto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {


    @Autowired
    FinanceCorporateTransactionRepository corporateTransactionRepository;
    @Autowired
    CorporateRepository corporateRepository;
    @Autowired
    ManageServiceExecutionRepository reportRepository;
    @Autowired
    FinanceSerialRepository serialRepository;
    @Autowired
    ManageLinkRepository manageLinkRepository;
    @Autowired
    AiReportHelper aiReportHelper;

    @Override
    public ReportUseCorporateChargeDto useCorporateCharge(ReportParam param) {
        List<Object[]> listTransaction = reportRepository.getReportUseCorporateCharge(param.getId());
        ArrayList<String> MonthNames = new ArrayList<>();
        ArrayList<String> Years = new ArrayList<>();
        ArrayList<BigDecimal> Amounts = new ArrayList<>();
        for (Object[] o : listTransaction) {
            Years.add(o[0].toString());
            MonthNames.add(o[1].toString());
            Amounts.add(((BigDecimal) o[2]).multiply(BigDecimal.valueOf(-1)));
        }
        return ReportUseCorporateChargeDto.builder().monthNames(MonthNames).amounts(Amounts).years(Years).build();
    }

    @Override
    public Long ticketBuyCountThisWeek(ReportParam param) {
        Long count = reportRepository.getTicketBuyThisWeekByCorporateId(param.getId());
        return count;
    }

    @Override
    public ReportGenderCompetitionDto getGenderCompetition(ReportParam param) {
        CorporateEntity corporate =  corporateRepository.getById(param.getId());
        Long mens = corporate.getPersonnel().stream().filter(p->!p.isDeleted()&&p.getUser().getGender()!=null&&p.getUser().getGender().equals(Gender.MALE)).count();
        Long womens = corporate.getPersonnel().stream().filter(p->!p.isDeleted()&&p.getUser().getGender()!=null&&p.getUser().getGender().equals(Gender.FEMALE)).count();
        Long mensTicketsThisMount = reportRepository.getTicketBuyByDateThisWeekByGenderAndCorporateId(1,"MALE",param.getId());
        Long womensTicketsThisMount = reportRepository.getTicketBuyByDateThisWeekByGenderAndCorporateId(1,"FEMALE",param.getId());
        Long mensTicketsThisYear = reportRepository.getTicketBuyByDateThisWeekByGenderAndCorporateId(12,"MALE",param.getId());
        Long womensTicketsThisYear = reportRepository.getTicketBuyByDateThisWeekByGenderAndCorporateId(12,"FEMALE",param.getId());
       return ReportGenderCompetitionDto.builder()
                .usesManInMonth(Math.min((long)(((double)mensTicketsThisMount/mens)*100),100))
                .usesManInTotal(Math.min((long)(((double)mensTicketsThisYear/mens)*100),100))
                .usesWomanInMonth(Math.min((long)(((double)womensTicketsThisMount/womens)*100),100))
                .usesWomanInTotal(Math.min((long)(((double)womensTicketsThisYear/womens)*100),100))
                .build();
    }

    @Override
    public List<ReportPopularSportDto> getPopularSports(ReportParam param) {
       List<PopularSportRequestDto> listSports =  reportRepository.getPopularReport(param.getId());
       try {
           return listSports.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
       }catch (Exception e){
           return null;
       }
    }

    @Override
    public List<ReportActiveUsersDto> getActiveUsers(ReportParam param) {
        Date startDate = Date.from(LocalDate.now().minusDays(param.getDayCount()==null?30:param.getDayCount()).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<ActiveUsersQueryDto> listSports =  reportRepository.getActiveUsers(param.getId(),startDate);
       try {
           return listSports.stream().limit(3).map(ReportConvertor::toDto).collect(Collectors.toList());
       }catch (Exception e){
           return null;
       }
    }
    @Override
    public List<ReportUserEntryCountDto> getActiveInEnterPlacePersonnel(ReportParam param) {
        Date startDate = Date.from(LocalDate.now().minusDays(param.getDayCount()==null?30:param.getDayCount()).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<UserEnterRequestDto> listSports =  reportRepository.getActiveInEnterPlacePersonnel(param.getId(),startDate);
       try {
           return listSports.stream().limit(3).map(ReportConvertor::toDto).collect(Collectors.toList());
       }catch (Exception e){
           return null;
       }
    }
    @Override
    public List<ReportCorporateTransactionsDto> getBalanceChangedReport(ReportParam param) {
        Date startDate = Date.from(LocalDate.now().minusDays(param.getDayCount()==null?30:param.getDayCount()).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<FinanceCorporateDepositReportDto> listSports =  reportRepository.getFinanceTransactions(param.getId(),startDate);
       try {
           return listSports.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
       }catch (Exception e){
           return null;
       }
    }

    @Override
    public List<ReportPlaceViewsDto> getPlaceViewsReport(ReportPlaceViewsParam param) {
        List<PlaceViewsDto> listViews =  reportRepository.getPlaceViewsReport(param.getPlacId(),param.getFromDate(),param.getToDate());
        return listViews.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<String> getAiReport(ReportParam param) {
        CorporateEntity corporate =  corporateRepository.getById(param.getId());
        BigDecimal sum = useCorporateCharge(ReportParam.builder().dayCount(30l).id(corporate.getId()).build()).getAmounts().stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        ReportGenderCompetitionDto gender = getGenderCompetition(ReportParam.builder().id(corporate.getId()).build());
        List<ReportPopularSportDto> popularSports = getPopularSports(ReportParam.builder().id(corporate.getId()).build());
        Date startDate = Date.from(LocalDate.now().minusDays(param.getDayCount()==null?30:param.getDayCount()).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Long enterCount = reportRepository.getCorporateUserEnterCount(corporate.getId(),startDate);
        List<ReportUserEntryCountDto> actives =  getActiveInEnterPlacePersonnel(ReportParam.builder().id(corporate.getId()).build());
       return aiReportHelper.getAiReport(corporate,sum,gender,popularSports,enterCount,actives);
    }

    @Override
    public List<ReportPlaceViewsDto> getLinkViewsReport(Long linkId){
        ManageLinkEntity link = manageLinkRepository.getById(linkId);
        List<PlaceViewsDto> listViews =  reportRepository.getExecutionGroupByDateReport(
                "LinkControllerImpl.getByCode",
                "[\""+link.getCode()+"\"]",null,null);
        return listViews.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ReportCountByMonthDto> getPanelSellsReportByMonth(ReportParam param) {
        List<Object[]> result = serialRepository.getSellsByMonth();
        return result.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ReportCountByMonthDto> getPanelUseReportByMonth(ReportParam param) {
        List<Object[]> result = serialRepository.getUseByMonth();
        return result.stream().map(ReportConvertor::toDto).collect(Collectors.toList());
    }
}
