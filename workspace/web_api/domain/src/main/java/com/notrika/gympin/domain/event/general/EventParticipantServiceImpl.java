package com.notrika.gympin.domain.event.general;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.event.general.service.EventParticipantService;
import com.notrika.gympin.common.exception.event.*;
import com.notrika.gympin.common.exception.general.InputNotValidException;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserRateServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.EventConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.domain.util.validator.GeneralValidator;
import com.notrika.gympin.persistence.dao.repository.BaseEventRepository;
import com.notrika.gympin.persistence.dao.repository.EventParticipantRepository;
import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class EventParticipantServiceImpl extends AbstractBaseService<EventParticipantParam, EventParticipantDto, EventParticipantEntity> implements EventParticipantService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private BaseEventRepository eventRepository;

    @Autowired
    private EventParticipantRepository participantRepository;

    @Autowired
    private UserRateServiceImpl userRateService;

    @Override
    @Transactional
    public EventParticipantDto add(EventParticipantParam eventParticipantParam) {
        validateParamForAdd(eventParticipantParam);
        log.info("EventParticipantDto add is going to execute with param {}",eventParticipantParam);
        BaseEventEntity event = eventRepository.getById(eventParticipantParam.getEvent().getId());
        if(new Date().after(event.getStartDate())){
            throw new EventStartedException();//The event is started
        }
        if(getEventParticipantCount(event)==event.getParticipantCount()){
            throw new ParticipantsCountLimitException();//Participants are full
        }
        User user = (User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        if(!Collections.disjoint(user.getUserRole(),Arrays.asList(UserRole.SUPER_ADMIN,UserRole.ADMIN)) && GeneralValidator.validateUser(eventParticipantParam.getUser())){
            user=userService.getUserByAnyKey(eventParticipantParam.getUser());
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(event.getStartDate());
        calendar.add(Calendar.MINUTE,-120);
        Date fromDate = calendar.getTime();
        calendar.add(Calendar.MINUTE,240);
        Date toDate = calendar.getTime();
        if(eventRepository.getAllActiveEventOfUser(user,fromDate,toDate)>0) {
            throw new ParticipantOfAnotherEventException();//You already are participant to another event
        }
        if(participantRepository.findByEventAndUserAndDeletedIsFalse(event,user)!=null){
            throw new AlreadyParticipantOfEventException();//User already is a participant to this event
        }
        if(eventRepository.getById(eventParticipantParam.getEvent().getId()).getCreatorUser().equals(user)){
            throw new IsOwnerOfEventException();//User is owner of event
        }
        EventParticipantEntity entity = add(EventParticipantEntity.builder().event(event).user(user).build());
        EventParticipantDto eventParticipantDto = EventConvertor.eventParticipantEntityToDto(entity);
        eventParticipantDto.getUser().setRate(userRateService.calculateUserRate(UserParam.builder().id(eventParticipantDto.getId()).build()));
        eventParticipantDto.getEvent().getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(eventParticipantDto.getEvent().getOwner().getId()).build()));
        eventParticipantDto.getEvent().getParticipants().forEach(c->((UserDto)c).setRate(userRateService.calculateUserRate(UserParam.builder().id(((UserDto) c).getId()).build())));//.getEvent().getParticipants().forEach(c->c.setRate(userRateService.calculateUserRate()))
        return eventParticipantDto;
    }

    @Override
    @Transactional
    public EventParticipantDto update(EventParticipantParam eventParticipantParam) {
        throw new NotYetImplementedException();
    }

    @Override
    @Transactional
    public EventParticipantDto delete(EventParticipantParam eventParticipantParam) {
        BaseEventEntity event;
        EventParticipantEntity entity;
        User user = (User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        if(!Collections.disjoint(user.getUserRole(),Arrays.asList(UserRole.SUPER_ADMIN,UserRole.ADMIN)) && GeneralValidator.validateUser(eventParticipantParam.getUser())){
            user=userService.getUserByAnyKey(eventParticipantParam.getUser());
        }
        if(!GeneralValidator.validateId(eventParticipantParam)){
            if(!GeneralValidator.validateId(eventParticipantParam.getEvent())){
                throw new InputNotValidException();//Error in parameters, Either id or sub param is null
            }else{
                event = eventRepository.getById(eventParticipantParam.getEvent().getId());
                entity = participantRepository.findByEventAndUserAndDeletedIsFalse(event,user);
                if(entity==null){
                    throw new EventOrUserNotExistException();//the event not exist or the user is not participant of it
                }
            }
        }else{
            entity =  participantRepository.getById(eventParticipantParam.getId());
            event = entity.getEvent();
        }
        if(new Date().after(event.getStartDate())){
            throw new EventStartedException();//Event is started
        }
        //if is cancelling on critical time must pay penalty
        return EventConvertor.eventParticipantEntityToDto(delete(entity));
    }

    @Override
    public EventParticipantDto getById(long id) {
        EventParticipantEntity entity = getEntityById(id);
        return EventConvertor.eventParticipantEntityToDto(entity);
    }

    @Override
    //    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public EventParticipantEntity add(@NonNull EventParticipantEntity entity) {
        log.info("EventParticipantEntity add is going to execute with param {}",entity);
        return participantRepository.add(entity);
    }

    @Override
    public EventParticipantEntity update(@NonNull EventParticipantEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public EventParticipantEntity delete(@NonNull EventParticipantEntity entity) {
        return participantRepository.deleteById2(entity);
    }

    @Override
    public EventParticipantEntity getEntityById(long id) {
        return participantRepository.getById(id);
    }

    @Override
    public List<EventParticipantEntity> getAll(Pageable pageable) {
        return participantRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<EventParticipantDto> convertToDtos(@NonNull List<EventParticipantEntity> entities) {
        List<EventParticipantDto> eventParticipantDtos = entities.stream().map(EventConvertor::eventParticipantEntityToDto).collect(Collectors.toList());
        eventParticipantDtos.forEach(p->p.getUser().setRate(userRateService.calculateUserRate(UserParam.builder().id(p.getUser().getId()).build())));
        eventParticipantDtos.forEach(p->p.getEvent().getOwner().setRate(userRateService.calculateUserRate(UserParam.builder().id(p.getEvent().getOwner().getId()).build())));
        eventParticipantDtos.forEach(p->p.getEvent().getParticipants().forEach(c->((UserDto)c).setRate(userRateService.calculateUserRate(UserParam.builder().id(((UserDto)c).getId()).build()))));
        return eventParticipantDtos;
    }

    @Override
    public List<UserDto> getEventParticipant(Long id) {
        BaseEventEntity entity = eventRepository.getById(id);
        List<User> allParticipants = participantRepository.getUserByEventAndDeleted(entity);
        List<UserDto> userDtos = UserConvertor.usersToUserDtos(allParticipants);
        userDtos.forEach(c->c.setRate(userRateService.calculateUserRate(UserParam.builder().id(c.getId()).build())));
        return userDtos;
    }

    public List<EventParticipantEntity> getEventParticipantEntities(@NonNull User user){
        return participantRepository.findAllByUserAndDeletedIsFalse(user);
    }

    public Long getEventParticipantCount(@NonNull BaseEventEntity event){
        return participantRepository.countAllByEventAndDeletedIsFalse(event);
    }

    private void validateParamForAdd(@NonNull EventParticipantParam param){
        if(param.getEvent()==null || !GeneralValidator.validateId(param.getEvent())){
            throw new InputNotValidException();//event is empty
        }
    }


}
