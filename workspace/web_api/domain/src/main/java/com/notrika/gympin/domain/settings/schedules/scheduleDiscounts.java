package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class scheduleDiscounts {

    @Autowired
    private PlaceGymRepository placeGymRepository;
    @Autowired
    private TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    private TicketDiscountHistoryRepository ticketDiscountHistoryRepository;


    @Transactional
    public void UpdateAutoTicketSubscribeDiscount() {
      List<PlaceGymEntity> places =  placeGymRepository.findAllByDeletedIsFalseAndAutoDiscountIsTrue();
      List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
      List<TicketSubscribeEntity> ticketSubscribeEntityListToUpdate = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            if(Math.random()>0.5)
            for (BuyableEntity<TicketSubscribeEntity> buyable : place.getTicketSubscribes().stream().filter(t->!t.isDeleted()).collect(Collectors.toList())) {
                BigDecimal beforPrice = buyable.getPrice();
                Double commissionFee = buyable.getBeneficiary().getCommissionFee();
                Short newDiscount = (short) Math.round(commissionFee*((Math.random() * (0.6)) + 0.2));


                if(newDiscount>1&&buyable.getPlacePrice()!=null&&buyable instanceof TicketSubscribeEntity){
                    buyable.setDiscount(newDiscount);
                    BigDecimal newPrice = buyable.getPlacePrice().multiply(BigDecimal.valueOf(1-(newDiscount*0.01))).setScale(-3, RoundingMode.HALF_UP);
                    buyable.setPrice(newPrice);
                    ticketSubscribeEntityListToUpdate.add((TicketSubscribeEntity) buyable);

                    buyableDiscountHistoryEntityListToAdd.add(
                            BuyableDiscountHistoryEntity.builder()
                                    .buyable(buyable)
                                    .discount(newDiscount)
                                    .beforPrice(beforPrice)
                                    .afterPrice(newPrice)
                                    .build());
                }


            }
        }
        ticketSubscribeRepository.updateAll(ticketSubscribeEntityListToUpdate);
        ticketDiscountHistoryRepository.addAll(buyableDiscountHistoryEntityListToAdd);

    }
}
