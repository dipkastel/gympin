package com.notrika.gympin.domain.schedules;
import com.notrika.gympin.common.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.transaction.enums.TransactionType;
import com.notrika.gympin.persistence.dao.repository.ReportSettingRepository;
import com.notrika.gympin.persistence.dao.repository.TransactionRepository;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class schedulePeymentCheck {

    @Autowired
    TransactionRepository transactionRepository;

    public void checkPendingPayments() {

       log.error("Going to checkPendingPayments\n");
       List<TransactionEntity> pendingTransactions =  transactionRepository.findPendingRequests();
        log.error("Going to checkPendingPayments for count:"+pendingTransactions.stream().count()+"\n");
       for (TransactionEntity transaction : pendingTransactions){
           log.error("Going to checkPendingPayments for transactionId :"+transaction.getId()+"\n");
           Calendar instance = Calendar.getInstance();
           instance.setTime(transaction.getCreatedDate());
           instance.add(Calendar.HOUR, 1);
           Date transactionExTime = instance.getTime();
           if(transactionExTime.before(new Date())){
               transactionRepository.add(TransactionEntity.builder()
                       .serial(transaction.getSerial())
                       .transactionType(transaction.getTransactionType())
                       .transactionStatus(TransactionStatus.PAYMENT_REJECTED)
                       .place(transaction.getPlace())
                       .user(transaction.getUser())
                       .corporate(transaction.getCorporate())
                       .balance(transaction.getBalance())
                       .isChecked(false)
                       .bankPend(false)
                       .description("پاسخ از بانک دریافت نشد.")
                       .amount(transaction.getAmount())
                       .build());
           }
       }
    }
}
