package com.notrika.gympin.domain.finance.Invoice;


import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.param.CheckoutDetailParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.util.exception.purchased.PayByOthersException;
import com.notrika.gympin.common.util.exception.purchased.PriceTotalConflictException;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceBuyableRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNoteRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.course.TicketCourseRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceHelper {

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
    SmsService smsService;

    @Autowired
    ManageNoteRepository noteRepository;

    @Autowired
    InvoiceBuyableRepository invoiceBuyableRepository;


    @Transactional
    public InvoiceEntity calculateCheckout(InvoiceEntity invoice, InvoiceCheckoutParam param) throws Exception {
        BigDecimal subscribeRemainderPrice = invoice.getPriceToPay();
        //subtract money
        for (CheckoutDetailParam checkoutParam : param.getCheckout().stream().sorted((a, b) -> (int) (a.getPriority() - b.getPriority())).collect(Collectors.toList())) {
            if (checkoutParam.getAmount().compareTo(BigDecimal.ZERO) != 0) {
                subscribeRemainderPrice = subscribeRemainderPrice.subtract(checkoutParam.getAmount());
                switch (checkoutParam.getCreditType()) {
                    case SPONSOR: {
                        payBySponsor(invoice, checkoutParam);
                        break;
                    }
                    case PERSONAL: {
                        payByPersonal(invoice, checkoutParam);
                        break;
                    }
                }
            }
        }
        if (subscribeRemainderPrice.compareTo(BigDecimal.ZERO) != 0)
            throw new PriceTotalConflictException();
        //change subscribe status and serial
        createPurchasedItems(invoice);
        return invoice;
    }

    private void payBySponsor(InvoiceEntity invoice, CheckoutDetailParam checkoutParam) {
        CorporatePersonnelEntity personnelEntity = corporatePersonnelRepository.getById(checkoutParam.getPersonnelId());
        FinanceCorporateEntity corporateFinanceEntity = personnelEntity.getCorporate().getFinanceCorporate();
        if (invoice.getUser().getId() != personnelEntity.getUser().getId())
            throw new PayByOthersException();


        //update personel credit
        //update personel balance
        personnelEntity.setCreditBalance(personnelEntity.getCreditBalance().subtract(checkoutParam.getAmount()));
        corporatePersonnelRepository.update(personnelEntity);


        //update corporate credit
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .corporatePersonnel(personnelEntity)
                .latestBalance(corporateFinanceEntity.getTotalCredits())
                .financeCorporate(corporateFinanceEntity)
                .isChecked(false)
                .amount(checkoutParam.getAmount().negate())
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .build());
        corporateFinanceEntity.setTotalCredits(corporateFinanceEntity.getTotalCredits().subtract(checkoutParam.getAmount()));

        //update corporate deposit
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionCorporateType(TransactionCorporateType.DEPOSIT)
                .corporatePersonnel(personnelEntity)
                .latestBalance(corporateFinanceEntity.getTotalDeposit())
                .financeCorporate(corporateFinanceEntity)
                .isChecked(false)
                .amount(checkoutParam.getAmount().negate())
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .build());
        corporateFinanceEntity.setTotalDeposit(corporateFinanceEntity.getTotalDeposit().subtract(checkoutParam.getAmount()));


        financeCorporateRepository.update(corporateFinanceEntity);
    }

    private void payByPersonal(InvoiceEntity invoice, CheckoutDetailParam checkoutParam) {

        FinanceUserEntity financeUserEntity = invoice.getUser().getFinanceUser();

        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(financeUserEntity.getTotalDeposit())
                .financeUser(financeUserEntity)
                .isChecked(false)
                .transactionType(TransactionBaseType.USER)
                .amount(checkoutParam.getAmount().negate())
                .build());


        financeUserEntity.setTotalDeposit(financeUserEntity.getTotalDeposit().subtract(checkoutParam.getAmount()));
        financeUserRepository.update(financeUserEntity);

        GympinContext context = GympinContextHolder.getContext();
        context.getEntry().put(GympinContext.USER_KEY, financeUserEntity.getUser());

    }

    private void createPurchasedItems(InvoiceEntity invoice) throws Exception {
        List<InvoiceBuyableEntity> smsList = new ArrayList<>();
        for (InvoiceBuyableEntity invoiceBuyable : invoice.getInvoiceBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList())) {
            switch (invoiceBuyable.getBuyableType()) {
                case SUBSCRIBE:
                    for (int i = 0; i < invoiceBuyable.getCount(); i++) {
                        addSubscribe(invoice, invoiceBuyable);
                        smsList.add(invoiceBuyable);
                    }
                    break;
                case COURSE:
                    for (int i = 0; i < invoiceBuyable.getCount(); i++) {
                        addCourse(invoice, invoiceBuyable);
                        smsList.add(invoiceBuyable);
                    }
                    break;
                case PRODUCT:
                    throw new Exception("آیتم برای خرید آماده نیست");
                case FOOD:
                    throw new Exception("آیتم برای خرید آماده نیست");
                case SERVICE:
                    throw new Exception("آیتم برای خرید آماده نیست");
                case DIET:
                    throw new Exception("آیتم برای خرید آماده نیست");
                case WORKOUT:
                    throw new Exception("آیتم برای خرید آماده نیست");
            }
            //send sms
            sendSms(invoice.getUser(), invoiceBuyable);
        }
        invoice.setStatus(InvoiceStatus.COMPLETED);
        invoiceRepository.update(invoice);
    }

    private void addCourse(InvoiceEntity invoice, InvoiceBuyableEntity invoiceBuyable) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(invoiceBuyable.getBuyable().getId());
        PurchasedCourseEntity courseEntity = PurchasedCourseEntity.builder()
                .name(ticketCourse.getName())
                .description(ticketCourse.getDescription())
                .discount(ticketCourse.getDiscount())
                .gender(ticketCourse.getGender())
                .sellPrice(invoiceBuyable.getPlacePrice())
                .placePrice(invoiceBuyable.getPlacePrice())
                .place(invoiceBuyable.getPlace())
                .customer(invoice.getUser())
                .serial(invoice.getSerial())
                .purchasedType(PurchasedType.COURSE)
                .status(CoursePurchasedStatus.READY_TO_ACTIVE)
                .ticketCourse(ticketCourse)
                .entryTotalCount(ticketCourse.getEntryTotalCount())
                .courseStatus(ticketCourse.getCourseStatus())
                .targetOfCourse(ticketCourse.getTargetOfCourse())
                .classCapacity(ticketCourse.getClassCapacity())
                .ageLimit(ticketCourse.getAgeLimit())
                .coaches(ticketCourse.getCoaches().stream().map(c->UserEntity.builder().id(c.getId()).build()).collect(Collectors.toList()))
                .entryTotalCount(ticketCourse.getEntryTotalCount())
                .courseCapacity(ticketCourse.getCourseCapacity())
                .courseLevel(ticketCourse.getCourseLevel())
                .startDate(ticketCourse.getStartDate())
                .endDate(ticketCourse.getEndDate())
                .startSellingDate(ticketCourse.getStartSellingDate())
                .endSellingDate(ticketCourse.getEndSellingDate())
                .build();
        purchasedCourseRepository.add(courseEntity);

    }

    private void addSubscribe(InvoiceEntity invoice, InvoiceBuyableEntity invoiceBuyable) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(invoiceBuyable.getBuyable().getId());

        Date currentDate = new Date();
        Calendar calender = Calendar.getInstance();
        calender.setTime(currentDate);
        calender.add(Calendar.DATE, ticketSubscribe.getExpireDuration());
        purchasedSubscribeRepository.add(PurchasedSubscribeEntity.builder()
                .name(ticketSubscribe.getName())
                .description(ticketSubscribe.getDescription())
                .discount(ticketSubscribe.getDiscount())
                .gender(ticketSubscribe.getGender())
                .sellPrice(invoiceBuyable.getPlacePrice())
                .placePrice(invoiceBuyable.getPlacePrice())
                .place(invoiceBuyable.getPlace())
                .customer(invoice.getUser())
                .serial(invoice.getSerial())
                .purchasedType(PurchasedType.SUBSCRIBE)
                .status(SubscribePurchasedStatus.READY_TO_ACTIVE)
                .ticketSubscribe(ticketSubscribe)
                .entryTotalCount(ticketSubscribe.getEntryTotalCount())
                .ticketSubscribeExpireDate(calender.getTime())
                .expireDate(calender.getTime())
                .build());
    }

    private void sendSms(UserEntity user, InvoiceBuyableEntity invoiceBuyable) {
        try {
            smsService.sendYouBuySubscribe(SmsDto.builder()
                    .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                    .userNumber(user.getPhoneNumber())
                    .text1(invoiceBuyable.getName())
                    .text2(invoiceBuyable.getPlace().getName())
                    .build()
            );
        } catch (Exception e) {
        }
    }

    @Transactional
    public void addNote(InvoiceEntity invoice, String note) {
        noteRepository.add(ManageNoteEntity.builder()
                .invoice(invoice)
                .type(NoteType.NOTE)
                .isToDo(false)
                .text(note)
                .build());
    }

    @Transactional
    public void updateInvoicePrice(InvoiceEntity invoice, BuyableEntity buyable) {
        var buyables = invoiceBuyableRepository.findAllByInvoiceIdAndDeletedIsFalse(invoice.getId());
        BigDecimal priceToPay;
        if (buyables != null) {
            priceToPay = buyables.stream()
                    .filter(b -> !b.isDeleted())
                    .map(p -> p.getUnitPrice().multiply(BigDecimal.valueOf(p.getCount())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        } else {
            priceToPay = buyable.getPrice();
        }
        invoice.setPriceToPay(priceToPay);
        invoice.setTotalPrice(priceToPay);
        invoiceRepository.update(invoice);
    }

    @Transactional
    public void updateInvoicePrice(InvoiceEntity invoice) {
        var buyables = invoice.getInvoiceBuyables();
        BigDecimal priceToPay = BigDecimal.ZERO;
        priceToPay = buyables.stream()
                .filter(b -> !b.isDeleted())
                .map(p -> p.getUnitPrice().multiply(BigDecimal.valueOf(p.getCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        invoice.setPriceToPay(priceToPay);
        invoice.setTotalPrice(priceToPay);
        invoiceRepository.update(invoice);
    }

    public InvoiceBuyableEntity addBuyableToInvoice(InvoiceEntity invoice, BuyableEntity buyable, Short count) {

        InvoiceBuyableEntity invoiceBuyable = InvoiceBuyableEntity.builder()
                .name(buyable.getName())
                .description(buyable.getDescription())
                .discount(buyable.getDiscount())
                .placePrice(buyable.getPlacePrice())
                .gender(buyable.getGender())
                .buyableType(buyable.getBuyableType())
                .place(buyable.getPlace())
                .beneficiary(buyable.getBeneficiary())
                .unitPrice(buyable.getPrice())
                .count(count)
                .invoice(invoice)
                .buyable(buyable)
                .build();
        var result = invoiceBuyableRepository.add(invoiceBuyable);
        return result;
    }

    @Transactional
    public InvoiceEntity getUserBasket(InvoiceParam invoiceParam) {

        if (invoiceParam.getId() != null) {
            return invoiceRepository.getById(invoiceParam.getId());
        } else {
            //invoice number not Known
            var currentUser = getcurrentUser();
            var userDraftInvoices = invoiceRepository.findByUserIdAndStatusAndDeletedIsFalse(currentUser.getId(), InvoiceStatus.DRAFT);
            //get last User Draft Invoice as basket
            if (userDraftInvoices.size() > 0)
                return userDraftInvoices.get(userDraftInvoices.size() - 1);
            else {
                //add new invoice
                return invoiceRepository.add(InvoiceEntity.builder()
                        .status(InvoiceStatus.DRAFT)
                        .fullName(currentUser.getFullName())
                        .user(currentUser)
                        .serial(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build())
                        .phoneNumber(currentUser.getPhoneNumber())
                        .gender(currentUser.getGender())
                        .nationalCode(currentUser.getNationalCode())
                        .totalPrice(BigDecimal.ZERO)
                        .priceToPay(BigDecimal.ZERO)
                        .build());
            }
        }
    }

    private UserEntity getcurrentUser() {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        return (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
    }
}
