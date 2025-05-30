package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.settings.userSettings.param.UserSettingParam;
import com.notrika.gympin.common.settings.userSettings.service.userSettingsService;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.user.user.api.UserController;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.common.user.user.query.UserQuery;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private userSettingsService userSettingsService;

    @Override
    public ResponseEntity<UserDto> add(UserParam userParam) {
//        return ResponseEntity.ok(userService.add(userParam));
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<UserDto> update(UserParam userParam) {
        return ResponseEntity.ok(userService.update(userParam));
    }

    @Override
    public ResponseEntity<UserDto> delete(UserParam userParam) {
        return ResponseEntity.ok(userService.delete(userParam));
    }

    @Override
    public ResponseEntity<List<UserDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(userService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<UserDto> getById(Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @Override
    @GetMapping("/getMyInfo")
    public ResponseEntity<UserDto> getMyInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @Override
    @PostMapping("/getMyPlaceWallet")
    public ResponseEntity<UserCreditDto> getMyPlaceWallet(PlaceGymParam placeParam) {
        return ResponseEntity.ok(userService.getMyPlaceWallet(placeParam));
    }

    @Override
    @GetMapping("/getUserCredits")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<UserCreditDto> getUserCredits(UserParam param) {
        return ResponseEntity.ok(userService.getAllCreditsByUser(param));
    }
    @Override
    @GetMapping("/getMyCredits")
    public ResponseEntity<UserCreditDto> getMyCredits() {
        return ResponseEntity.ok(userService.getMyCredits());
    }

    //status
    @Override
    @GetMapping("/getUserStatuses")
    public ResponseEntity<List<String>> getUserStatuses() {
        return ResponseEntity.ok(Arrays.stream(UserStatus.values()).map(Enum::toString).collect(Collectors.toList()));
    }


    @Override
    @GetMapping("/getUserSettings")
    public ResponseEntity<List<UserSettingDto>> getUserSettings(UserSettingParam userSettingParam) {
        return ResponseEntity.ok(userSettingsService.getUserSettings(userSettingParam.getId()));
    }

    @Override
    @PostMapping("/setUserSettings")
    public ResponseEntity<UserSettingDto> SetUserSettings(UserSettingParam userSettingParam) {
        UserSettingDto userSettingDto;
        if(userSettingParam.getId()!=null){
           userSettingDto = userSettingsService.update(userSettingParam);
        }else{
           userSettingDto = userSettingsService.add(userSettingParam);
        }
        return ResponseEntity.ok(userSettingDto);
    }

    @Override
    @PutMapping("/updateUserStatus")
    public ResponseEntity<UserDto> updateUserStatus(UserStatusParam userParam) {
        return ResponseEntity.ok(userService.updateUserStatus(userParam));
    }

    //avatar
    @Override
    @PutMapping("/updateUserAvatar")
    public ResponseEntity<UserDto> updateUserAvatar(UserAvatarParam userParam) {
        return ResponseEntity.ok(userService.updateUserAvatar(userParam));
    }

    @Override
    @GetMapping("/getUserByUsername")
    public ResponseEntity<UserDto> getUserByUsername(UserParam userParam) {
        return ResponseEntity.ok(userService.getUserByUsername(userParam));
    }

    @Override
    @GetMapping("/checkUsernameAvailable")
    public ResponseEntity<Boolean> checkUsernameAvailable(String username) {
        return ResponseEntity.ok(userService.checkUsernameAvailable(username));
    }

    @Override
    public ResponseEntity<Page<UserDto>> query(UserQuery param) {
        return ResponseEntity.ok(userService.query(param));
    }

}
