package com.notrika.gympin.domain.ticket.course;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam;
import com.notrika.gympin.common.ticket.ticketCourse.query.TicketCourseQuery;
import com.notrika.gympin.common.ticket.ticketCourse.service.TicketCourseService;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.ticket.*;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.domain.util.convertor.PlaceSportConvertor;
import com.notrika.gympin.domain.util.convertor.TicketCourseConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.sport.PlaceSportRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketHallActiveTimesRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.course.TicketCourseRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
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
public class TicketCourseServiceImpl extends AbstractBaseService<TicketCourseParam, TicketCourseDto, TicketCourseQuery, TicketCourseEntity> implements TicketCourseService {

    @Autowired
    private TicketCourseRepository ticketCourseRepository;
    @Autowired
    private TicketHallActiveTimesRepository ticketCourseHallActiveTimesRepository;
    @Autowired
    private PlaceSportRepository placeSportRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public TicketCourseDto add(@NonNull TicketCourseParam param) {
        PlaceEntity place = placeRepository.getById(param.getPlace().getId());
        TicketCourseEntity ticketCourseEntity = TicketCourseEntity.builder()
                .place(place)
                .name(param.getName())
                .description(param.getDescription())
                .enable(false)
                .discount((short) 0)
                .gender(param.getGender())
                .price(param.getPlacePrice())
                .valuePrice(param.getValuePrice())
                .placePrice(param.getPlacePrice())
                .buyableType(BuyableType.COURSE)
                .courseStatus(param.getStatus())
                .targetOfCourse(param.getTargetOfCourse())
                .autoRenew(param.getAutoRenew())
                .classCapacity(param.getClassCapasity())
                .ageLimit(param.getAgeLimit())
                .entryTotalCount(param.getEntryTotalCount())
                .courseCapacity(param.getCourseCapacity())
                .courseLevel(param.getCourseLevel())
                .startDate(param.getStartDate())
                .endDate(param.getEndDate())
                .startSellingDate(param.getStartSellingDate())
                .endSellingDate(param.getEndSellingDate())
                .build();

        ticketCourseEntity = this.add(ticketCourseEntity);
        return TicketCourseConvertor.toDto(ticketCourseEntity);
    }

    @Override
    public TicketCourseDto update(@NonNull TicketCourseParam ticketCourseParam) {
        if (ticketCourseParam.getValuePrice().compareTo(ticketCourseParam.getPlacePrice()) < 0)
            throw new UncomfortableValueExeption();
        TicketCourseEntity ticketCourseEntity = getEntityById(ticketCourseParam.getId());
        ticketCourseEntity.setName(ticketCourseParam.getName());
        ticketCourseEntity.setEnable(false);
        ticketCourseEntity.setDiscount((short) 0);
        ticketCourseEntity.setGender(ticketCourseParam.getGender());
        ticketCourseEntity.setPrice(ticketCourseParam.getPlacePrice());
        ticketCourseEntity.setValuePrice(ticketCourseParam.getValuePrice());
        ticketCourseEntity.setPlacePrice(ticketCourseParam.getPlacePrice());
        ticketCourseEntity.setBuyableType(BuyableType.COURSE);
        ticketCourseEntity.setCourseStatus(ticketCourseParam.getStatus());
        ticketCourseEntity.setTargetOfCourse(ticketCourseParam.getTargetOfCourse());
        ticketCourseEntity.setAutoRenew(ticketCourseParam.getAutoRenew());
        ticketCourseEntity.setClassCapacity(ticketCourseParam.getClassCapasity());
        ticketCourseEntity.setAgeLimit(ticketCourseParam.getAgeLimit());
        ticketCourseEntity.setEntryTotalCount(ticketCourseParam.getEntryTotalCount());
        ticketCourseEntity.setCourseCapacity(ticketCourseParam.getCourseCapacity());
        ticketCourseEntity.setCourseLevel(ticketCourseParam.getCourseLevel());
        ticketCourseEntity.setStartDate(ticketCourseParam.getStartDate());
        ticketCourseEntity.setEndDate(ticketCourseParam.getEndDate());
        ticketCourseEntity.setStartSellingDate(ticketCourseParam.getStartSellingDate());
        ticketCourseEntity.setEndSellingDate(ticketCourseParam.getEndSellingDate());
        ticketCourseEntity.setDescription(ticketCourseParam.getDescription());
        return TicketCourseConvertor.toDto(ticketCourseRepository.update(ticketCourseEntity));
    }

    @Override
    public TicketCourseDto delete(@NonNull TicketCourseParam ticketCourseParam) {
        TicketCourseEntity ticketCourseEntity = getEntityById(ticketCourseParam.getId());
        ticketCourseEntity = this.delete(ticketCourseEntity);
        return TicketCourseConvertor.toDto(ticketCourseEntity);
    }

    @Override
    public TicketCourseDto getById(long id) {
        return TicketCourseConvertor.toDto(this.getEntityById(id));
    }

    @Override
    public TicketCourseEntity add(TicketCourseEntity entity) {
        return ticketCourseRepository.add(entity);
    }

    @Override
    public TicketCourseEntity update(TicketCourseEntity entity) {
        return ticketCourseRepository.update(entity);
    }

    @Override
    public TicketCourseEntity delete(TicketCourseEntity entity) {
        return ticketCourseRepository.deleteById2(entity);
    }

    @Override
    public TicketCourseEntity getEntityById(long id) {
        return ticketCourseRepository.getById(id);
    }

    @Override
    public List<TicketCourseEntity> getAll(Pageable pageable) {
        return ticketCourseRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TicketCourseEntity> findAll(Specification<TicketCourseEntity> specification, Pageable pageable) {
        return ticketCourseRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketCourseDto> convertToDtos(List<TicketCourseEntity> entities) {
        return entities.stream().map(TicketCourseConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketCourseDto> convertToDtos(Page<TicketCourseEntity> entities) {
        return entities.map(TicketCourseConvertor::toDto);
    }

    @Override
    public List<TicketCourseDto> getTicketCourseByPlace(PlaceParam place) {
        return ticketCourseRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(TicketCourseConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PlaceSportDto> getSports(Long ticketCourseId) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(ticketCourseId);
        return PlaceSportConvertor.toDto(ticketCourse.getTicketCourseSport());
    }

    @Override
    @Transactional
    public TicketCourseDto addSport(TicketCourseSportParam ticketCourseSportParam) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(ticketCourseSportParam.getTicketCourse().getId());

        List<PlaceSportEntity> ticketCourseSports = ticketCourse.getTicketCourseSport();
        if (ticketCourseSports == null) ticketCourseSports = new ArrayList<>();
        for (var placeSportParam : ticketCourseSportParam.getPlaceSports()) {
            if (ticketCourse.getTicketCourseSport().stream().anyMatch(s -> s.getId().equals(placeSportParam.getId())))
                throw new DuplicateEntryAddExeption();
            PlaceSportEntity placeSport = placeSportRepository.getById(placeSportParam.getId());
            ticketCourseSports.add(placeSport);
        }
        ticketCourse.setTicketCourseSport(ticketCourseSports);
        ticketCourseRepository.update(ticketCourse);
        return TicketCourseConvertor.toDto(ticketCourse);
    }

    @Override
    public TicketCourseDto deleteSport(TicketCourseSportParam ticketCourseSportParam) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(ticketCourseSportParam.getTicketCourse().getId());
        var sports = ticketCourse.getTicketCourseSport();
        var placeSportRemoveIds = ticketCourseSportParam.getPlaceSports().stream().map(BaseParam::getId).collect(Collectors.toList());
        var afterfilter = sports.stream().filter(a -> !placeSportRemoveIds.contains(a.getId())).collect(Collectors.toList());
        ticketCourse.setTicketCourseSport(afterfilter);
        ticketCourseRepository.update(ticketCourse);
        return TicketCourseConvertor.toDto(ticketCourse);
    }

    @Override
    public List<UserDto> getCoaches(Long ticketId) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(ticketId);
        return ticketCourse.getCoaches().stream().map(UserConvertor::toCoachDto).collect(Collectors.toList());
    }

    @Override
    public TicketCourseDto addCoach(TicketCourseCoachParam param) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(param.getTicketCourse().getId());
        List<UserEntity> ticketCourseCoaches = ticketCourse.getCoaches();
        if (ticketCourse.getCoaches().stream().anyMatch(s -> s.getId().equals(param.getPlaceCoach().getId())))
            throw new DuplicateEntryAddExeption();
        UserEntity placeCoach = userRepository.getById(param.getPlaceCoach().getId());
        ticketCourseCoaches.add(placeCoach);
        ticketCourse.setCoaches(ticketCourseCoaches);
        var course = ticketCourseRepository.update(ticketCourse);
        return TicketCourseConvertor.toDto(course);
    }

    @Override
    public TicketCourseDto deleteCoach(TicketCourseCoachParam param) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(param.getTicketCourse().getId());
        List<UserEntity> ticketCourseCoaches = ticketCourse.getCoaches();
        if (!ticketCourse.getCoaches().stream().anyMatch(s -> s.getId().equals(param.getPlaceCoach().getId())))
            throw new NotFoundException();
        UserEntity placeCoach = userRepository.getById(param.getPlaceCoach().getId());
        ticketCourseCoaches.remove(placeCoach);
        ticketCourse.setCoaches(ticketCourseCoaches);
        var course = ticketCourseRepository.update(ticketCourse);
        return TicketCourseConvertor.toDto(course);
    }

    @Override
    public TicketCourseDto ChangeTicketCourseStatus(TicketCourseParam ticketCourseParam) {
        TicketCourseEntity ticketCourseEntity = getEntityById(ticketCourseParam.getId());
        if (ticketCourseParam.getEnable()) {
            if (ticketCourseEntity.getName() == null) {
                throw new TicketNameCannotBeNull();
            }
            if (ticketCourseEntity.getPrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            //this is commented because of wizard
//            if (ticketCourseEntity.getBeneficiary() == null) {
//                throw new TicketHasNotOwner();
//            }
            if (ticketCourseEntity.getGender() == null) {
                throw new TicketGenderCannotBeNull();
            }
            if (ticketCourseEntity.getValuePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketCourseEntity.getPlacePrice() == null) {
                throw new TicketPriceCannotBeNull();
            }
            if (ticketCourseEntity.getEntryTotalCount() == null || ticketCourseEntity.getEntryTotalCount() == 0) {
                throw new TicketEntryCountCanNotBeNullOrZiro();
            }
            if (ticketCourseEntity.getDiscount() == null) {
                throw new TicketDiscountCannotBeNull();
            }
            if (ticketCourseEntity.getCourseCapacity() == null || ticketCourseEntity.getCourseCapacity() < 1) {
                throw new TicketCapacityCannotBeNullorZiro();
            }
            if (ticketCourseEntity.getTicketCourseSport() == null) {
                throw new TicketSportCannotBeNull();
            }
            if (ticketCourseEntity.getTicketCourseSport().size() < 1) {
                throw new TicketSportCannotBeNull();
            }
            if (ticketCourseEntity.getActiveTimes() == null) {
                throw new TicketHallsCannotBeNull();
            }
            if (ticketCourseEntity.getActiveTimes().size() < 1) {
                throw new TicketHallsCannotBeNull();
            }
            if (ticketCourseEntity.getCoaches().size() < 1) {
                throw new TicketCouchesCannotBeNull();
            }
        }
        ticketCourseEntity.setEnable(ticketCourseParam.getEnable());
        ticketCourseRepository.update(ticketCourseEntity);
        return TicketCourseConvertor.toDto(ticketCourseEntity);
    }

    @Override
    public List<ActiveTimesDto> getTicketActiveTimesByTicketCourse(Long ticketCourseId) {
        return ticketCourseRepository.getById(ticketCourseId).getActiveTimes().stream().map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }

    @Override
    public TicketCourseDto addCourseActiveTimes(TicketActiveTimesParam param) {
        var ticketCourse = ticketCourseRepository.getById(param.getTicket().getId());
        List<TicketHallActiveTimeEntity> activeTimes = ticketCourse.getActiveTimes();
        for (ActiveTimesParam activeTime : param.getActiveTime()) {
            if (ticketCourse.getActiveTimes().stream().anyMatch(s -> s.getId().equals(activeTime.getId())))
                throw new DuplicateEntryAddExeption();
            activeTimes.add(ticketCourseHallActiveTimesRepository.getById(activeTime.getId()));
        }
        ticketCourse.setActiveTimes(activeTimes);
        return TicketCourseConvertor.toDto(ticketCourseRepository.update(ticketCourse));
    }

    @Override
    public TicketCourseDto deleteCourseActiveTimes(TicketActiveTimesParam param) {
        TicketCourseEntity ticketCourse = ticketCourseRepository.getById(param.getTicket().getId());
        List<TicketHallActiveTimeEntity> activeTimes = ticketCourse.getActiveTimes();
        var activeTimesRemoveIds = param.getActiveTime().stream().map(BaseParam::getId).collect(Collectors.toList());
        var afterfilter = activeTimes.stream().filter(a -> !activeTimesRemoveIds.contains(a.getId())).collect(Collectors.toList());
        ticketCourse.setActiveTimes(afterfilter);
        ticketCourseRepository.update(ticketCourse);
        return TicketCourseConvertor.toDto(ticketCourse);
    }

}
