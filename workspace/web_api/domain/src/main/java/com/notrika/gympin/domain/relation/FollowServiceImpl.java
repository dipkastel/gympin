package com.notrika.gympin.domain.relation;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.exception.general.InputNotValidException;
import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.common.relation.param.FollowParam;
import com.notrika.gympin.common.relation.service.FollowService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserRateServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.FollowConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.FollowChangeStatusRepository;
import com.notrika.gympin.persistence.dao.repository.FollowRepository;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.relation.FollowChangeStatusEntity;
import com.notrika.gympin.persistence.entity.user.relation.FollowEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class FollowServiceImpl extends AbstractBaseService<FollowParam, FollowDto, BaseQuery<?>, FollowEntity> implements FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private FollowChangeStatusRepository followChangeStatusRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRateServiceImpl userRateService;

    @Override
    @Transactional
    public FollowDto add(FollowParam followParam) {
        //check condition
        UserEntity requestedUser = userService.getEntityById(followParam.getRequestedUser().getId());
        UserEntity requesterUser = userService.getEntityById(followParam.getRequesterUser().getId());
        FollowEntity followEntity = FollowEntity.builder().requesterUser(requesterUser).requestedUser(requestedUser).status(FollowingStatus.ACCEPTED).build();
        followEntity = add(followEntity);
        followChangeStatusRepository.add(FollowChangeStatusEntity.builder().follow(followEntity).preStatus(FollowingStatus.NONE).newStatus(FollowingStatus.ACCEPTED).build());
        FollowDto followDto = FollowConvertor.followEntityToDto(followEntity);
        followDto.getRequestedUser().setRate(userRateService.calculateUserRate(UserParam.builder().id(followDto.getRequestedUser().getId()).build()));
        followDto.getRequesterUser().setRate(userRateService.calculateUserRate(UserParam.builder().id(followDto.getRequesterUser().getId()).build()));
        return followDto;
    }

    @Override
    @Transactional
    public FollowDto update(FollowParam followParam) {
        Long id, requesterId, requestedId;
        UserParam requesterUserParam, requestedUserParam = null;
        UserEntity requesterUser, requestedUser;
        String requesterUsername, requestedUsername;
        FollowEntity updatedEntity;
        if ((id = followParam.getId()) != null && id > 0) {
            FollowEntity followEntity = getEntityById(id);
            FollowingStatus preStatus = followEntity.getStatus();
            followEntity.setStatus(followParam.getStatus());
            updatedEntity = update(followEntity);
            followChangeStatusRepository.add(FollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
        } else if ((requesterUserParam = followParam.getRequesterUser()) != null && (requesterId = requesterUserParam.getId()) != null && requesterId > 0 && (requestedUserParam
                = followParam.getRequestedUser()) != null && (requestedId = requestedUserParam.getId()) != null && requestedId > 0) {
            requesterUser = userService.getEntityById(requesterId);
            requestedUser = userService.getEntityById(requestedId);
            FollowEntity followEntity = followRepository.getByRequesterUserAndRequestedUserAndDeleted(requesterUser, requestedUser, false);
            FollowingStatus preStatus = followEntity.getStatus();
            followEntity.setStatus(followParam.getStatus());
            updatedEntity = update(followEntity);
            followChangeStatusRepository.add(FollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
        } else if (!StringUtils.isEmpty(requesterUsername = requesterUserParam.getUsername().trim()) && !StringUtils.isEmpty(requestedUsername =
                requestedUserParam.getUsername().trim())) {
            requesterUser = userService.getByPhoneNumber(requesterUsername);
            requestedUser = userService.getByPhoneNumber(requestedUsername);
            FollowEntity followEntity = followRepository.getByRequesterUserAndRequestedUserAndDeleted(requesterUser, requestedUser, false);
            FollowingStatus preStatus = followEntity.getStatus();
            followEntity.setStatus(followParam.getStatus());
            updatedEntity = update(followEntity);
            followChangeStatusRepository.add(FollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
        } else {
            throw new InputNotValidException();
        }
        return null;
    }

    @Override
    public FollowDto delete(FollowParam followParam) {
        return null;
    }

    @Override
    public FollowDto getById(long id) {
        return null;
    }

    @Override
    public void unfollow() {

    }

    @Override
    public void block() {

    }

    @Override
    public FollowEntity add(FollowEntity entity) {
        return followRepository.add(entity);
    }

    @Override
    public FollowEntity update(FollowEntity entity) {
        return followRepository.update(entity);
    }

    @Override
    public FollowEntity delete(FollowEntity entity) {
        return null;
    }

    @Override
    public FollowEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<FollowEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<FollowEntity> findAll(Specification<FollowEntity> specification, Pageable pageable) {

        return followRepository.findAll(specification,pageable);
    }

    @Override
    public List<FollowDto> convertToDtos(List<FollowEntity> entities) {
        return null;
    }

    @Override
    public Page<FollowDto> convertToDtos(Page<FollowEntity> entities) {
        return null;
    }

    @Override
    public List<UserDto> getFollowers(UserParam user) {
        List<UserEntity> followers = followRepository.getFollowers(user.getId());
        return UserConvertor.toDto(followers);
    }

    @Override
    public List<UserDto> getFollowing(UserParam user) {
        List<UserEntity> followers = followRepository.getFollowings(user.getId());
        return UserConvertor.toDto(followers);
    }

    public Long getFollowersCount(UserEntity user) {
        return followRepository.getFollowersCount(user.getId());
    }

    public Long getFollowingsCount(UserEntity user) {
        return followRepository.getFollowingsCount(user.getId());
    }


}
