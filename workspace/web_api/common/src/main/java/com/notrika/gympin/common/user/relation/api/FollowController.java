package com.notrika.gympin.common.user.relation.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.user.relation.dto.FollowDto;
import com.notrika.gympin.common.user.relation.param.FollowParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowController extends BaseController<FollowParam, FollowDto, BaseQuery<?>> {

    ResponseEntity<List<UserDto>> getFollowers(UserParam user);

    ResponseEntity<List<UserDto>> getFollowing(UserParam user);

//    ResponseEntity<List<UserDto>> getFollowers(String username);
//
//    ResponseEntity<List<UserDto>> getFollowing(String username);
//
//    ResponseEntity<List<UserDto>> getFollowers(Long id);
//
//    ResponseEntity<List<UserDto>> getFollowing(Long id);

}
