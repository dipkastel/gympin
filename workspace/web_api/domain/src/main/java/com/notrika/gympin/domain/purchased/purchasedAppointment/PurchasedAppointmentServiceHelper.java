package com.notrika.gympin.domain.purchased.purchasedAppointment;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.place.parts.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.finance.Invoice.InvoiceServiceHelper;
import com.notrika.gympin.domain.util.convertor.PurchasedAppointmentConvertor;
import com.notrika.gympin.persistence.dao.repository.invoice.InvoiceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.appointment.PurchasedAppointmentRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedAppointment.PurchasedAppointmentEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus.*;

@Service
public class PurchasedAppointmentServiceHelper {

    @Autowired
    PurchasedAppointmentRepository purchasedAppointmentRepository;

    @Autowired
    SettingsService settingsService;

    @Autowired
    InvoiceServiceHelper invoiceServiceHelper;

    @Autowired
    InvoiceRepository invoiceRepository;

    public boolean checkForAccess(PurchasedAppointmentEntity purchesedAppointment, Long placeId) {

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        try{
            UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            var personnel = userRequester.getPlacePersonnel().stream().filter(p -> (p.getPlace().getId().equals(placeId))&&!p.isDeleted()).findFirst().get();
            if(personnel.getPlacePersonnelRoles().stream().filter(o->!o.isDeleted()).anyMatch(r->r.getRole().equals(PlacePersonnelRoleEnum.PLACE_OWNER)))
                return true;
            var access = personnel.getPlacePersonnelBuyableAccess();
            return access.stream().filter(o->!o.isDeleted()).filter(o-> o.getBuyable().getId().equals(purchesedAppointment.getTicketAppointment().getId())).findFirst().get().getAccess();
        }catch (Exception e){return false;}

    }

    @Transactional
    public PurchasedAppointmentEntity checkForExpire(PurchasedAppointmentEntity appointment) {
        //TODO fix this shit
//        switch (appointment.getStatus()) {
//            case EXPIRE:
//            case COMPLETE:
//            case CANCEL: {
//                return appointment;
//            }
//            case ACTIVE:{
//                if (appointment.getExpireDate().before(new Date())) {
//                    appointment.setStatus(EXPIRE);
//                    purchasedAppointmentRepository.update(appointment);
//                }
//                if (appointment.getEntryList().stream().filter(o->!o.isDeleted()).filter(te -> te.getExitDate() != null).count() >= Long.valueOf(appointment.getEntryTotalCount())) {
//                    appointment.setStatus(COMPLETE);
//                    purchasedAppointmentRepository.update(appointment);
//                }
//                for (var entry : appointment.getEntryList()) {
//                    if (entry.getExitDate() == null && entry.getAppointmentEntryStatus().equals(AppointmentEntryStatus.ACCEPTED)) {
//                        Calendar c = Calendar.getInstance();
//                        c.setTime(entry.getEnterDate());
//                        c.add(Calendar.HOUR, 4);
//                        if (c.getTime().before(new Date())) {
//                            entry.setExitDate(c.getTime());
//                            purchasedAppointmentEntryRepository.update(entry);
//                        }
//                    }
//                    if (entry.getAppointmentEntryStatus().equals(AppointmentEntryStatus.REQUESTED)) {
//                        Calendar c = Calendar.getInstance();
//                        c.setTime(entry.getCreatedDate());
//                        c.add(Calendar.HOUR, 3);
//                        if (c.getTime().before(new Date())) {
//                            entry.setEnterDate(entry.getCreatedDate());
//                            entry.setExitDate(c.getTime());
//                            entry.setAppointmentEntryStatus(AppointmentEntryStatus.REJECTED);
//                            purchasedAppointmentEntryRepository.update(entry);
//                        }
//                    }
//                }
//                return appointment;
//            }
//            case READY_TO_ACTIVE: {
//                Date exprireAppointmentDate = new Date(appointment.getCreatedDate().getTime());
//                exprireAppointmentDate.setHours(appointment.getCreatedDate().getHours()+ PurchasedAppointmentConvertor.getTicketUsageThreshold(settingsService));
//                if(exprireAppointmentDate.before(new Date())){
//
//                    if(appointment.getStatus() == READY_TO_ACTIVE) {
//                        RefundedAppointment(appointment);
//                    }
//                }
//                if (appointment.getEntryList().stream().filter(o->!o.isDeleted()).filter(te -> te.getExitDate() != null).count() >= Long.valueOf(appointment.getEntryTotalCount())) {
//                    appointment.setStatus(COMPLETE);
//                    purchasedAppointmentRepository.update(appointment);
//                }
//                for (var entry : appointment.getEntryList()) {
//                    if (entry.getExitDate() == null && entry.getAppointmentEntryStatus().equals(AppointmentEntryStatus.ACCEPTED)) {
//                        Calendar c = Calendar.getInstance();
//                        c.setTime(entry.getEnterDate());
//                        c.add(Calendar.HOUR, 4);
//                        if (c.getTime().before(new Date())) {
//                            entry.setExitDate(c.getTime());
//                            purchasedAppointmentEntryRepository.update(entry);
//                        }
//                    }
//                    if (entry.getAppointmentEntryStatus().equals(AppointmentEntryStatus.REQUESTED)) {
//                        Calendar c = Calendar.getInstance();
//                        c.setTime(entry.getCreatedDate());
//                        c.add(Calendar.HOUR, 3);
//                        if (c.getTime().before(new Date())) {
//                            entry.setEnterDate(entry.getCreatedDate());
//                            entry.setExitDate(c.getTime());
//                            entry.setAppointmentEntryStatus(AppointmentEntryStatus.REJECTED);
//                            purchasedAppointmentEntryRepository.update(entry);
//                        }
//                    }
//                }
//                return appointment;
//            }
//            default:
//                return appointment;
//
//        }
        return null;
    }

    @Transactional
    public void RefundedAppointment(PurchasedAppointmentEntity purchasedAppointmentEntity){
            FinanceSerialEntity serial =  purchasedAppointmentEntity.getSerials().stream().filter(s->s.getProcessTypeEnum()== ProcessTypeEnum.TRA_CHECKOUT_BASKET).findFirst().get();

            if(serial.getPurchasedBases().size()==1){
                //TODO fix this
//                InvoiceEntity invoice = serial.getInvoices().get(0);
//                List<FinanceCorporateTransactionEntity> corporateTransactions =  serial.getCorporateTransactions();
//                invoiceServiceHelper.refoundCorporateTransaction(corporateTransactions,serial);
//
//               List<FinanceUserTransactionEntity> userTransactions =  serial.getUserTransactions();
//               invoiceServiceHelper.refoundUserDeposit(userTransactions,serial);
//
//
//               List<FinanceCorporatePersonnelCreditTransactionEntity> personnelCredits =  serial.getPersonnelCreditTransactions();
//               invoiceServiceHelper.refoundpersonelCredit(personnelCredits,serial);
//
//                if(purchasedAppointmentEntity.getStatus()==EXPIRE||purchasedAppointmentEntity.getStatus()==ACTIVE||purchasedAppointmentEntity.getStatus()==COMPLETE){
//                    //get price from place
//                    FinanceSerialEntity useSerial =  purchasedAppointmentEntity.getSerials().stream().filter(s->s.getProcessTypeEnum()== ProcessTypeEnum.TRA_USE_TICKET).findFirst().get();
//
//                    List<FinanceUserTransactionEntity> sellerTransaction =  useSerial.getUserTransactions();
//                    invoiceServiceHelper.refundPlaceSeller(sellerTransaction,useSerial);
//
//
//                    List<FinanceIncomeTransactionEntity> incomeTransaction =  useSerial.getIncomeTransactions();
//                    invoiceServiceHelper.refundIncome(incomeTransaction,useSerial,purchasedAppointmentEntity);
//
//                    List<FinanceDiscountTransactionEntity> discountTransaction =  useSerial.getDiscount();
//                    invoiceServiceHelper.refundDiscount(discountTransaction,useSerial,purchasedAppointmentEntity);
//
//                }
//
//                purchasedAppointmentEntity.setStatus(REFUNDED);
//                purchasedAppointmentRepository.update(purchasedAppointmentEntity);
//
//                invoice.setStatus(InvoiceStatus.REFUNDED);
//                invoiceRepository.update(invoice);

            }else{
                //TODO find a solution for multiple purchased refound
                //at the moment user cannot buy multiple
            }
    }
}
