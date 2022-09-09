package com.notrika.gympin.domain.event.walking;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.event.BaseEventFilter;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.event.walking.service.WalkingEventService;
import com.notrika.gympin.common.exception.event.*;
import com.notrika.gympin.common.exception.general.InputNotValidException;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.event.general.EventParticipantServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.user.UserRateServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.EventConvertor;
import com.notrika.gympin.domain.util.convertor.searchfilter.EventFilterConvertor;
import com.notrika.gympin.domain.util.validator.GeneralValidator;
import com.notrika.gympin.persistence.dao.repository.BaseEventRepository;
import com.notrika.gympin.persistence.dao.repository.WalkingEventRepository;
import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class WalkingEventServiceImpl extends AbstractBaseService<WalkingEventParam, WalkingEventDto, BaseEventFilter, WalkingEventEntity> implements WalkingEventService {

    @Autowired
    private WalkingEventRepository walkingEventRepository;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private EventParticipantServiceImpl eventParticipantService;

    @Autowired
    private BaseEventRepository eventRepository;

    @Autowired
    private UserRateServiceImpl userRateService;

    @Override
    @Transactional
    public WalkingEventDto add(WalkingEventParam walkingEventParam) {
        //TODO: add limitation for add new events
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(walkingEventParam.getStartDate());
        calendar.add(Calendar.MINUTE, -120);
        Date fromDate = calendar.getTime();
        calendar.add(Calendar.MINUTE, 240);
        Date toDate = calendar.getTime();
        if (eventRepository.getAllActiveEventOfUser(user, fromDate, toDate) > 0) {
            throw new ParticipantOfAnotherEventException();//You already are participant to another event
        }
        GeneralValidator.idValidator(walkingEventParam.getSport());
        SportEntity sport = sportService.getEntityById(walkingEventParam.getSport().getId());
        if (sport == null) {
            throw new InputNotValidException();//sport not found
        }
        WalkingEventEntity walkingEvent = EventConvertor.walkingEventParamToEntity(walkingEventParam);
        walkingEvent.setSport(sport);
        WalkingEventEntity entity = walkingEventRepository.add(walkingEvent);
        if (entity.getParticipants() == null) entity.setParticipants(new ArrayList<>());
        for (UserParam userParam : walkingEventParam.getParticipants()) {
            UserEntity participantUser = userService.getUserByAnyKey(userParam);
            EventParticipantEntity eventParticipant = eventParticipantService.add(EventParticipantEntity.builder().event(entity).user(participantUser).build());
            entity.getParticipants().add(eventParticipant);
        }
        WalkingEventDto walkingEventDto = EventConvertor.walkingEventEntityToDto(entity);
        walkingEventDto.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(walkingEventDto.getOwner().getId()).build()));
        walkingEventDto.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build())));
        return walkingEventDto;
    }

    @Override
    @Transactional
    public WalkingEventDto update(WalkingEventParam walkingEventParam) {
        GeneralValidator.idValidator(walkingEventParam);
        GeneralValidator.idValidator(walkingEventParam.getSport());
        WalkingEventEntity event = getEntityById(walkingEventParam.getId());
        if (event == null) {
            throw new EventNotFoundException();//event not found
        }
        WalkingEventEntity walkingEvent = EventConvertor.walkingEventParamToEntity(walkingEventParam, event);
        SportEntity sport = sportService.getEntityById(walkingEventParam.getSport().getId());
        if (sport == null) {
            throw new SportOfEventNotFoundException();//sport not found
        }
        walkingEvent.setSport(sport);
        WalkingEventEntity entity = update(walkingEvent);
        WalkingEventDto walkingEventDto = EventConvertor.walkingEventEntityToDto(entity);
        walkingEventDto.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(walkingEventDto.getOwner().getId()).build()));
        walkingEventDto.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build())));
        return walkingEventDto;
    }

    @Override
    @Transactional
    public WalkingEventDto delete(WalkingEventParam walkingEventParam) {
        GeneralValidator.idValidator(walkingEventParam);
        WalkingEventEntity walkingEvent = getEntityById(walkingEventParam.getId());
        if (walkingEvent == null) {
            throw new EventNotFoundException();//event not found
        }
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        if (!walkingEvent.getCreatorUser().equals(user)) {
            throw new NotOwnerOfEventException();//you are not owner of event
        }
        if (new Date().after(walkingEvent.getStartDate())) {
            throw new EventStartedException();//the event is started
        }
        if (walkingEvent.getParticipants().size() > 0) {
            //jarime
        }
        for (EventParticipantEntity participant : walkingEvent.getParticipants()) {
            eventParticipantService.delete(participant);
        }
        WalkingEventEntity entity = delete(walkingEvent);
        return EventConvertor.walkingEventEntityToDto(entity);
    }

    @Override
    public UserWalkingEventDto getAllEventOfUser(UserParam userParam) {
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        if (!Collections.disjoint(user.getUserRole(), Arrays.asList(UserRole.SUPER_ADMIN, UserRole.ADMIN)) && GeneralValidator.validateId(userParam)) {
            user = userService.getEntityById(userParam.getId());
        }
        List<WalkingEventEntity> ownedEvents = walkingEventRepository.findAllByCreatorUserAndDeletedIsFalse(user);
        List<EventParticipantEntity> eventParticipantEntities = new ArrayList<>(eventParticipantService.getEventParticipantEntities(user));
        List<WalkingEventEntity> participatedEvents = walkingEventRepository.findAllByParticipantsInAndDeletedIsFalse(eventParticipantEntities);
        UserWalkingEventDto userWalkingEventDto = new UserWalkingEventDto();
        userWalkingEventDto.setOwnedEvents(ownedEvents.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList()));
        userWalkingEventDto.getOwnedEvents().forEach(c -> c.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(c.getOwner().getId()).build())));
        userWalkingEventDto.getOwnedEvents().forEach(c -> c.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build()))));
        userWalkingEventDto.setParticipatedEvents(participatedEvents.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList()));
        userWalkingEventDto.getParticipatedEvents().forEach(c -> c.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(c.getId()).build())));
        userWalkingEventDto.getParticipatedEvents().forEach(c -> c.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build()))));
        return userWalkingEventDto;
    }

    @Override
    public WalkingEventDto getById(long id) {
        WalkingEventEntity entity = getEntityById(id);
        WalkingEventDto walkingEventDto = EventConvertor.walkingEventEntityToDto(entity);
        walkingEventDto.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(walkingEventDto.getOwner().getId()).build()));
        walkingEventDto.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build())));
        return walkingEventDto;
    }

    @Override
    public WalkingEventEntity add(WalkingEventEntity entity) {
        return walkingEventRepository.add(entity);
    }

    @Override
    public WalkingEventEntity update(WalkingEventEntity entity) {
        return walkingEventRepository.update(entity);
    }

    @Override
    public WalkingEventEntity delete(WalkingEventEntity entity) {
        return walkingEventRepository.deleteById2(entity);
    }

    @Override
    public WalkingEventEntity getEntityById(long id) {
        return walkingEventRepository.getById(id);
    }

    @Override
    public List<WalkingEventEntity> getAll(Pageable pageable) {
        return walkingEventRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<WalkingEventDto> convertToDtos(List<WalkingEventEntity> entities) {
        List<WalkingEventDto> walkingEventDtos = entities.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList());
        walkingEventDtos.forEach(c -> c.getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(c.getOwner().getId()).build())));
        walkingEventDtos.forEach(c -> c.getParticipants().forEach(u -> u.setRate(userRateService.calculateUserRate(UserParam.builder().id(u.getId()).build()))));
        return walkingEventDtos;
    }

    @Override
    public Long countSearch(BaseEventFilter filter) {
        Specification<BaseEventEntity> clause = null;
        List<SearchCriteria> searchCriteriaList = EventFilterConvertor.convertToBaseEventFilter(filter);
        if (!searchCriteriaList.isEmpty()) {
            BaseEventEntity specification = new BaseEventEntity();
            specification.setCriteria(searchCriteriaList.get(0));
            clause = Specification.where(specification);
        }
        for (int i = 1; i < searchCriteriaList.size(); i++) {
            BaseEventEntity specification = new BaseEventEntity();
            specification.setCriteria(searchCriteriaList.get(i));
            clause.and(specification);
        }
        return eventRepository.count(clause);
    }
}
