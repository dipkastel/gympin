package com.notrika.gympin.domain.report;

import com.notrika.gympin.common.finance.transaction.service.TransactionAllService;
import com.notrika.gympin.common.report.dto.ReportDto;
import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.service.ReportService;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReportServiceImpl implements ReportService {


    @Autowired
    FinanceCorporateTransactionRepository transactionRepository;

    @Override
    public ReportUseCorporateChargeDto useCorporateCharge(ReportParam param) {
        List<Object[]> listTransaction = transactionRepository.getReportUseCorporateCharge(param.getId());
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
}
