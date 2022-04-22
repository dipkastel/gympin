package com.notrika.gympin.domain.event.general;

import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.event.general.service.EventParticipantService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.EventConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.BaseEventRepository;
import com.notrika.gympin.persistence.dao.repository.EventParticipantRepository;
import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.user.User;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventParticipantServiceImpl extends AbstractBaseService<EventParticipantParam, EventParticipantDto, EventParticipantEntity> implements EventParticipantService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private BaseEventRepository eventRepository;

    @Autowired
    private EventParticipantRepository participantRepository;

    @Override
    public EventParticipantDto add(EventParticipantParam eventParticipantParam) {
        BaseEventEntity event = eventRepository.getById(eventParticipantParam.getEvent().getId());
        User user = userService.getEntityById(eventParticipantParam.getUser().getId());
        EventParticipantEntity entity = add(EventParticipantEntity.builder().event(event).user(user).build());
        return EventConvertor.eventParticipantEntityToDto(entity);
    }

    @Override
    public EventParticipantDto update(EventParticipantParam eventParticipantParam) {
        throw new NotYetImplementedException();
    }

    @Override
    public EventParticipantDto delete(EventParticipantParam eventParticipantParam) {
        EventParticipantEntity entity = getEntityById(eventParticipantParam.getId());
        return EventConvertor.eventParticipantEntityToDto(delete(entity));
    }

    @Override
    public EventParticipantDto getById(long id) {
        EventParticipantEntity entity = getEntityById(id);
        return EventConvertor.eventParticipantEntityToDto(entity);
    }

    @Override
    //    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public EventParticipantEntity add(EventParticipantEntity entity) {
        return participantRepository.add(entity);
    }

    @Override
    public EventParticipantEntity update(EventParticipantEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public EventParticipantEntity delete(EventParticipantEntity entity) {
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
    public List<EventParticipantDto> convertToDtos(List<EventParticipantEntity> entities) {
        return entities.stream().map(EventConvertor::eventParticipantEntityToDto).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getEventParticipant(Long id) {
        BaseEventEntity entity = eventRepository.getById(id);
        List<User> allParticipants = participantRepository.getUserByEventAndDeleted(entity);
        return UserConvertor.usersToUserDtos(allParticipants);
    }

    public List<EventParticipantEntity> getEventParticipantEntities(User user){
        return participantRepository.findAllByUserAndDeletedIsFalse(user);
    }

}
