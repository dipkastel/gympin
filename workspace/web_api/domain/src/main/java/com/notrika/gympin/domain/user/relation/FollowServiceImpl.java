package com.notrika.gympin.domain.user.relation;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.InputNotValidException;
import com.notrika.gympin.common.user.relation.dto.FollowDto;
import com.notrika.gympin.common.user.relation.enums.FollowingStatus;
import com.notrika.gympin.common.user.relation.param.FollowParam;
import com.notrika.gympin.common.user.relation.service.FollowService;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.FollowConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.user.UserFollowChangeStatusRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserFollowRepository;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowChangeStatusEntity;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowEntity;
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
public class FollowServiceImpl extends AbstractBaseService<FollowParam, FollowDto, BaseQuery<?>, UserFollowEntity> implements FollowService {

    @Autowired
    private UserFollowRepository userFollowRepository;

    @Autowired
    private UserFollowChangeStatusRepository userFollowChangeStatusRepository;

    @Autowired
    private UserServiceImpl userService;


    @Override
    @Transactional
    public FollowDto add(FollowParam followParam) {
        //check condition
        UserEntity requestedUser = userService.getEntityById(followParam.getRequestedUser().getId());
        UserEntity requesterUser = userService.getEntityById(followParam.getRequesterUser().getId());
        UserFollowEntity userFollowEntity = UserFollowEntity.builder().requesterUser(requesterUser).requestedUser(requestedUser).status(FollowingStatus.ACCEPTED).build();
        userFollowEntity = add(userFollowEntity);
        userFollowChangeStatusRepository.add(UserFollowChangeStatusEntity.builder().follow(userFollowEntity).preStatus(FollowingStatus.NONE).newStatus(FollowingStatus.ACCEPTED).build());
        FollowDto followDto = FollowConvertor.followEntityToDto(userFollowEntity);
        return followDto;
    }

    @Override
    @Transactional
    public FollowDto update(FollowParam followParam) {
        Long id, requesterId, requestedId;
        UserParam requesterUserParam, requestedUserParam = null;
        UserEntity requesterUser, requestedUser;
        String requesterUsername, requestedUsername;
        UserFollowEntity updatedEntity;
        if ((id = followParam.getId()) != null && id > 0) {
            UserFollowEntity userFollowEntity = getEntityById(id);
            FollowingStatus preStatus = userFollowEntity.getStatus();
            userFollowEntity.setStatus(followParam.getStatus());
            updatedEntity = update(userFollowEntity);
            userFollowChangeStatusRepository.add(UserFollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
        } else if ((requesterUserParam = followParam.getRequesterUser()) != null && (requesterId = requesterUserParam.getId()) != null && requesterId > 0 && (requestedUserParam
                = followParam.getRequestedUser()) != null && (requestedId = requestedUserParam.getId()) != null && requestedId > 0) {
            requesterUser = userService.getEntityById(requesterId);
            requestedUser = userService.getEntityById(requestedId);
            UserFollowEntity userFollowEntity = userFollowRepository.getByRequesterUserAndRequestedUserAndDeleted(requesterUser, requestedUser, false);
            FollowingStatus preStatus = userFollowEntity.getStatus();
            userFollowEntity.setStatus(followParam.getStatus());
            updatedEntity = update(userFollowEntity);
            userFollowChangeStatusRepository.add(UserFollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
        } else if (!StringUtils.isEmpty(requesterUsername = requesterUserParam.getUsername().trim()) && !StringUtils.isEmpty(requestedUsername =
                requestedUserParam.getUsername().trim())) {
            requesterUser = userService.getByPhoneNumber(requesterUsername);
            requestedUser = userService.getByPhoneNumber(requestedUsername);
            UserFollowEntity userFollowEntity = userFollowRepository.getByRequesterUserAndRequestedUserAndDeleted(requesterUser, requestedUser, false);
            FollowingStatus preStatus = userFollowEntity.getStatus();
            userFollowEntity.setStatus(followParam.getStatus());
            updatedEntity = update(userFollowEntity);
            userFollowChangeStatusRepository.add(UserFollowChangeStatusEntity.builder().follow(updatedEntity).preStatus(preStatus).newStatus(updatedEntity.getStatus()).changeDate(new Date()).build());
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
    public UserFollowEntity add(UserFollowEntity entity) {
        return userFollowRepository.add(entity);
    }

    @Override
    public UserFollowEntity update(UserFollowEntity entity) {
        return userFollowRepository.update(entity);
    }

    @Override
    public UserFollowEntity delete(UserFollowEntity entity) {
        return null;
    }

    @Override
    public UserFollowEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<UserFollowEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<UserFollowEntity> findAll(Specification<UserFollowEntity> specification, Pageable pageable) {

        return userFollowRepository.findAll(specification,pageable);
    }

    @Override
    public List<FollowDto> convertToDtos(List<UserFollowEntity> entities) {
        return null;
    }

    @Override
    public Page<FollowDto> convertToDtos(Page<UserFollowEntity> entities) {
        return null;
    }

    @Override
    public List<UserDto> getFollowers(UserParam user) {
        List<UserEntity> followers = userFollowRepository.getFollowers(user.getId());
        return UserConvertor.toDto(followers);
    }

    @Override
    public List<UserDto> getFollowing(UserParam user) {
        List<UserEntity> followers = userFollowRepository.getFollowings(user.getId());
        return UserConvertor.toDto(followers);
    }

    public Long getFollowersCount(UserEntity user) {
        return userFollowRepository.getFollowersCount(user.getId());
    }

    public Long getFollowingsCount(UserEntity user) {
        return userFollowRepository.getFollowingsCount(user.getId());
    }


}
