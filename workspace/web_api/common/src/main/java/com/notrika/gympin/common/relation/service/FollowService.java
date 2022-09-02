package com.notrika.gympin.common.relation.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.common.relation.param.FollowParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface FollowService extends BaseService<FollowParam, FollowDto, BaseFilter<?>> {

    void unfollow();

    void block();

    List<UserDto> getFollowers(UserParam user);

    List<UserDto> getFollowing(UserParam user);

}
