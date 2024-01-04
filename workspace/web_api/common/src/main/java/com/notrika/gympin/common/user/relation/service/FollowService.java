package com.notrika.gympin.common.user.relation.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.user.relation.dto.FollowDto;
import com.notrika.gympin.common.user.relation.param.FollowParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface FollowService extends BaseService<FollowParam, FollowDto, BaseQuery<?>> {

    void unfollow();

    void block();

    List<UserDto> getFollowers(UserParam user);

    List<UserDto> getFollowing(UserParam user);

}
