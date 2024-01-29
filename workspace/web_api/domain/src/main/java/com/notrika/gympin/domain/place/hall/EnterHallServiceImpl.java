package com.notrika.gympin.domain.place.hall;

import com.notrika.gympin.common.place.hallEnter.dto.EnterHallRequestDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallConfirmParam;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallRequestParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.place.hallEnter.dto.EnterHallConfirmDto;
import com.notrika.gympin.common.place.hallEnter.service.EnterHallService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PurchasedSubscribeEntryRequstRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryRequstEntity;
//import com.notrika.gympin.persistence.entity.ticket.common.TicketSubscribeHallActiveTime;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Service(value = "athleteEnterHallService")
public class EnterHallServiceImpl implements EnterHallService {

    @Autowired
    private PurchasedSubscribeEntryRequstRepository purchasedSubscribeEntryRequstRepository;


    @Autowired
    private HallServiceImpl hallService;

    @Override
    @Deprecated
    public EnterHallRequestDto request(EnterHallRequestParam param) {
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        HallEntity hall = hallService.getEntityById(param.getHall().getId());
//        Optional<TicketSubscribeHallActiveTime> HallEntity = null; //ticketSubscribeOfUser.getTicketSubscribeHalls().stream().filter(g -> g.getHall().equals(hall)).findAny();
//        if (HallEntity.isEmpty()) {
//            throw new HallNotInTicketSubscribeException();
//        }
//        TicketSubscribeHallActiveTime ticketSubscribeHallEntity = HallEntity.get();
//        Long enterCount = hallEnterRepository.countAllByAthleteAndHallAndSubscribeEntryStatusAndDeletedIsFalse(user, hall, SubscribeEntryStatus.ACCEPTED);
//        if (enterCount >= ticketSubscribeHallEntity.getEntryCount()) {
//            throw new EnterHallLimitException();
//        }
        Timestamp storeTime = new Timestamp(new Date().getTime());
        PurchasedSubscribeEntryRequstEntity purchasedSubscribeEntryRequstEntity = new PurchasedSubscribeEntryRequstEntity();
        purchasedSubscribeEntryRequstEntity.setReferenceId(UUID.randomUUID().toString());
        purchasedSubscribeEntryRequstEntity.setRequester(user);
        purchasedSubscribeEntryRequstEntity.setHall(hall);
        purchasedSubscribeEntryRequstEntity.setRequestDate(storeTime);
        purchasedSubscribeEntryRequstEntity.setLastUpdateStatusDate(storeTime);
        purchasedSubscribeEntryRequstEntity.setSubscribeEntryStatus(SubscribeEntryStatus.REQUESTED);
        PurchasedSubscribeEntryRequstEntity entity = purchasedSubscribeEntryRequstRepository.add(purchasedSubscribeEntryRequstEntity);
        EnterHallRequestDto dto = new EnterHallRequestDto();
        dto.setId(entity.getId());
        dto.setHall(HallConvertor.convertToDto(entity.getHall()));
        dto.setReferenceId(entity.getReferenceId());
        return dto;
    }



    @Override
    @Deprecated
    public EnterHallConfirmDto confirmEnterHall(EnterHallConfirmParam enterHallconfirmParam) {
        Timestamp storeTime = new Timestamp(new Date().getTime());
        PurchasedSubscribeEntryRequstEntity purchasedSubscribeEntryRequstEntity = purchasedSubscribeEntryRequstRepository.findAllByReferenceIdAndDeletedIsFalse(enterHallconfirmParam.getReferenceId());
        purchasedSubscribeEntryRequstEntity.setLastUpdateStatusDate(storeTime);
        purchasedSubscribeEntryRequstRepository.update(purchasedSubscribeEntryRequstEntity);
        EnterHallConfirmDto dto=new EnterHallConfirmDto();
        return dto;
    }
}
