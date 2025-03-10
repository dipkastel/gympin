package com.notrika.gympin.domain.purchased.purchasedSubscribe;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.COMPLETE;
import static com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.EXPIRE;

@Service
public class PurchasedSubscribeServiceHelper {

    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;

    @Autowired
    PurchasedSubscribeEntryRepository purchasedSubscribeEntryRepository;

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

    public PurchasedSubscribeEntity checkForExpire(PurchasedSubscribeEntity subscribe) {
        switch (subscribe.getStatus()) {
            case EXPIRE:
            case COMPLETE:
            case PROCESSING:
            case CANCEL: {
                return subscribe;
            }
            case ACTIVE:
            case READY_TO_ACTIVE: {
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
}
