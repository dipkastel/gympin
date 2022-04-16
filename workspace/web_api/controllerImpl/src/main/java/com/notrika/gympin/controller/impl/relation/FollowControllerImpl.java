package com.notrika.gympin.controller.impl.relation;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.relation.api.FollowController;
import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.common.relation.param.FollowParam;
import com.notrika.gympin.common.relation.service.FollowService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/follow")
public class FollowControllerImpl implements FollowController {

    @Autowired
    private FollowService followService;

    @Override
    public ResponseEntity<FollowDto> add(@RequestBody FollowParam followParam) {
        return new ResponseEntity<>(followService.add(followParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<FollowDto> update(FollowParam followParam) {
        return new ResponseEntity<>(followService.update(followParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<FollowDto> delete(FollowParam followParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<FollowDto>> getAll(BasePagedParam pagingParam) {
        return null;
    }

    @Override
    public ResponseEntity<FollowDto> getById(Long id) {
        return null;
    }

    @Override
    @GetMapping("/followers")
    public ResponseEntity<List<UserDto>> getFollowers(UserParam user) {
        return new ResponseEntity<>(followService.getFollowers(user), HttpStatus.OK);
    }

    @Override
    @GetMapping("/following")
    public ResponseEntity<List<UserDto>> getFollowing(UserParam user) {
        return new ResponseEntity<>(followService.getFollowing(user), HttpStatus.OK);
    }
}
