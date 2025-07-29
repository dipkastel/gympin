package com.notrika.gympin.domain.finance.Invoice;


import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.param.CheckoutDetailParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util.exception.corporate.CreditCannotBeNegativeException;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.finance.helper.FinanceHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceUserRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceUserTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceBuyableRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceFoodRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNoteRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.course.TicketCourseRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceFoodEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceSubscribeEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelRoleEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.BadRequestException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceHelper {

    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;
    @Autowired
    CorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    FinanceUserTransactionRepository financeUserTransactionRepository;
    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    PurchasedCourseRepository purchasedCourseRepository;
    @Autowired
    InvoiceBuyableRepository invoiceBuyableRepository;
    @Autowired
    InvoiceFoodRepository invoiceFoodRepository;
    @Autowired
    InvoiceSubscribeRepository invoiceSubscribeRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    TicketCourseRepository ticketCourseRepository;
    @Autowired
    FinanceUserRepository financeUserRepository;
    @Autowired
    CorporateRepository corporateRepository;
    @Autowired
    ManageNoteRepository noteRepository;
    @Autowired
    InvoiceRepository invoiceRepository;
    @Autowired
    FinanceHelper financeHelper;
    @Autowired
    SmsInService smsService;
    @Autowired
    UserService userService;


    @Transactional
    public InvoiceEntity calculateCheckout(InvoiceEntity invoice, UserHowToPayDto howToPay, UserEntity user) throws Exception {
        BigDecimal subscribeRemainderPrice = invoice.getPriceToPay();
        //subtract money

        for (var credit : howToPay.getCreditDetail()) {
            if (credit.getCreditPayableAmount().compareTo(BigDecimal.ZERO) > 0 && credit.getCreditAmount().compareTo(BigDecimal.ZERO) > 0) {
                subscribeRemainderPrice = subscribeRemainderPrice.subtract(credit.getCreditPayableAmount());
                switch (credit.getCreditType()) {
                    case SPONSOR: {
                        FinanceCorporatePersonnelCreditEntity wallet = financeCorporatePersonnelCreditRepository.getById(credit.getId());
                        if (wallet == null)
                            throw new WalletNotExistException();
                        payBySponsor(invoice, credit, wallet);
                        break;
                    }
                    case PERSONAL: {
                        FinanceUserEntity wallet = financeUserRepository.findByUserIdAndDeletedFalse(user.getId()).stream().filter(c -> c.getUserFinanceType() == UserFinanceType.PERSONAL_WALLET).findFirst().orElse(null);
                        if (wallet == null)
                            throw new WalletNotExistException();
                        payByPersonal(invoice, credit, wallet);
                        break;
                    }
                    case NON_WITHDRAWABLE: {
                        FinanceUserEntity wallet = financeUserRepository.findByUserIdAndDeletedFalse(user.getId()).stream().filter(c -> c.getUserFinanceType() == UserFinanceType.NON_WITHDRAWABLE_WALLET).findFirst().orElse(null);
                        if (wallet == null)
                            throw new WalletNotExistException();
                        payByNonWithdrawable(invoice, credit, wallet);
                        break;
                    }
                }
            }
        }
        if (subscribeRemainderPrice.compareTo(BigDecimal.ZERO) != 0)
            throw new PriceTotalConflictException();
        return invoice;
    }

    private void payBySponsor(InvoiceEntity invoice, UserCreditDetailDto credit, FinanceCorporatePersonnelCreditEntity wallet) {
        //init
        BigDecimal lastWalletCredit = wallet.getCreditAmount();
        BigDecimal afterCredit = lastWalletCredit.subtract(credit.getCreditPayableAmount());
        //check
        if (wallet.getExpireDate().before(new Date()))
            throw new CreditExpireException();
        if (wallet.getStatus() != CorporatePersonnelCreditStatusEnum.ACTIVE)
            throw new CreditIsNotActiveException();
        if (lastWalletCredit.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        if (afterCredit.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        //update personnel credit
        wallet.setCreditAmount(afterCredit);
        if(afterCredit.compareTo(BigDecimal.ZERO)==0){
            //TODO check THIS
            wallet.setStatus(CorporatePersonnelCreditStatusEnum.COMPLETE);
        }
        financeCorporatePersonnelCreditRepository.update(wallet);
        //add personel credit transaction

        financeCorporatePersonnelCreditTransactionRepository.add(FinanceCorporatePersonnelCreditTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(lastWalletCredit)
                .personnelCredit(wallet)
                .isChecked(false)
                .transactionType(TransactionBaseType.CORPORATE_PERSONNEL)
                .amount(credit.getCreditPayableAmount().negate())
                .build());
        //update corporate deposit
        FinanceCorporateEntity financeCorporate = null;
        try {
            financeCorporate = wallet.getCorporatePersonnel().getCorporate().getFinanceCorporate();
        } catch (Exception e) {
        }

        if (financeCorporate == null)
            throw new NotFoundException();
        BigDecimal lastCorporateDeposit = financeCorporate.getTotalDeposit();
        BigDecimal afterCorporateDeposit = lastCorporateDeposit.subtract(credit.getCreditPayableAmount());
        financeCorporate.setTotalDeposit(afterCorporateDeposit);
        //update corporate total credit
        BigDecimal lastCorporateTotalCredit = financeCorporate.getTotalCredits();
        BigDecimal afterCorporateCredit = lastCorporateTotalCredit.subtract(credit.getCreditPayableAmount());
        financeCorporate.setTotalCredits(afterCorporateCredit);
        financeCorporateRepository.update(financeCorporate);
        //add transaction corporate deposit
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(lastCorporateDeposit)
                .transactionCorporateType(TransactionCorporateType.DEPOSIT)
                .financeCorporate(financeCorporate)
                .isChecked(false)
                .transactionType(TransactionBaseType.CORPORATE)
                .amount(credit.getCreditPayableAmount().negate())
                .build());

        //add transaction total credit
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(lastCorporateTotalCredit)
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .financeCorporate(financeCorporate)
                .isChecked(false)
                .transactionType(TransactionBaseType.CORPORATE)
                .amount(credit.getCreditPayableAmount().negate())
                .build());
    }

    private void payByPersonal(InvoiceEntity invoice, UserCreditDetailDto credit, FinanceUserEntity wallet) {

        //chenge wallet amount
        BigDecimal lastBalance = wallet.getTotalDeposit();
        BigDecimal afterBalance = lastBalance.subtract(credit.getCreditPayableAmount());
        if (lastBalance.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        if (afterBalance.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        wallet.setTotalDeposit(afterBalance);
        financeUserRepository.update(wallet);
        //add user wallet transaction
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(lastBalance)
                .financeUser(wallet)
                .isChecked(false)
                .transactionType(TransactionBaseType.USER)
                .amount(credit.getCreditPayableAmount().negate())
                .build());


    }

    private void payByNonWithdrawable(InvoiceEntity invoice, UserCreditDetailDto credit, FinanceUserEntity wallet) {
        //chenge wallet amount
        BigDecimal lastBalance = wallet.getTotalDeposit();
        BigDecimal afterBalance = lastBalance.subtract(credit.getCreditPayableAmount());
        if (lastBalance.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        if (afterBalance.compareTo(BigDecimal.ZERO) < 0)
            throw new CreditCannotBeNegativeException();
        wallet.setTotalDeposit(afterBalance);
        financeUserRepository.update(wallet);
        //add user wallet transaction
        financeUserTransactionRepository.add(FinanceUserTransactionEntity.builder()
                .serial(invoice.getSerial())
                .transactionStatus(TransactionStatus.COMPLETE)
                .latestBalance(lastBalance)
                .financeUser(wallet)
                .isChecked(false)
                .transactionType(TransactionBaseType.USER)
                .amount(credit.getCreditPayableAmount().negate())
                .build());
    }


    @Transactional
    public InvoiceEntity createPurchasedItems(InvoiceEntity invoice) throws Exception {
        for (InvoiceBuyableEntity invoiceBuyable : invoice.getInvoiceBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList())) {
            switch (invoiceBuyable.getBuyableType()) {
                case SUBSCRIBE:
                    for (int i = 0; i < invoiceBuyable.getCount(); i++) {
                        addSubscribe(invoice, invoiceBuyable);
                    }
                    break;
                case COURSE:
                    throw new Exception("آیتم برای خرید آماده نیست");
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
        }
        invoice.setStatus(InvoiceStatus.COMPLETED);
        invoiceRepository.update(invoice);
        return invoice;
    }

    public boolean checkBuyableCanPurchase(List<InvoiceBuyableEntity<?>> buyables) throws Exception{
        for(InvoiceBuyableEntity buyable:buyables){
            switch (buyable.getBuyableType()) {
                case SUBSCRIBE:
                    break;
                case COURSE:
                    throw new Exception("آیتم برای خرید آماده نیست");
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
        }
        return true;
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
                .key(GenerateNewKey())
                .place(invoiceBuyable.getPlace())
                .customer(invoice.getUser())
                .Serials(List.of(invoice.getSerial()))
                .coaches(ticketSubscribe.getCoaches().stream().filter(o->!o.isDeleted()).map(c -> UserEntity.builder().id(c.getId()).build()).collect(Collectors.toList()))
                .purchasedType(PurchasedType.SUBSCRIBE)
                .status(SubscribePurchasedStatus.READY_TO_ACTIVE)
                .ticketSubscribe(ticketSubscribe)
                .timing(ticketSubscribe.getTiming())
                .entryTotalCount(ticketSubscribe.getEntryTotalCount())
                .subscribeStatus(ticketSubscribe.getSubscribeStatus())
                .ticketSubscribeExpireDate(calender.getTime())
                .expireDate(calender.getTime())
                .build());
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
            priceToPay = buyables.stream().filter(b -> !b.isDeleted())
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
        var buyables = invoice.getInvoiceBuyables().stream().filter(o->!o.isDeleted()).collect(Collectors.toList());
        BigDecimal priceToPay = BigDecimal.ZERO;
        priceToPay = buyables.stream().filter(b -> !b.isDeleted())
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

    public InvoiceFoodEntity addFoodBuyableToInvoice(InvoiceEntity invoice, TicketFoodMenuEntity menu, Short count) {

        InvoiceFoodEntity invoiceFood = InvoiceFoodEntity.builder()
                .name(menu.getFoodItem().getName())
                .description(menu.getFoodItem().getDescription())
                .discount(menu.getFoodItem().getDiscount())
                .date(menu.getDate())
                .foodMenus(menu)
                .placePrice(menu.getFoodItem().getPlacePrice())
                .buyableType(menu.getFoodItem().getBuyableType())
                .place(menu.getFoodItem().getPlace())
                .beneficiary(menu.getFoodItem().getBeneficiary())
                .unitPrice(menu.getFoodItem().getPrice())
                .count(count)
                .invoice(invoice)
                .foodMenus(menu)
                .buyable(menu.getFoodItem())
                .build();
        var result = invoiceFoodRepository.add(invoiceFood);
        return result;
    }
    public InvoiceSubscribeEntity addSubscribeBuyableToInvoice(InvoiceEntity invoice, TicketSubscribeEntity subscribe, Short count) {

        InvoiceSubscribeEntity invoiceSubscribe = InvoiceSubscribeEntity.builder()
                .name(subscribe.getName())
                .description(subscribe.getDescription())
                .discount(subscribe.getDiscount())
                .placePrice(subscribe.getPlacePrice())
                .buyableType(subscribe.getBuyableType())
                .gender(subscribe.getGender())
                .place(subscribe.getPlace())
                .beneficiary(subscribe.getBeneficiary())
                .unitPrice(subscribe.getPrice())
                .count(count)
                .invoice(invoice)
                .buyable(subscribe)
                .build();
        var result = invoiceSubscribeRepository.add(invoiceSubscribe);
        return result;
    }

    @Transactional
    public InvoiceEntity getUserBasket(InvoiceParam invoiceParam,Long corporateId) {

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
                var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                        .serial(java.util.UUID.randomUUID().toString())
                        .processTypeEnum(ProcessTypeEnum.TRA_CHECKOUT_BASKET)
                        .build());
                return invoiceRepository.add(InvoiceEntity.builder()
                        .status(InvoiceStatus.DRAFT)
                        .fullName(currentUser.getFullName())
                        .user(currentUser)
                        .serial(serial)
                        .phoneNumber(currentUser.getPhoneNumber())
                        .gender(currentUser.getGender())
                        .nationalCode(currentUser.getNationalCode())
                        .corporate(getCorporate(corporateId))
                        .totalPrice(BigDecimal.ZERO)
                        .priceToPay(BigDecimal.ZERO)
                        .build());
            }
        }
    }
    private CorporateEntity getCorporate(Long corporateId){
        try {
            return corporateRepository.getById(corporateId);
        }catch (Exception e){}
        return null;
    }

    private UserEntity getcurrentUser() {
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        return (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
    }

    public void CancellAllDrafts(Long userId) {
        var userDraftInvoices = invoiceRepository.findByUserIdAndStatusAndDeletedIsFalse(userId, InvoiceStatus.DRAFT);
        for (InvoiceEntity invoice : userDraftInvoices) {
            invoice.setStatus(InvoiceStatus.CANCELLED);
        }
        if (userDraftInvoices.size() > 0)
            invoiceRepository.updateAll(userDraftInvoices);
    }

    public InvoiceEntity AddNewInvoice(UserEntity user, FinanceSerialEntity serial,Long corporateId) {
        var invoice = InvoiceEntity.builder()
                .status(InvoiceStatus.DRAFT)
                .fullName(user.getFullName())
                .user(user)
                .serial(serial)
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .nationalCode(user.getNationalCode())
                .totalPrice(BigDecimal.ZERO)
                .priceToPay(BigDecimal.ZERO)
                .corporate(getCorporate(corporateId))
                .build();
        return invoiceRepository.add(invoice);
    }

    public void sendSms(InvoiceEntity invoice) {
        //TODO sms To Place for preparation
        List<InvoiceBuyableEntity> buyableEntities = invoice.getInvoiceBuyables().stream().filter(o->!o.isDeleted()).collect(Collectors.toList());
        if(buyableEntities.size()<1){
            throw new BadRequestException("بلیط وجود ندارد");
        }else if (buyableEntities.size() == 1) {
            try {
                smsService.sendYouBuySubscribe(SmsDto.builder()
                        .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                        .userNumber(invoice.getUser().getPhoneNumber())
                        .text1(buyableEntities.get(0).getName())
                        .text2(buyableEntities.get(0).getPlace().getName())
                        .build()
                );
            } catch (Exception e) {
            }
            PlaceEntity place= buyableEntities.get(0).getPlace();
            sendSellMessageToPlace(place,buyableEntities.get(0));
        } else {
            String ticketsName = "";
            for(InvoiceBuyableEntity ticket : buyableEntities){
                ticketsName += ticket.getName()+" ";
                sendSellMessageToPlace(ticket.getPlace(),ticket);
            }
            if(ticketsName.length()>36)
                ticketsName = ticketsName.substring(0,36)+"...";
            try {
                smsService.sendYouBuyMultipleSubscribe(SmsDto.builder()
                        .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                        .userNumber(invoice.getUser().getPhoneNumber())
                        .text1(ticketsName)
                        .build()
                );
            } catch (Exception e) {
            }
        }

    }

    private void sendSellMessageToPlace(PlaceEntity place, InvoiceBuyableEntity invoiceBuyables) {
        if(((List<PurchasedBaseEntity>)place.getPurchased().stream().filter(o->!((PurchasedBaseEntity)o).isDeleted()).collect(Collectors.toList())).size()<1){
            try {
                List<PlacePersonnelEntity> owners =(List<PlacePersonnelEntity>) place.getPlaceOwners().stream().filter(pl->!((PlacePersonnelEntity)pl).isDeleted()).filter(po->((PlacePersonnelEntity)po).getPlacePersonnelRoles().stream().filter(ppr->!ppr.isDeleted()).map(PlacePersonnelRoleEntity::getRole).collect(Collectors.toList()).contains(PlacePersonnelRoleEnum.PLACE_OWNER)).collect(Collectors.toList());
                for(PlacePersonnelEntity owner:owners){
                    smsService.sendFirstTicketSell(SmsDto.builder()
                            .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                            .userNumber(owner.getUser().getPhoneNumber())
                            .text1(invoiceBuyables.getName())
                            .build()
                    );
                }
            } catch (Exception e) {
            }
        }else{
            try {
                List<PlacePersonnelEntity> owners = (List<PlacePersonnelEntity>) place.getPlaceOwners().stream().filter(pl->!((PlacePersonnelEntity)pl).isDeleted()).filter(po->((PlacePersonnelEntity)po).getPlacePersonnelRoles().stream().filter(pl->!pl.isDeleted()).map(PlacePersonnelRoleEntity::getRole).collect(Collectors.toList()).contains(PlacePersonnelRoleEnum.PLACE_OWNER)).collect(Collectors.toList());
                for(PlacePersonnelEntity owner:owners){
                    smsService.sendOrdinaryTicketSell(SmsDto.builder()
                            .smsType(SmsTypes.USER_BUY_SUBSCRIBE)
                            .userNumber(owner.getUser().getPhoneNumber())
                            .text1(invoiceBuyables.getName())
                            .build()
                    );
                }
            } catch (Exception e) {
            }
        }

    }

    public UserHowToPayDto getSimpleHowToPay(InvoiceEntity invoice) {
        //only by user
        UserCreditDto userCredits = userService.getMyCredits();
        UserHowToPayDto result = new UserHowToPayDto();
        var creditList = userCredits.getCreditDetail().stream().filter(o->!o.isDeleted()).filter(c -> c.getCreditAmount().compareTo(BigDecimal.ZERO) > 0 && c.getCreditPayableAmount().compareTo(BigDecimal.ZERO) > 0).collect(Collectors.toList());
        if (invoice.getPriceToPay().compareTo(userCredits.getTotalCredit()) > 0)
            return UserHowToPayDto.builder()
                    .creditDetail(creditList)
                    .creditCovrage(false)
                    .totalCredit(userCredits.getTotalCredit()).build();

        result.setCreditDetail(new ArrayList<>());
        BigDecimal totalToPay = invoice.getPriceToPay();
        for (var credit : creditList) {
            if (totalToPay.compareTo(BigDecimal.ZERO) > 0 && totalToPay.subtract(credit.getCreditPayableAmount()).compareTo(BigDecimal.ZERO) > 0) {
                totalToPay = totalToPay.subtract(credit.getCreditPayableAmount());
                result.getCreditDetail().add(credit);
            } else if (totalToPay.compareTo(BigDecimal.ZERO) > 0 && totalToPay.subtract(credit.getCreditPayableAmount()).compareTo(BigDecimal.ZERO) < 0) {
                credit.setCreditPayableAmount(totalToPay);
                result.getCreditDetail().add(credit);
                result.setCreditCovrage(true);
                totalToPay = BigDecimal.ZERO;
            }
        }
        return result;
    }

    public UserHowToPayDto getModerateHowToPay(InvoiceEntity invoice, InvoiceCheckoutParam param) {
        throw new FunctionNotAvalable();
    }

    public UserHowToPayDto getAdvancedHowToPay(InvoiceEntity invoice, InvoiceCheckoutParam param) {
        UserCreditDto userCredits = userService.getAllCreditsByUser(UserParam.builder().id(invoice.getUser().getId()).build());
        var creditList = userCredits.getCreditDetail().stream().filter(o->!o.isDeleted()).filter(c -> c.getCreditAmount().compareTo(BigDecimal.ZERO) > 0 && c.getCreditPayableAmount().compareTo(BigDecimal.ZERO) > 0).collect(Collectors.toList());
        if (userCredits.getTotalCredit().compareTo(invoice.getPriceToPay()) < 0)
            throw new TatalUserCreditIsNotEnough();
        if (param.getPrice().compareTo(invoice.getPriceToPay()) != 0)
            throw new PricesIsNotCompatible();
        if (param.getCheckout().stream().filter(o->!o.isDeleted()).map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add).compareTo(invoice.getPriceToPay()) != 0)
            throw new PricesIsNotCompatible();

        UserHowToPayDto result = UserHowToPayDto.builder()
                .creditCovrage(true)
                .totalCredit(invoice.getPriceToPay()).build();

        var credits = new ArrayList<UserCreditDetailDto>();

        for (CheckoutDetailParam checkout : param.getCheckout()) {
            var credit = creditList.stream().filter(o->!o.isDeleted()).filter(cr -> cr.getId().equals(checkout.getId())).findFirst().orElse(null);
            if (credit == null)
                throw new PricesIsNotCompatible();
            credit.setCreditPayableAmount(checkout.getAmount());
            credits.add(credit);
        }
        result.setCreditDetail(credits);
        return result;
    }

    private String GenerateNewKey(){
        String alphabet = "1234567890abcdefghijlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String code = "";
        //generate code
        for(int i=0;i<8;i++){
            Random r = new Random();
            code += alphabet.charAt(r.nextInt(alphabet.length()));
        }
        //check Code
        var ticket = purchasedSubscribeRepository.findByKey(code);
        if(ticket!=null)
            code = GenerateNewKey();
        return code;
    }
}
