package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.user.api.UserRateController;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserRateParam;
import com.notrika.gympin.common.user.service.UserRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-rate")
public class UserRateControllerImpl implements UserRateController {

    @Autowired
    private UserRateService userRateService;

    @Override
    public ResponseEntity<UserRateDto> add(UserRateParam userRateParam) {
        return ResponseEntity.ok(userRateService.add(userRateParam));
    }

    @Override
    public ResponseEntity<UserRateDto> update(UserRateParam userRateParam) {
        return ResponseEntity.ok(userRateService.update(userRateParam));
    }

    @Override
    public ResponseEntity<UserRateDto> delete(UserRateParam userRateParam) {
        return ResponseEntity.ok(userRateService.delete(userRateParam));
    }

    @Override
    public ResponseEntity<List<UserRateDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(userRateService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<UserRateDto> getById(Long id) {
        return ResponseEntity.ok(userRateService.getById(id));
    }

    @Override
    @GetMapping("/getRateableUsers")
    public ResponseEntity<List<RateableUsersDto>> getRateableUsers(BasePagedParam<?> pagedParam) {
        return ResponseEntity.ok(userRateService.getRateableUsers(pagedParam));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserRateDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserRateDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
