package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.notrika.gympin.domain.settings.schedules.scheduleDiscounts.discountAction.*;

@Service
public class scheduleDiscounts {

    enum discountAction{addDiscount,removeDiscount,noAction};

    @Autowired
    private GymRepository placeGymRepository;
    @Autowired
    private ManageSettingsRepository manageSettingsRepository;
    @Autowired
    private TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    private TicketDiscountHistoryRepository ticketDiscountHistoryRepository;
    List<BuyableDiscountHistoryEntity> historyToAdd;
    List<TicketSubscribeEntity> ticketsToUpdate;

    public void UpdateAutoTicketSubscribeDiscount() {
        historyToAdd = new ArrayList<>();
        ticketsToUpdate = new ArrayList<>();
        List<GymEntity> places = placeGymRepository.findAllByDeletedIsFalseAndAutoDiscountIsTrueAndStatus(PlaceStatusEnum.ACTIVE);
        for (GymEntity place : places) {
            if (placeCanDiscount(place)) {
                for (int i = 0; i < getPlaceTicketsCount(place); i++) {
                    TicketSubscribeEntity ticket = getPlaceTicekt(place, i);
                    if (ticket.getStartIncredible() == null) {
                        switch (ticketCanDiscount(ticket)) {
                            case addDiscount:addDiscountTicket(ticket);
                                break;
                            case removeDiscount: removeDiscountTicket(ticket);
                                break;
                            default: break;
                        }
                    }
                }
            }
        }
        ticketSubscribeRepository.updateAll(ticketsToUpdate);
        ticketDiscountHistoryRepository.addAll(historyToAdd);

        historyToAdd.clear();
        ticketsToUpdate.clear();
    }

    private int getPlaceTicketsCount(GymEntity place) {
        return getPlaceActiveTickets(place).size();
    }

    private TicketSubscribeEntity getPlaceTicekt(GymEntity place, Integer i) {
        return getPlaceActiveTickets(place).get(i);
    }

    private List<TicketSubscribeEntity> getPlaceActiveTickets(GymEntity place) {
        return place.getTicketSubscribes().stream().filter(t -> !t.isDeleted() && t.getEnable()).collect(Collectors.toList());
    }

    private boolean placeCanDiscount(GymEntity place) {
        //TODO check last discount and do logical terms
        return Math.random() > 0.8;
    }

    private discountAction ticketCanDiscount(TicketSubscribeEntity ticket) {
        //TODO check last discount and do logical terms
        return Math.random() > 0.8? addDiscount: removeDiscount;
    }


    private void addDiscountTicket(TicketSubscribeEntity ticket) {
        try {
            Double commissionFee = ticket.getBeneficiary().getCommissionFee();
            Integer minIncredibleDiscount = Integer.valueOf(manageSettingsRepository.findByKeyAndDeletedFalse("TICKET_INCREDIBLES_MIN").getValue());
            Double minDiscount = 2d;
            Double maxDiscount = Math.min(Math.min(minIncredibleDiscount, commissionFee-5), 10);
            BigDecimal beforPrice = ticket.getPrice();
            Short newDiscount = (short) Math.round(Math.random()*(maxDiscount-minDiscount)+minDiscount);
            if (ticket.getPlacePrice() != null&&maxDiscount>minDiscount&&newDiscount>minDiscount) {
                ticket.setDiscount(newDiscount);
                BigDecimal newPrice = ticket.getPlacePrice().multiply(BigDecimal.valueOf(1 - (newDiscount * 0.01))).setScale(-3, RoundingMode.HALF_UP);
                ticket.setPrice(newPrice);
                ticketsToUpdate.add(ticket);
                historyToAdd.add(
                        BuyableDiscountHistoryEntity.builder()
                                .buyable(ticket)
                                .discount(newDiscount)
                                .beforPrice(beforPrice)
                                .afterPrice(newPrice)
                                .build());
            }
        } catch (Exception e) {
        }
    }

    private void removeDiscountTicket(TicketSubscribeEntity ticket) {
        try {
            BigDecimal beforPrice = ticket.getPrice();
            ticket.setDiscount((short) 0);
            ticket.setPrice(ticket.getPlacePrice());
            ticketsToUpdate.add(ticket);
            historyToAdd.add(
                    BuyableDiscountHistoryEntity.builder()
                            .buyable(ticket)
                            .discount((short) 0)
                            .beforPrice(beforPrice)
                            .afterPrice(ticket.getPlacePrice())
                            .build());

        } catch (Exception e) {
        }
    }

}
