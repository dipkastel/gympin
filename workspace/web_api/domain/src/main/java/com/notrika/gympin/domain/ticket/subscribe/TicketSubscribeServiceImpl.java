package com.notrika.gympin.domain.ticket.subscribe;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import com.notrika.gympin.common.ticket.ticketSubscribe.service.TicketSubscribeService;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.ticket.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.*;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.sport.PlaceSportRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketHallActiveTimesRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketSubscribeServiceImpl extends AbstractBaseService<TicketSubscribeParam, TicketSubscribeDto, TicketSubscribeQuery, TicketSubscribeEntity> implements TicketSubscribeService {

    @Autowired
    private TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    private TicketHallActiveTimesRepository ticketSubscribeHallActiveTimesRepository;
    @Autowired
    private PlaceSportRepository placeSportRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public TicketSubscribeDto add(@NonNull TicketSubscribeParam ticketSubscribeParam) {
        PlaceEntity place = placeRepository.getById(ticketSubscribeParam.getPlace().getId());
        TicketSubscribeEntity ticketSubscribeEntity = TicketSubscribeEntity.builder()
                .place(place)
                .name(ticketSubscribeParam.getName())
                .price(ticketSubscribeParam.getPlacePrice())
                .valuePrice(ticketSubscribeParam.getValuePrice())
                .placePrice(ticketSubscribeParam.getPlacePrice())
                .discount((short)0)
                .enable(false)
                .buyableType(BuyableType.SUBSCRIBE)
                .entryTotalCount(ticketSubscribeParam.getEntryTotalCount())
                .gender(ticketSubscribeParam.getGender())
                .description(ticketSubscribeParam.getDescription())
                .expireDuration(ticketSubscribeParam.getExpireDuration())
                .subscribeCapacity(ticketSubscribeParam.getSubscribeCapacity())
                .build();

        ticketSubscribeEntity = this.add(ticketSubscribeEntity);
        return TicketSubscribeConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketSubscribeDto update(@NonNull TicketSubscribeParam ticketSubscribeParam) {
        if (ticketSubscribeParam.getValuePrice().compareTo(ticketSubscribeParam.getPlacePrice()) < 0)
            throw new UncomfortableValueExeption();
        TicketSubscribeEntity ticketSubscribeEntity = getEntityById(ticketSubscribeParam.getId());
        ticketSubscribeEntity.setName(ticketSubscribeParam.getName());
        ticketSubscribeEntity.setPrice(ticketSubscribeParam.getPlacePrice());
        ticketSubscribeEntity.setValuePrice(ticketSubscribeParam.getValuePrice());
        ticketSubscribeEntity.setPlacePrice(ticketSubscribeParam.getPlacePrice());
        ticketSubscribeEntity.setDiscount((short) 0);
        ticketSubscribeEntity.setBuyableType(BuyableType.SUBSCRIBE);
        ticketSubscribeEntity.setEntryTotalCount(ticketSubscribeParam.getEntryTotalCount());
        ticketSubscribeEntity.setGender(ticketSubscribeParam.getGender());
        ticketSubscribeEntity.setDescription(ticketSubscribeParam.getDescription());
        ticketSubscribeEntity.setExpireDuration(ticketSubscribeParam.getExpireDuration());
        ticketSubscribeEntity.setSubscribeCapacity(ticketSubscribeParam.getSubscribeCapacity());
        return TicketSubscribeConvertor.toDto(ticketSubscribeRepository.update(ticketSubscribeEntity));
    }

    @Override
    public TicketSubscribeDto delete(@NonNull TicketSubscribeParam ticketSubscribeParam) {
        TicketSubscribeEntity ticketSubscribeEntity = getEntityById(ticketSubscribeParam.getId());
        ticketSubscribeEntity = this.delete(ticketSubscribeEntity);
        return TicketSubscribeConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketSubscribeDto getById(long id) {
        return TicketSubscribeConvertor.toDto(this.getEntityById(id));
    }

    @Override
    public TicketSubscribeEntity add(TicketSubscribeEntity entity) {
        return ticketSubscribeRepository.add(entity);
    }

    @Override
    public TicketSubscribeEntity update(TicketSubscribeEntity entity) {
        return ticketSubscribeRepository.update(entity);
    }

    @Override
    public TicketSubscribeEntity delete(TicketSubscribeEntity entity) {
        return ticketSubscribeRepository.deleteById2(entity);
    }

    @Override
    public TicketSubscribeEntity getEntityById(long id) {
        return ticketSubscribeRepository.getById(id);
    }

    @Override
    public List<TicketSubscribeEntity> getAll(Pageable pageable) {
        return ticketSubscribeRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TicketSubscribeEntity> findAll(Specification<TicketSubscribeEntity> specification, Pageable pageable) {
        return ticketSubscribeRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketSubscribeDto> convertToDtos(List<TicketSubscribeEntity> entities) {
        return entities.stream().map(TicketSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketSubscribeDto> convertToDtos(Page<TicketSubscribeEntity> entities) {
        return entities.map(TicketSubscribeConvertor::toDto);
    }

    @Override
    public List<TicketSubscribeDto> getTicketSubscribeByPlace(PlaceParam place) {
        return ticketSubscribeRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(TicketSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PlaceSportDto> getSports(Long ticketSubscribeId) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(ticketSubscribeId);
        return PlaceSportConvertor.toDto(ticketSubscribe.getTicketSubscribeSport());
    }

    @Override
    @Transactional
    public TicketSubscribeDto addSport(TicketSubscribeSportParam ticketSubscribeSportParam) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(ticketSubscribeSportParam.getTicketSubscribe().getId());

        List<PlaceSportEntity> ticketSubscribeSports = ticketSubscribe.getTicketSubscribeSport();
        if (ticketSubscribeSports == null) ticketSubscribeSports = new ArrayList<>();
        for (var placeSportParam : ticketSubscribeSportParam.getPlaceSports()) {
            if (ticketSubscribe.getTicketSubscribeSport().stream().anyMatch(s -> s.getId().equals(placeSportParam.getId())))
                throw new DuplicateEntryAddExeption();
            PlaceSportEntity placeSport = placeSportRepository.getById(placeSportParam.getId());
            ticketSubscribeSports.add(placeSport);
        }
        ticketSubscribe.setTicketSubscribeSport(ticketSubscribeSports);
        ticketSubscribeRepository.update(ticketSubscribe);
        return TicketSubscribeConvertor.toDto(ticketSubscribe);
    }

    @Override
    public TicketSubscribeDto deleteSport(TicketSubscribeSportParam ticketSubscribeSportParam) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(ticketSubscribeSportParam.getTicketSubscribe().getId());
        var sports = ticketSubscribe.getTicketSubscribeSport();
        var placeSportRemoveIds = ticketSubscribeSportParam.getPlaceSports().stream().map(BaseParam::getId).collect(Collectors.toList());
        var afterfilter = sports.stream().filter(a -> !placeSportRemoveIds.contains(a.getId())).collect(Collectors.toList());
        ticketSubscribe.setTicketSubscribeSport(afterfilter);
        ticketSubscribeRepository.update(ticketSubscribe);
        return TicketSubscribeConvertor.toDto(ticketSubscribe);
    }


    @Override
    public List<UserDto> getCoaches(Long ticketId) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(ticketId);
        return ticketSubscribe.getCoaches().stream().map(UserConvertor::toCoachDto).collect(Collectors.toList());
    }

    @Override
    public TicketSubscribeDto addCoach(TicketSubscribeCoachParam param) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(param.getTicketSubscribe().getId());
        List<UserEntity> ticketSubscribeCoaches = ticketSubscribe.getCoaches();
        if (ticketSubscribe.getCoaches().stream().anyMatch(s -> s.getId().equals(param.getPlaceCoach().getId())))
            throw new DuplicateEntryAddExeption();
        UserEntity placeCoach = userRepository.getById(param.getPlaceCoach().getId());
        ticketSubscribeCoaches.add(placeCoach);
        ticketSubscribe.setCoaches(ticketSubscribeCoaches);
        var Subscribe = ticketSubscribeRepository.update(ticketSubscribe);
        return TicketSubscribeConvertor.toDto(Subscribe);
    }

    @Override
    public TicketSubscribeDto deleteCoach(TicketSubscribeCoachParam param) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(param.getTicketSubscribe().getId());
        List<UserEntity> ticketSubscribeCoaches = ticketSubscribe.getCoaches();
        if (!ticketSubscribe.getCoaches().stream().anyMatch(s -> s.getId().equals(param.getPlaceCoach().getId())))
            throw new NotFoundException();
        UserEntity placeCoach = userRepository.getById(param.getPlaceCoach().getId());
        ticketSubscribeCoaches.remove(placeCoach);
        ticketSubscribe.setCoaches(ticketSubscribeCoaches);
        var Subscribe = ticketSubscribeRepository.update(ticketSubscribe);
        return TicketSubscribeConvertor.toDto(Subscribe);
    }

    @Override
    public List<TicketDiscountHistoryDto> getTicketSubscribeDiscountHistory(Long ticketSubscribeId) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(ticketSubscribeId);
        return ticketSubscribe.getDiscountHistory().stream().skip(Math.max(0, ticketSubscribe.getDiscountHistory().size() - 30)).map(TicketSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public TicketSubscribeDto ChangeTicketSubscribeStatus(TicketSubscribeParam ticketSubscribeParam) {
        TicketSubscribeEntity ticketSubscribeEntity = getEntityById(ticketSubscribeParam.getId());
        if (ticketSubscribeParam.getEnable()) {
            if (ticketSubscribeEntity.getName() == null) {
                throw new TicketNameCannotBeNull();
            }
            if (ticketSubscribeEntity.getPrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            // commented because of wizard
//            if (ticketSubscribeEntity.getBeneficiary() == null) {
//                throw new TicketHasNotOwner();
//            }
            if (ticketSubscribeEntity.getGender() == null) {
                throw new TicketGenderCannotBeNull();
            }
            if (ticketSubscribeEntity.getValuePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketSubscribeEntity.getPlacePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketSubscribeEntity.getEntryTotalCount() == null || ticketSubscribeEntity.getEntryTotalCount() == 0) {
                throw new TicketEntryCountCanNotBeNullOrZiro();
            }
            if (ticketSubscribeEntity.getDiscount() == null) {
                throw new TicketDiscountCannotBeNull();
            }
            if (ticketSubscribeEntity.getExpireDuration() == null) {
                throw new TicketExpireDurationCannotBeNull();
            }
            if (ticketSubscribeEntity.getSubscribeCapacity() == null || ticketSubscribeEntity.getSubscribeCapacity() < 1) {
                throw new TicketCapacityCannotBeNullorZiro();
            }
            if (ticketSubscribeEntity.getTicketSubscribeSport() == null) {
                throw new TicketSportCannotBeNull();
            }
            if (ticketSubscribeEntity.getTicketSubscribeSport().size() < 1) {
                throw new TicketSportCannotBeNull();
            }
            if (ticketSubscribeEntity.getActiveTimes() == null) {
                throw new TicketHallsCannotBeNull();
            }
            if (ticketSubscribeEntity.getActiveTimes().size() < 1) {
                throw new TicketHallsCannotBeNull();
            }
        }
        ticketSubscribeEntity.setEnable(ticketSubscribeParam.getEnable());
        ticketSubscribeRepository.update(ticketSubscribeEntity);
        return TicketSubscribeConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public List<ActiveTimesDto> getTicketSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId) {
        return ticketSubscribeRepository.getById(ticketSubscribeId).getActiveTimes().stream().map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }

    @Override
    public TicketSubscribeDto addSubscribeActiveTimes(TicketActiveTimesParam param) {
       var ticketSubscribe = ticketSubscribeRepository.getById(param.getTicket().getId());
       List<TicketHallActiveTimeEntity> activeTimes = ticketSubscribe.getActiveTimes();
       for(ActiveTimesParam activeTime:param.getActiveTime()){
           if (ticketSubscribe.getActiveTimes().stream().anyMatch(s -> s.getId().equals(activeTime.getId())))
               throw new DuplicateEntryAddExeption();
           activeTimes.add(ticketSubscribeHallActiveTimesRepository.getById(activeTime.getId()));
       }
       ticketSubscribe.setActiveTimes(activeTimes);
       return TicketSubscribeConvertor.toDto(ticketSubscribeRepository.update(ticketSubscribe));

    }

    @Override
    public TicketSubscribeDto deleteSubscribeActiveTimes(TicketActiveTimesParam param) {
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(param.getTicket().getId());
        List<TicketHallActiveTimeEntity> activeTimes = ticketSubscribe.getActiveTimes();
        var activeTimesRemoveIds = param.getActiveTime().stream().map(BaseParam::getId).collect(Collectors.toList());
        var afterfilter = activeTimes.stream().filter(a -> !activeTimesRemoveIds.contains(a.getId())).collect(Collectors.toList());
        ticketSubscribe.setActiveTimes(afterfilter);
        ticketSubscribeRepository.update(ticketSubscribe);
        return TicketSubscribeConvertor.toDto(ticketSubscribe);
    }

}
