package com.notrika.gympin.domain.ticket.appointment;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.ticket.ticketAppointment.param.TicketAppointmentParam;
import com.notrika.gympin.common.ticket.ticketAppointment.query.TicketAppointmentQuery;
import com.notrika.gympin.common.ticket.ticketAppointment.service.TicketAppointmentService;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.common.util.exception.purchased.PriceConflictException;
import com.notrika.gympin.common.util.exception.ticket.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TicketAppointmentConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Counseling.CounselingRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.appointment.TicketAppointmentRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.appointment.TicketAppointmentEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketAppointmentServiceImpl extends AbstractBaseService<TicketAppointmentParam, TicketAppointmentDto, TicketAppointmentQuery, TicketAppointmentEntity> implements TicketAppointmentService {

    @Autowired
    private TicketDiscountHistoryRepository ticketDiscountHistoryRepository;
    @Autowired
    private TicketAppointmentRepository ticketAppointmentRepository;
    @Autowired
    private CounselingRepository counselingRepository;
    @Autowired
    private SmsInService smsService;

    @Override
    public TicketAppointmentDto add(@NonNull TicketAppointmentParam param) {
        CounselingEntity place = counselingRepository.getById(param.getCounseling().getId());
        TicketAppointmentEntity ticketSubscribeEntity = TicketAppointmentEntity.builder()
                .place(place)
                .name(param.getName())
                .price(param.getPlacePrice())
                .valuePrice(param.getValuePrice())
                .placePrice(param.getPlacePrice())
                .discount((short) 0)
                .enable(false)
                .buyableType(BuyableType.SUBSCRIBE)
                .timing(param.getTiming())
                .gender(param.getGender())
                .description(param.getDescription())
                .expireDuration(param.getExpireDuration())
                .build();

        ticketSubscribeEntity = this.add(ticketSubscribeEntity);
        return TicketAppointmentConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketAppointmentDto update(@NonNull TicketAppointmentParam param) {
        if (param.getValuePrice() == null)
            throw new TicketPriceCannotBeNull();
        if (param.getPlacePrice() == null)
            throw new TicketPriceCannotBeNull();
        if (param.getValuePrice().compareTo(param.getPlacePrice()) < 0)
            throw new WrongValueExeption();


        TicketAppointmentEntity entity = getEntityById(param.getId());
        if (param.getValuePrice().compareTo(param.getPlacePrice()) != 0) {
            if (placeHasOtherIncredible(entity)) {
                throw new MultipleIncredibleException();
            }
        } else {
            if (entity.getStartIncredible() != null) {
                entity.setStartIncredible(null);

                try {
                    var placePersonel = entity.getPlace().getPlaceOwners().stream().filter(o -> !o.isDeleted() && o.getSms()).collect(Collectors.toList());
                    for (PlacePersonnelEntity owner : placePersonel) {
                        smsService.sendEndIncredible(SmsDto.builder()
                                .userNumber(owner.getUser().getPhoneNumber())
                                .smsType(SmsTypes.JOIN_PLACE_REQUEST)
                                .text1(entity.getName())
                                .build()
                        );
                    }
                } catch (Exception e) {
                    throw new SendSmsException();
                }
            }
        }
        BigDecimal beforePrice = entity.getPrice();
        entity.setName(param.getName());
        entity.setPrice(param.getPrice());
        entity.setValuePrice(param.getValuePrice());
        entity.setPlacePrice(param.getPlacePrice());
        entity.setBuyableType(BuyableType.SUBSCRIBE);
        entity.setTiming(param.getTiming());
        entity.setGender(param.getGender());
        entity.setDescription(param.getDescription());
        entity.setExpireDuration(param.getExpireDuration());
        entity.setAppointmentCapacity(param.getAppointmentCapacity());
        entity.setAppointmentStatus(param.getAppointmentStatus());


        if (param.getPlacePrice().compareTo(param.getPrice()) < 0)
            throw new PriceConflictException();

        BigDecimal percent = param.getPrice()
                .divide(param.getPlacePrice(), 2, RoundingMode.HALF_EVEN);
        Short newDiscount = (short) Math.round((1 - percent.floatValue()) * 100);
        ticketDiscountHistoryRepository.add(
                BuyableDiscountHistoryEntity.builder()
                        .buyable(entity)
                        .discount(newDiscount)
                        .beforPrice(beforePrice)
                        .afterPrice(param.getPrice())
                        .build());
        entity.setDiscount(newDiscount);

        return TicketAppointmentConvertor.toDto(ticketAppointmentRepository.update(entity));
    }

    private boolean placeHasOtherIncredible(TicketAppointmentEntity ticketSubscribeEntity) {
        List<BuyableEntity<?>> buyables = ticketSubscribeEntity.getPlace().getBuyables().stream().filter(b -> !b.isDeleted()).collect(Collectors.toList());
        for (BuyableEntity<?> buyable : buyables) {
            if (buyable.getId() != ticketSubscribeEntity.getId() && buyable.getPlacePrice().compareTo(buyable.getValuePrice()) != 0) {
                return true;
            }
        }
        return false;
    }

    @Override
    public TicketAppointmentDto delete(@NonNull TicketAppointmentParam param) {
        TicketAppointmentEntity ticketSubscribeEntity = getEntityById(param.getId());
        ticketSubscribeEntity = this.delete(ticketSubscribeEntity);
        return TicketAppointmentConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketAppointmentDto getById(long id) {
        return TicketAppointmentConvertor.toDto(this.getEntityById(id));
    }

    @Override
    public TicketAppointmentEntity add(TicketAppointmentEntity entity) {
        return ticketAppointmentRepository.add(entity);
    }

    @Override
    public TicketAppointmentEntity update(TicketAppointmentEntity entity) {
        return ticketAppointmentRepository.update(entity);
    }

    @Override
    public TicketAppointmentEntity delete(TicketAppointmentEntity entity) {
        return ticketAppointmentRepository.deleteById2(entity);
    }

    @Override
    public TicketAppointmentEntity getEntityById(long id) {
        return ticketAppointmentRepository.getById(id);
    }

    @Override
    public List<TicketAppointmentEntity> getAll(Pageable pageable) {
        return ticketAppointmentRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TicketAppointmentEntity> findAll(Specification<TicketAppointmentEntity> specification, Pageable pageable) {
        return ticketAppointmentRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketAppointmentDto> convertToDtos(List<TicketAppointmentEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(TicketAppointmentConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketAppointmentDto> convertToDtos(Page<TicketAppointmentEntity> entities) {
        return entities.map(TicketAppointmentConvertor::toDto);
    }

    @Override
    public List<TicketAppointmentDto> getTicketAppointmentByCounseling(CounselingParam place) {
        return ticketAppointmentRepository.findAllByPlaceAndDeletedIsFalse(CounselingEntity.builder().id(place.getId()).build()).stream().filter(o -> !o.isDeleted()).map(TicketAppointmentConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<TicketDiscountHistoryDto> getTicketAppointmentDiscountHistory(Long ticketSubscribeId) {
        TicketAppointmentEntity ticketSubscribe = ticketAppointmentRepository.getById(ticketSubscribeId);
        return ticketSubscribe.getDiscountHistory().stream().filter(o -> !o.isDeleted()).skip(Math.max(0, ticketSubscribe.getDiscountHistory().size() - 100)).map(TicketAppointmentConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<TicketDiscountHistoryDto> getTicketAppointmentDiscountHistoryByUser(Long ticketSubscribeId) {
        TicketAppointmentEntity ticketSubscribe = ticketAppointmentRepository.getById(ticketSubscribeId);
        return ticketSubscribe.getDiscountHistory().stream().filter(t -> t.getCreatorUser() != null).map(TicketAppointmentConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public TicketAppointmentDto ChangeTicketAppointmentStatus(TicketAppointmentParam param) {
        TicketAppointmentEntity ticketSubscribeEntity = getEntityById(param.getId());
        if (param.getEnable()) {
            if (ticketSubscribeEntity.getName() == null) {
                throw new TicketNameCannotBeNull();
            }
            if (ticketSubscribeEntity.getPrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketSubscribeEntity.getGender() == null) {
                throw new TicketGenderCannotBeNull();
            }
            if (ticketSubscribeEntity.getValuePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketSubscribeEntity.getPlacePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketSubscribeEntity.getDiscount() == null) {
                throw new TicketDiscountCannotBeNull();
            }
            if (ticketSubscribeEntity.getExpireDuration() == null) {
                throw new TicketExpireDurationCannotBeNull();
            }
        }
        ticketSubscribeEntity.setEnable(param.getEnable());
        ticketAppointmentRepository.update(ticketSubscribeEntity);
        return TicketAppointmentConvertor.toDto(ticketSubscribeEntity);
    }


}
