package com.notrika.gympin.domain.settings.schedules;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class schedulePeymentCheck {

//    @Autowired
//    TransactionRepository transactionRepository;

    public void checkPendingPayments() {

//       log.error("Going to checkPendingPayments\n");
//       List<TransactionEntity> pendingTransactions =  transactionRepository.findPendingRequests();
//        log.error("Going to checkPendingPayments for count:"+pendingTransactions.stream().count()+"\n");
//       for (TransactionEntity transaction : pendingTransactions){
//           log.error("Going to checkPendingPayments for transactionId :"+transaction.getId()+"\n");
//           Calendar instance = Calendar.getInstance();
//           instance.setTime(transaction.getCreatedDate());
//           instance.add(Calendar.HOUR, 1);
//           Date transactionExTime = instance.getTime();
//           if(transactionExTime.before(new Date())){
//               transactionRepository.add(TransactionEntity.builder()
//                       .serial(transaction.getSerial())
//                       .transactionType(transaction.getTransactionType())
//                       .transactionStatus(TransactionStatus.PAYMENT_REJECTED)
//                       .place(transaction.getPlace())
//                       .user(transaction.getUser())
//                       .corporate(transaction.getCorporate())
//                       .balance(transaction.getBalance())
//                       .isChecked(transaction.getBankPend())
//                       .bankPend(transaction.getBankPend())
//                       .description("پاسخ از بانک دریافت نشد.")
//                       .amount(transaction.getAmount())
//                       .build());
//           }
//       }
    }
}
