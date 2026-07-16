package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.persistence.dao.repository.place.Gym.GymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class scheduleIncredible {

    @Autowired
    TicketSubscribeRepository ticketSubscribeRepository;

    @Autowired
    ManageSettingsRepository manageSettingsRepository;

    @Autowired
    private TicketDiscountHistoryRepository ticketDiscountHistoryRepository;
    @Autowired
    private GymRepository placeGymRepository;

    @Autowired
    SmsInService smsService;

    List<BuyableDiscountHistoryEntity> historyToAdd;
    List<TicketSubscribeEntity> ticketsToUpdate;

    public void Deactive() {
        List<TicketSubscribeEntity> currentIncredibles = ticketSubscribeRepository.findAllByStartIncredibleIsNotNullAndDeletedIsFalse();
        ticketsToUpdate = new ArrayList<>();
        historyToAdd = new ArrayList<>();
        checkForDeactive(currentIncredibles);
        if(ticketsToUpdate.size()>0){
            ticketSubscribeRepository.updateAll(ticketsToUpdate);
            ticketsToUpdate.clear();
        }
        if(historyToAdd.size()>0){
            ticketDiscountHistoryRepository.addAll(historyToAdd);
            historyToAdd.clear();
        }
    }
    public void Active() {
       ticketsToUpdate = new ArrayList<>();
        addNewIncrediblesByPlace();
        if(ticketsToUpdate.size()>0){
            ticketSubscribeRepository.updateAll(ticketsToUpdate);
            ticketsToUpdate.clear();
        }
    }
    public void AddBySystem() {
        List<TicketSubscribeEntity> currentIncredibles = ticketSubscribeRepository.findAllByStartIncredibleIsNotNullAndDeletedIsFalse();
        ticketsToUpdate = new ArrayList<>();
        historyToAdd = new ArrayList<>();
        addNewIncrediblesBySystem(currentIncredibles);
        if(ticketsToUpdate.size()>0){
            ticketSubscribeRepository.updateAll(ticketsToUpdate);
            ticketsToUpdate.clear();
        }
        if(historyToAdd.size()>0){
            ticketDiscountHistoryRepository.addAll(historyToAdd);
            historyToAdd.clear();
        }
    }


    private void addNewIncrediblesBySystem(List<TicketSubscribeEntity> currentIncredibles) {
        //TODO add value auto incredible instead of auto discount

       if(currentIncredibles.size()<20){

           Double minimum = Double.valueOf(manageSettingsRepository.findByKeyAndDeletedFalse("TICKET_INCREDIBLES_MIN").getValue());
           List<GymEntity> places = placeGymRepository.findAllToAddIncredible(minimum);
           if(places.size()<1)return;
           GymEntity place = selectPlaceToIncredible(places);
           List<TicketSubscribeEntity> tickets = place.getTicketSubscribes().stream().filter(p->p.getEnable()&&!p.isDeleted()).collect(Collectors.toList());
           TicketSubscribeEntity ticket = selectTicketToIncredible(tickets);

           try {
               Double commissionFee = ticket.getBeneficiary().getCommissionFee();
               Double maxDiscount = commissionFee-5;
               BigDecimal beforPrice = ticket.getPrice();
               Short newDiscount = (short) Math.round(Math.random()*(maxDiscount-minimum)+minimum);
               if (ticket.getPlacePrice() != null&&maxDiscount>minimum&&newDiscount>minimum) {
                   ticket.setDiscount(newDiscount);
                   BigDecimal newPrice = ticket.getPlacePrice().multiply(BigDecimal.valueOf(1 - (newDiscount * 0.01))).setScale(-3, RoundingMode.HALF_UP);
                   ticket.setPrice(newPrice);
                   ticket.setStartIncredible(new Date());
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
    }

    private TicketSubscribeEntity selectTicketToIncredible(List<TicketSubscribeEntity> tickets) {
        return tickets.get(Math.toIntExact((long) (Math.random()*tickets.size())));
    }

    private GymEntity selectPlaceToIncredible(List<GymEntity> places) {
        return places.get(Math.toIntExact((long) (Math.random()*places.size())));
    }

    private void addNewIncrediblesByPlace() {
        List<TicketSubscribeEntity> newIncrediblesByPlace = ticketSubscribeRepository.findAllNewIncrediblesByPlace();
        for (TicketSubscribeEntity ticket : newIncrediblesByPlace) {
            ticket.setStartIncredible(new Date());
            ticketsToUpdate.add(ticket);
            sendActiveSmsToPlace(ticket);
        }
    }

    private void checkForDeactive(List<TicketSubscribeEntity> currentIncredibles) {

        for (TicketSubscribeEntity ticket : currentIncredibles) {
            try {
                if (checkTicketExpire(ticket)) {
                    BigDecimal beforPrice = ticket.getPrice();
                    ticket.setStartIncredible(null);
                    ticket.setPrice(ticket.getValuePrice());
                    ticket.setDiscount((short) 0);
                    if (ticket.getPlacePrice().compareTo(ticket.getValuePrice()) != 0) {
                        sendDeactiveSmsToPlace(ticket);
                        ticket.setPlacePrice(ticket.getValuePrice());
                    } else {
                        historyToAdd.add(
                                BuyableDiscountHistoryEntity.builder()
                                        .buyable(ticket)
                                        .discount((short) 0)
                                        .beforPrice(beforPrice)
                                        .afterPrice(ticket.getPlacePrice())
                                        .build());
                    }
                    ticketsToUpdate.add(ticket);
                }
            } catch (Exception e) {
            }
        }
    }

    private boolean checkTicketExpire(TicketSubscribeEntity ticket) {
        Integer duration = Integer.valueOf(manageSettingsRepository.findByKeyAndDeletedFalse("TICKET_INCREDIBLES_INTERVAL").getValue());
        Date currentDate = new Date();
        Calendar calender = Calendar.getInstance();
        calender.setTime(ticket.getStartIncredible());
        calender.add(Calendar.HOUR, duration);
        return calender.getTime().before(currentDate);
    }

    private void sendActiveSmsToPlace(TicketSubscribeEntity ticket) {
        try {
            var placePersonel = ticket.getPlace().getPlaceOwners().stream().filter(o -> !o.isDeleted() && o.getSms()).collect(Collectors.toList());
            for (PlacePersonnelEntity owner : placePersonel) {
                smsService.sendStartIncredible(SmsDto.builder()
                        .userNumber(owner.getUser().getPhoneNumber())
                        .smsType(SmsTypes.JOIN_PLACE_REQUEST)
                        .text1(ticket.getName())
                        .build()
                );
            }
        } catch (Exception e) {
            throw new SendSmsException();
        }
    }

    private void sendDeactiveSmsToPlace(TicketSubscribeEntity ticket) {
        try {
            var placePersonel = ticket.getPlace().getPlaceOwners().stream().filter(o -> !o.isDeleted() && o.getSms()).collect(Collectors.toList());
            for (PlacePersonnelEntity owner : placePersonel) {
                smsService.sendEndIncredible(SmsDto.builder()
                        .userNumber(owner.getUser().getPhoneNumber())
                        .smsType(SmsTypes.JOIN_PLACE_REQUEST)
                        .text1(ticket.getName())
                        .build()
                );
            }
        } catch (Exception e) {
            throw new SendSmsException();
        }
    }

}
