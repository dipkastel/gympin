package com.notrika.gympin.common.relation.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.common.relation.param.FollowParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowController extends BaseController<FollowParam, FollowDto, BaseFilter<?>> {

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
