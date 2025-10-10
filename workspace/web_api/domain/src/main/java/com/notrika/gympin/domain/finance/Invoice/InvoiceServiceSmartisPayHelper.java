package com.notrika.gympin.domain.finance.Invoice;


import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceFoodEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InvoiceServiceSmartisPayHelper {

    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;


    @Transactional
    public String getUrl(InvoiceEntity invoice, UserEntity user) throws Exception {

        return "https://wpg.smartispay.app/?uuid=test-gateway-1234";
    }

}
