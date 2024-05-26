package com.notrika.gympin.common.user.user.api;

import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.settings.userSettings.param.UserSettingParam;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.query.UserQuery;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserController extends BaseController<UserParam, UserDto, UserQuery> {

    //stattus
    ResponseEntity<List<String>> getUserStatuses();

    ResponseEntity<List<UserSettingDto>> getUserSettings(UserSettingParam userSettingParam);
    ResponseEntity<UserSettingDto> SetUserSettings(@RequestBody UserSettingParam userSettingParam);

    ResponseEntity<UserDto> updateUserStatus(@RequestBody UserStatusParam userParam);

    //avatar
    ResponseEntity<UserDto> updateUserAvatar(@RequestBody UserAvatarParam userParam);

    ResponseEntity<UserDto> getUserByUsername(UserParam userParam);

    ResponseEntity<Boolean> checkUsernameAvailable(String username);

    ResponseEntity<UserDto> getMyInfo();

    ResponseEntity<UserCreditDto> getUserCredits(UserParam param);
    ResponseEntity<UserCreditDto> getMyCredits();



}
