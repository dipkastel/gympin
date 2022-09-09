package com.notrika.gympin.controller.impl.relation;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.relation.api.FollowController;
import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.common.relation.param.FollowParam;
import com.notrika.gympin.common.relation.service.FollowService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/follow")
public class FollowControllerImpl implements FollowController {

    @Autowired
    private FollowService followService;

    @Override
    public ResponseEntity<FollowDto> add(FollowParam followParam) {
        return ResponseEntity.ok(followService.add(followParam));
    }

    @Override
    public ResponseEntity<FollowDto> update(FollowParam followParam) {
        return ResponseEntity.ok(followService.update(followParam));
    }

    @Override
    public ResponseEntity<FollowDto> delete(FollowParam followParam) {
        return ResponseEntity.ok(followService.delete(followParam));
    }

    @Override
    public ResponseEntity<List<FollowDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(followService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<FollowDto> getById(Long id) {
        return ResponseEntity.ok(followService.getById(id));
    }

    @Override
    @GetMapping("/followers")
    public ResponseEntity<List<UserDto>> getFollowers(UserParam user) {
        return ResponseEntity.ok(followService.getFollowers(user));
    }

    @Override
    @GetMapping("/following")
    public ResponseEntity<List<UserDto>> getFollowing(UserParam user) {
        return ResponseEntity.ok(followService.getFollowing(user));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<FollowDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<FollowDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
