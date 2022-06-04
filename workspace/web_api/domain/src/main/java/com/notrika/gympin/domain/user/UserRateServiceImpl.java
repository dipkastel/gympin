package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.user.UserRateOutOfBoundException;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;
import com.notrika.gympin.common.user.service.UserRateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.UserRateRepository;
import com.notrika.gympin.persistence.entity.rating.UserRate;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRateServiceImpl extends AbstractBaseService<UserRateParam, UserRateDto, UserRate> implements UserRateService {

    @Autowired
    private UserRateRepository userRateRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public UserRateDto add(UserRateParam userRateParam) {
        if(userRateParam.getRate()>5 || userRateParam.getRate()<0){
            throw new UserRateOutOfBoundException();//out of range
        }
        User judger = (User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        User judging = userService.getEntityById(userRateParam.getJudgingUser().getId());
        UserRate userRate=new UserRate();
        userRate.setJudgerUser(judger);
        userRate.setJudgingUser(judging);
        userRate.setRate(userRateParam.getRate());
        UserRate entity = add(userRate);
        UserRateDto userRateDto=new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(entity.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(entity.getJudgingUser()));
        userRateDto.setRate(entity.getRate());
        userRateDto.setId(userRate.getId());
        return userRateDto;
    }

    @Override
    public UserRateDto update(UserRateParam userRateParam) {
        if(userRateParam.getRate()>5 || userRateParam.getRate()<0){
            throw new UserRateOutOfBoundException();//out of range
        }
        UserRate userRate = getEntityById(userRateParam.getId());
        userRate.setJudgerUser((User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
        userRate.setJudgingUser(userService.getEntityById(userRateParam.getJudgingUser().getId()));
        userRate.setRate(userRateParam.getRate());
        UserRate entity = update(userRate);
        UserRateDto userRateDto=new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(entity.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(entity.getJudgingUser()));
        userRateDto.setRate(entity.getRate());
        userRateDto.setId(userRate.getId());
        return userRateDto;
    }

    @Override
    public UserRateDto delete(UserRateParam userRateParam) {
        UserRate entity = getEntityById(userRateParam.getId());
        UserRate deletedEntity = delete(entity);
        return null;
    }

    @Override
    public UserRateDto getById(long id) {
        UserRate userRate = getEntityById(id);
        UserRateDto userRateDto=new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(userRate.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(userRate.getJudgingUser()));
        userRateDto.setRate(userRate.getRate());
        userRateDto.setId(userRate.getId());
        userRate.setDeleted(userRate.isDeleted());
        return userRateDto;
    }

    @Override
    public UserRate add(UserRate entity) {
        return userRateRepository.add(entity);
    }

    @Override
    public UserRate update(UserRate entity) {
        return userRateRepository.update(entity);
    }

    @Override
    public UserRate delete(UserRate entity) {
        return userRateRepository.deleteById2(entity);
    }

    @Override
    public UserRate getEntityById(long id) {
        return userRateRepository.getById(id);
    }

    @Override
    public List<UserRate> getAll(Pageable pageable) {
        return userRateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserRateDto> convertToDtos(List<UserRate> entities) {
        return entities.stream().map(UserRateServiceImpl::userRateToUserRateDto).collect(Collectors.toList());
    }

    public static UserRateDto userRateToUserRateDto(UserRate userRate){
        UserRateDto userRateDto=new UserRateDto();
        userRateDto.setJudgerUser(UserConvertor.userToUserDtoComplete(userRate.getJudgerUser()));
        userRateDto.setJudgingUser(UserConvertor.userToUserDtoComplete(userRate.getJudgingUser()));
        userRateDto.setRate(userRate.getRate());
        userRateDto.setId(userRate.getId());
        userRate.setDeleted(userRate.isDeleted());
        return userRateDto;
    }

    @Override
    public float calculateUserRate(UserParam userParam) {
        User user = userService.getEntityById(userParam.getId());
        Float rateCount = userRateRepository.countAllByJudgingUserAndDeletedIsFalse(user);
        if(rateCount==0) {
            return 5F;
        }
        Float sumOfRate=userRateRepository.sumOfRateOfUser(user);
        return sumOfRate/rateCount;
    }
}
