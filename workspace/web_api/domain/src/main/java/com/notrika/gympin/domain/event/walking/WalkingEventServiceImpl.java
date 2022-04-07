package com.notrika.gympin.domain.event.walking;

import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.event.walking.service.WalkingEventService;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.event.general.EventParticipantServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.EventConvertor;
import com.notrika.gympin.persistence.dao.repository.WalkingEventRepository;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;
import com.notrika.gympin.persistence.entity.sport.Sport;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WalkingEventServiceImpl extends AbstractBaseService<WalkingEventParam, WalkingEventDto, WalkingEventEntity> implements WalkingEventService {

    @Autowired
    private WalkingEventRepository walkingEventRepository;

    @Autowired
    private SportServiceImpl sportService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private EventParticipantServiceImpl eventParticipantService;

    @Override
    @Transactional
    public WalkingEventDto add(WalkingEventParam walkingEventParam) {
        Sport sport = sportService.getEntityById(walkingEventParam.getSport().getId());
        WalkingEventEntity walkingEvent =
                WalkingEventEntity.builder().sport(sport).title(walkingEventParam.getTitle()).description(walkingEventParam.getDescription()).startLatitude(walkingEventParam.getStartLatitude()).startLongitude(walkingEventParam.getStartLongitude()).endLatitude(walkingEventParam.getEndLatitude()).endLongitude(walkingEventParam.getEndLongitude()).participantCount(walkingEventParam.getParticipantCount()).startDate(walkingEventParam.getStartDate()).build();
        WalkingEventEntity entity = walkingEventRepository.add(walkingEvent);
        if (entity.getParticipants() == null) entity.setParticipants(new ArrayList<>());
        for (UserParam userParam : walkingEventParam.getParticipants()) {
            User user = userService.getEntityById(userParam.getId());
            EventParticipantEntity eventParticipant = eventParticipantService.add(EventParticipantEntity.builder().event(entity).user(user).build());
            entity.getParticipants().add(eventParticipant);
        }
        //        entity=walkingEventRepository.getById(entity.getId());
        //        entity.getParticipants();
        return EventConvertor.walkingEventEntityToDto(entity);
    }

    @Override
    public WalkingEventDto update(WalkingEventParam walkingEventParam) {
        Sport sport = sportService.getEntityById(walkingEventParam.getSport().getId());
        WalkingEventEntity walkingEventEntity = getEntityById(walkingEventParam.getId());
        walkingEventEntity.setSport(sport);
        walkingEventEntity.setTitle(walkingEventEntity.getTitle());
        walkingEventEntity.setDescription(walkingEventEntity.getDescription());
        walkingEventEntity.setStartLatitude(walkingEventParam.getStartLatitude());
        walkingEventEntity.setStartLongitude(walkingEventEntity.getStartLongitude());
        walkingEventEntity.setEndLatitude(walkingEventEntity.getEndLatitude());
        walkingEventEntity.setEndLongitude(walkingEventEntity.getEndLongitude());
        walkingEventEntity.setParticipantCount(walkingEventEntity.getParticipantCount());
        WalkingEventEntity entity = update(walkingEventEntity);
        return EventConvertor.walkingEventEntityToDto(entity);
    }

    @Override
    public WalkingEventDto delete(WalkingEventParam walkingEventParam) {
        WalkingEventEntity walkingEvent = getEntityById(walkingEventParam.getId());
        WalkingEventEntity entity = delete(walkingEvent);
        return EventConvertor.walkingEventEntityToDto(entity);
    }

    @Override
    public UserWalkingEventDto getAllEventOfUser(UserParam user) {
        User user1 = userService.getEntityById(user.getId());
        List<WalkingEventEntity> ownedEvents = walkingEventRepository.findAllByCreatorUserAndDeleted(user1, false);
        EventParticipantEntity eventParticipantEntity=new EventParticipantEntity();
        eventParticipantEntity.setUser(user1);
        List<EventParticipantEntity> eventParticipantEntities=new ArrayList<>();
        eventParticipantEntities.add(eventParticipantEntity);
        List<WalkingEventEntity> participatedEvents = walkingEventRepository.findAllByParticipantsAndDeleted(eventParticipantEntities, false);
        UserWalkingEventDto userWalkingEventDto = new UserWalkingEventDto();
        userWalkingEventDto.setOwnedEvents(ownedEvents.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList()));
        userWalkingEventDto.setParticipatedEvents(participatedEvents.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList()));

        return userWalkingEventDto;

        //        return walkingEventRepository.getAllEventOfUser(user.getId()).stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList());
    }

    @Override
    public WalkingEventDto getById(long id) {
        WalkingEventEntity entity = getEntityById(id);
        return EventConvertor.walkingEventEntityToDto(entity);
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
        return entities.stream().map(EventConvertor::walkingEventEntityToDto).collect(Collectors.toList());
    }
}
