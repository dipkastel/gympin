package com.notrika.gympin.domain.finance.helper;


import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.common.util.exception.corporate.CreditCannotBeNegativeException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceBuyableRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNoteRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.course.TicketCourseRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FinanceHelper {

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;

    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;

    @Autowired
    FinanceUserTransactionRepository financeUserTransactionRepository;

    @Autowired
    FinanceCorporateRepository financeCorporateRepository;

    @Autowired
    FinanceUserRepository financeUserRepository;

    @Autowired
    TicketSubscribeRepository ticketSubscribeRepository;

    @Autowired
    TicketCourseRepository ticketCourseRepository;

    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;

    @Autowired
    PurchasedCourseRepository purchasedCourseRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    SmsInService smsService;

    @Autowired
    ManageNoteRepository noteRepository;

    @Autowired
    InvoiceBuyableRepository invoiceBuyableRepository;




    public FinanceUserEntity getUserNonWithdrawableWallet(UserEntity user) {
        FinanceUserEntity result = user.getFinanceUser().stream().filter(o->!o.isDeleted()).filter(w->w.getUserFinanceType()== UserFinanceType.NON_WITHDRAWABLE_WALLET).findFirst().orElse(null);
        if(result==null)
            result = financeUserRepository.add(FinanceUserEntity.builder().user(user).userFinanceType(UserFinanceType.NON_WITHDRAWABLE_WALLET).totalDeposit(BigDecimal.ZERO).build());
        return result;
    }

    public List<FinanceUserEntity> getAllUserIncomeWallets(UserEntity user) {
        List<FinanceUserEntity> result = user.getFinanceUser().stream().filter(o->!o.isDeleted()).filter(w->w.getUserFinanceType()== UserFinanceType.INCOME_WALLET).collect(Collectors.toList());
        return result;
    }
    public FinanceUserEntity getUserIncomeWallet(UserEntity user, PlaceEntity place) {
        FinanceUserEntity result = user.getFinanceUser().stream().filter(o->!o.isDeleted()).filter(w->w.getUserFinanceType()== UserFinanceType.INCOME_WALLET&& Objects.equals(w.getPlace().getId(), place.getId())).findFirst().orElse(null);
        if(result==null)
            result = financeUserRepository.add(FinanceUserEntity.builder().user(user).place(place).userFinanceType(UserFinanceType.INCOME_WALLET).totalDeposit(BigDecimal.ZERO).build());
        return result;
    }

    public FinanceUserEntity getUserPersonalWallet(UserEntity user) {
        var result = user.getFinanceUser().stream().filter(o->!o.isDeleted()).filter(w->w.getUserFinanceType()== UserFinanceType.PERSONAL_WALLET).findFirst().orElse(null);
        if(result==null)
            result = financeUserRepository.add(FinanceUserEntity.builder().user(user).userFinanceType(UserFinanceType.PERSONAL_WALLET).totalDeposit(BigDecimal.ZERO).build());
        return result;
    }

    public FinanceUserEntity increaseNonWithdrawableWallet(FinanceUserEntity wallet, BigDecimal amount, FinanceSerialEntity serial,String description){
        BigDecimal beforeDecrease = wallet.getTotalDeposit();
        BigDecimal NewAmount = beforeDecrease.add(amount);
        wallet.setTotalDeposit(NewAmount);
        financeUserRepository.update(wallet);
        //add finance corporate personnel credit transaction
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .serial(serial)
                .amount(amount)
                .description(description)
                .latestBalance(beforeDecrease)
                .financeUser(wallet)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.USER)
                .isChecked(false)
                .build());
        return wallet;
    }

    public UserEntity getcurrentUser() {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        return (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
    }
}
