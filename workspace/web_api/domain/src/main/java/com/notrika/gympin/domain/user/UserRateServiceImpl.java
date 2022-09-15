package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.exception.user.UserRateOutOfBoundException;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;
import com.notrika.gympin.common.user.service.UserRateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.event.walking.WalkingEventServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.UserRateRepository;
import com.notrika.gympin.persistence.entity.rating.UserRateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRateServiceImpl extends AbstractBaseService<UserRateParam, UserRateDto, BaseFilter<?>, UserRateEntity> implements UserRateService {

    @Autowired
    private UserRateRepository userRateRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private WalkingEventServiceImpl walkingEventService;


    public static UserRateDto userRateToUserRateDto(UserRateEntity userRate) {
        UserRateDto userRateDto = new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(userRate.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(userRate.getJudgingUser()));
        userRateDto.setRate(userRate.getRate());
        userRateDto.setId(userRate.getId());
        userRate.setDeleted(userRate.isDeleted());
        return userRateDto;
    }

    @Override
    public UserRateDto add(UserRateParam userRateParam) {
        if (userRateParam.getRate() > 5 || userRateParam.getRate() < 0) {
            throw new UserRateOutOfBoundException();//out of range
        }
        UserEntity judger = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        UserEntity judging = userService.getEntityById(userRateParam.getJudgingUser().getId());
        UserRateEntity userRate = new UserRateEntity();
        userRate.setJudgerUser(judger);
        userRate.setJudgingUser(judging);
        userRate.setRate(userRateParam.getRate());
        UserRateEntity entity = add(userRate);
        UserRateDto userRateDto = new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(entity.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(entity.getJudgingUser()));
        userRateDto.setRate(entity.getRate());
        userRateDto.setId(userRate.getId());
        return userRateDto;
    }

    @Override
    public UserRateDto update(UserRateParam userRateParam) {
        if (userRateParam.getRate() > 5 || userRateParam.getRate() < 0) {
            throw new UserRateOutOfBoundException();//out of range
        }
        UserRateEntity userRate = getEntityById(userRateParam.getId());
        userRate.setJudgerUser((UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
        userRate.setJudgingUser(userService.getEntityById(userRateParam.getJudgingUser().getId()));
        userRate.setRate(userRateParam.getRate());
        UserRateEntity entity = update(userRate);
        UserRateDto userRateDto = new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(entity.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(entity.getJudgingUser()));
        userRateDto.setRate(entity.getRate());
        userRateDto.setId(userRate.getId());
        return userRateDto;
    }

    @Override
    public UserRateDto delete(UserRateParam userRateParam) {
        UserRateEntity entity = getEntityById(userRateParam.getId());
        UserRateEntity deletedEntity = delete(entity);
        return null;
    }

    @Override
    public UserRateDto getById(long id) {
        UserRateEntity userRate = getEntityById(id);
        UserRateDto userRateDto = new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(userRate.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(userRate.getJudgingUser()));
        userRateDto.setRate(userRate.getRate());
        userRateDto.setId(userRate.getId());
        userRate.setDeleted(userRate.isDeleted());
        return userRateDto;
    }

    @Override
    public UserRateEntity add(UserRateEntity entity) {
        return userRateRepository.add(entity);
    }

    @Override
    public UserRateEntity update(UserRateEntity entity) {
        return userRateRepository.update(entity);
    }

    @Override
    public UserRateEntity delete(UserRateEntity entity) {
        return userRateRepository.deleteById2(entity);
    }

    @Override
    public UserRateEntity getEntityById(long id) {
        return userRateRepository.getById(id);
    }

    @Override
    public List<UserRateEntity> getAll(Pageable pageable) {
        return userRateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserRateDto> convertToDtos(List<UserRateEntity> entities) {
        return entities.stream().map(UserRateServiceImpl::userRateToUserRateDto).collect(Collectors.toList());
    }

    @Override
    public float calculateUserRate(UserParam userParam) {
        UserEntity user = userService.getEntityById(userParam.getId());
        Float rateCount = userRateRepository.countAllByJudgingUserAndDeletedIsFalse(user);
        if (rateCount == 0) {
            return 5F;
        }
        Float sumOfRate = userRateRepository.sumOfRateOfUser(user);
        return sumOfRate / rateCount;
    }

    @Override
    public List<RateableUsersDto> getRateableUsers(BasePagedParam<?> pagedParam) {
        UserEntity user1 = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        List<RateableUsersDto> rateableUsers = new ArrayList<>();
        UserWalkingEventDto allEventOfUser = walkingEventService.getAllEventOfUser(null);
        for (WalkingEventDto dto : allEventOfUser.getOwnedEvents()) {
            Date startDate = dto.getStartDate();
            Calendar instance = Calendar.getInstance();
            instance.setTime(startDate);
            instance.add(Calendar.HOUR, 2);
            Date endDate = instance.getTime();
            if (endDate.after(new Date())) continue;

            RateableUsersDto dto2 = new RateableUsersDto();
            dto2.setEvent(dto);
            List<UserDto> userOfThisEvent = new ArrayList<>();
            for (UserDto dto1 : dto.getParticipants()) {
                List<UserRateEntity> rates = userRateRepository.findAllByJudgerUserAndJudgingUserAndDeletedIsFalse(user1, userService.getEntityById(dto1.getId()));
                if (rates == null || rates.isEmpty()) {
                    userOfThisEvent.add(dto1);
                }
            }
            dto2.setUsers(userOfThisEvent);
            rateableUsers.add(dto2);
        }
        for (WalkingEventDto dto : allEventOfUser.getParticipatedEvents()) {
            Date startDate = dto.getStartDate();
            Calendar instance = Calendar.getInstance();
            instance.setTime(startDate);
            instance.add(Calendar.HOUR, 2);
            Date endDate = instance.getTime();
            if (endDate.after(new Date())) continue;

            RateableUsersDto dto1 = new RateableUsersDto();
            dto1.setEvent(dto);
            List<UserDto> users = new ArrayList<>();
            List<UserRateEntity> rates = userRateRepository.findAllByJudgerUserAndJudgingUserAndDeletedIsFalse(user1, userService.getEntityById(dto.getOwner().getId()));
            if (rates == null || rates.isEmpty()) {
                users.add(dto.getOwner());
            }
            for (UserDto user : dto.getParticipants()) {
                if (!user.equals(GympinContextHolder.getContext().getUser())) {
                    List<UserRateEntity> rates1 = userRateRepository.findAllByJudgerUserAndJudgingUserAndDeletedIsFalse(user1, userService.getEntityById(user.getId()));
                    if (rates1 == null || rates1.isEmpty()) {
                        users.add(user);
                    }
                }
            }
            dto1.setUsers(users);
            rateableUsers.add(dto1);
        }

        return rateableUsers;
    }
}
