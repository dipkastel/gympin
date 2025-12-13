package com.notrika.gympin.domain.purchased.purchasedSubscribe;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.finance.Invoice.InvoiceServiceHelper;
import com.notrika.gympin.domain.util.convertor.PurchasedSubscribeConvertor;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.*;

@Service
public class PurchasedSubscribeServiceHelper {

    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;

    @Autowired
    PurchasedSubscribeEntryRepository purchasedSubscribeEntryRepository;

    @Autowired
    SettingsService settingsService;

    @Autowired
    InvoiceServiceHelper invoiceServiceHelper;

    @Autowired
    InvoiceRepository invoiceRepository;

    public boolean checkForAccess(PurchasedSubscribeEntity purchesedSubscribe, Long placeId) {

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        try{
            UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            var personnel = userRequester.getPlacePersonnel().stream().filter(p -> (p.getPlace().getId().equals(placeId))&&!p.isDeleted()).findFirst().get();
            if(personnel.getPlacePersonnelRoles().stream().filter(o->!o.isDeleted()).anyMatch(r->r.getRole().equals(PlacePersonnelRoleEnum.PLACE_OWNER)))
                return true;
            var access = personnel.getPlacePersonnelBuyableAccess();
            return access.stream().filter(o->!o.isDeleted()).filter(o-> o.getBuyable().getId().equals(purchesedSubscribe.getTicketSubscribe().getId())).findFirst().get().getAccess();
        }catch (Exception e){return false;}

    }

    @Transactional
    public PurchasedSubscribeEntity checkForExpire(PurchasedSubscribeEntity subscribe) {
        switch (subscribe.getStatus()) {
            case EXPIRE:
            case COMPLETE:
            case PROCESSING:
            case CANCEL: {
                return subscribe;
            }
            case ACTIVE:{
                if (subscribe.getExpireDate().before(new Date())) {
                    subscribe.setStatus(EXPIRE);
                    purchasedSubscribeRepository.update(subscribe);
                }
                if (subscribe.getEntryList().stream().filter(o->!o.isDeleted()).filter(te -> te.getExitDate() != null).count() >= Long.valueOf(subscribe.getEntryTotalCount())) {
                    subscribe.setStatus(COMPLETE);
                    purchasedSubscribeRepository.update(subscribe);
                }
                for (var entry : subscribe.getEntryList()) {
                    if (entry.getExitDate() == null && entry.getSubscribeEntryStatus().equals(SubscribeEntryStatus.ACCEPTED)) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getEnterDate());
                        c.add(Calendar.HOUR, 4);
                        if (c.getTime().before(new Date())) {
                            entry.setExitDate(c.getTime());
                            purchasedSubscribeEntryRepository.update(entry);
                        }
                    }
                    if (entry.getSubscribeEntryStatus().equals(SubscribeEntryStatus.REQUESTED)) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getCreatedDate());
                        c.add(Calendar.HOUR, 3);
                        if (c.getTime().before(new Date())) {
                            entry.setEnterDate(entry.getCreatedDate());
                            entry.setExitDate(c.getTime());
                            entry.setSubscribeEntryStatus(SubscribeEntryStatus.REJECTED);
                            purchasedSubscribeEntryRepository.update(entry);
                        }
                    }
                }
                return subscribe;
            }
            case READY_TO_ACTIVE: {
                Date exprireSubscribeDate = new Date(subscribe.getCreatedDate().getTime());
                exprireSubscribeDate.setHours(subscribe.getCreatedDate().getHours()+ PurchasedSubscribeConvertor.getTicketUsageThreshold(settingsService));
                if(exprireSubscribeDate.before(new Date())){

                    if(subscribe.getStatus() == READY_TO_ACTIVE) {
                        RefundedSubscribe(subscribe);
                    }
                }
                if (subscribe.getEntryList().stream().filter(o->!o.isDeleted()).filter(te -> te.getExitDate() != null).count() >= Long.valueOf(subscribe.getEntryTotalCount())) {
                    subscribe.setStatus(COMPLETE);
                    purchasedSubscribeRepository.update(subscribe);
                }
                for (var entry : subscribe.getEntryList()) {
                    if (entry.getExitDate() == null && entry.getSubscribeEntryStatus().equals(SubscribeEntryStatus.ACCEPTED)) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getEnterDate());
                        c.add(Calendar.HOUR, 4);
                        if (c.getTime().before(new Date())) {
                            entry.setExitDate(c.getTime());
                            purchasedSubscribeEntryRepository.update(entry);
                        }
                    }
                    if (entry.getSubscribeEntryStatus().equals(SubscribeEntryStatus.REQUESTED)) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getCreatedDate());
                        c.add(Calendar.HOUR, 3);
                        if (c.getTime().before(new Date())) {
                            entry.setEnterDate(entry.getCreatedDate());
                            entry.setExitDate(c.getTime());
                            entry.setSubscribeEntryStatus(SubscribeEntryStatus.REJECTED);
                            purchasedSubscribeEntryRepository.update(entry);
                        }
                    }
                }
                return subscribe;
            }
            default:
                return subscribe;

        }
    }

    public void enterUser(PurchasedSubscribeEntity subscribeEntity, UserEntity controllingUser) {
        PurchasedSubscribeEntryEntity psubscribeEntryEntity = PurchasedSubscribeEntryEntity.builder()
                .subscribeEntryStatus(SubscribeEntryStatus.ACCEPTED)
                .purchasedSubscribe(subscribeEntity)
                .enterDate(new Date())
                .acceptedBy(controllingUser)
                .build();
        purchasedSubscribeEntryRepository.add(psubscribeEntryEntity);
    }

    public void exitUserFromPlace(PurchasedSubscribeEntryEntity subscribeEntry) {
        subscribeEntry.setExitDate(new Date());
        purchasedSubscribeEntryRepository.update(subscribeEntry);
    }

    @Transactional
    public void RefundedSubscribe(PurchasedSubscribeEntity entity){
            FinanceSerialEntity serial =  entity.getSerials().stream().filter(s->s.getProcessTypeEnum()== ProcessTypeEnum.TRA_CHECKOUT_BASKET).findFirst().get();

            if(serial.getPurchasedBases().size()==1){
                InvoiceEntity invoice = serial.getInvoices().get(0);
                List<FinanceCorporateTransactionEntity> corporateTransactions =  serial.getCorporateTransactions();
                invoiceServiceHelper.refoundCorporateTransaction(corporateTransactions,serial);

               List<FinanceUserTransactionEntity> userTransactions =  serial.getUserTransactions();
               invoiceServiceHelper.refoundUserDeposit(userTransactions,serial);


               List<FinanceCorporatePersonnelCreditTransactionEntity> personnelCredits =  serial.getPersonnelCreditTransactions();
               invoiceServiceHelper.refoundpersonelCredit(personnelCredits,serial);

                if(entity.getStatus()==EXPIRE||entity.getStatus()==ACTIVE||entity.getStatus()==COMPLETE){
                    //get price from place
                    FinanceSerialEntity useSerial =  entity.getSerials().stream().filter(s->s.getProcessTypeEnum()== ProcessTypeEnum.TRA_USE_TICKET).findFirst().get();

                    List<FinanceUserTransactionEntity> sellerTransaction =  useSerial.getUserTransactions();
                    invoiceServiceHelper.refundPlaceSeller(sellerTransaction,useSerial);


                    List<FinanceIncomeTransactionEntity> incomeTransaction =  useSerial.getIncomeTransactions();
                    invoiceServiceHelper.refundIncome(incomeTransaction,useSerial,entity);

                    List<FinanceDiscountTransactionEntity> discountTransaction =  useSerial.getDiscount();
                    invoiceServiceHelper.refundDiscount(discountTransaction,useSerial,entity);

                }

                entity.setStatus(REFUNDED);
                purchasedSubscribeRepository.update(entity);

                invoice.setStatus(InvoiceStatus.REFUNDED);
                invoiceRepository.update(invoice);

            }else{
                //TODO find a solution for multiple purchased refound
                //at the moment user cannot buy multiple
            }
    }
}
