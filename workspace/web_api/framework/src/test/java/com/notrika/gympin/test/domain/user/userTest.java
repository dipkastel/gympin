package com.notrika.gympin.test.domain.user;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.param.UserRoleUpdateParam;
import com.notrika.gympin.common.user.user.param.UserStatusParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class userTest extends BaseTest {


    public static UserDto userDto = null;

    @Test
    @Order(1)
    public void updateUser() throws Exception {
        UserParam param = UserParam.builder()
                .id(1l)
                .fullName("amir ashrafi")
                .username("amirAshrafi")
                .birthday(new Date())
                .gender(Gender.MALE)
                .nationalCode("0010258093")
                .email("asd@asd.asd")
                .bio("man man man")
                .build();


        ResponseModel<UserDto> result = TestPut(
                "/api/v1/user/update",
                param,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                }
        );

        Assertions.assertEquals(result.getData().getPhoneNumber(), "09126540027");
        Assertions.assertEquals(result.getData().getUsername(), "amirAshrafi");
        Assertions.assertEquals(result.getData().getFullName(), "amir ashrafi");
        Assertions.assertEquals(result.getData().getGender(), Gender.MALE);
        Assertions.assertEquals(result.getData().getNationalCode(), "0010258093");
        Assertions.assertEquals(result.getData().getEmail(), "asd@asd.asd");
        Assertions.assertEquals(result.getData().getBio(), "man man man");
        userDto = result.getData();
    }

    @Test
    @Order(2)
    public void getbyId() throws Exception {
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", 1);

        ResponseModel<UserDto> result = TestGet(
                "/api/v1/user/getById",
                param,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                });

        Assertions.assertEquals(result.getData().getPhoneNumber(), "09126540027");
        Assertions.assertEquals(result.getData().getUsername(), "amirAshrafi");
        Assertions.assertEquals(result.getData().getFullName(), "amir ashrafi");
        Assertions.assertEquals(result.getData().getGender(), Gender.MALE);
        Assertions.assertEquals(result.getData().getNationalCode(), "0010258093");
        Assertions.assertEquals(result.getData().getEmail(), "asd@asd.asd");
        Assertions.assertEquals(result.getData().getBio(), "man man man");
    }

    @Test
    @Order(3)
    public void getMyInfo() throws Exception {

        ResponseModel<UserDto> result = TestGet(
                "/api/v1/user/getMyInfo",
                null,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                });

        Assertions.assertEquals(result.getData().getPhoneNumber(), "09126540027");
        Assertions.assertEquals(result.getData().getUsername(), "amirAshrafi");
        Assertions.assertEquals(result.getData().getFullName(), "amir ashrafi");
        Assertions.assertEquals(result.getData().getGender(), Gender.MALE);
        Assertions.assertEquals(result.getData().getNationalCode(), "0010258093");
        Assertions.assertEquals(result.getData().getEmail(), "asd@asd.asd");
        Assertions.assertEquals(result.getData().getBio(), "man man man");
    }

    @Test
    @Order(4)
    public void getUserStatuses() throws Exception {

        ResponseModel<List<String>> result = TestGet(
                "/api/v1/user/getUserStatuses",
                null,
                true,
                new TypeReference<ResponseModel<List<String>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
    }


    @Test
    @Order(5)
    public void updateUserStatus() throws Exception {
        UserStatusParam param = UserStatusParam.builder()
                .id(1l)
                .status(UserStatus.ENABLED)
                .build();
        ResponseModel<UserDto> result = TestPut(
                "/api/v1/user/updateUserStatus",
                param,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                });
        Assertions.assertEquals(result.getData().getUserStatus(), UserStatus.ENABLED);
    }

    @Test
    @Order(6)
    public void getUserRoles() throws Exception {

        ResponseModel<List<UserRoleInfoDto>> result = TestGet(
                "/api/v1/user/getUserRoles",
                null,
                true,
                new TypeReference<ResponseModel<List<UserRoleInfoDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
    }

    @Test
    @Order(7)
    public void updateUserRole() throws Exception {
        UserRoleUpdateParam param = UserRoleUpdateParam.builder()
                .userId(1l)
                .role(UserRole.SUPER_ADMIN)
                .build();

        ResponseModel<UserDto> result = TestPut(
                "/api/v1/user/updateUserRole",
                param,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                });
        Assertions.assertEquals(result.getData().getUserStatus(), UserStatus.ENABLED);
    }

    @Test
    @Order(8)
    public void getUserByUsername() throws Exception {

        final Map<String, Object> param = new TreeMap<>();
        param.put("Username", "amirAshrafi");

        ResponseModel<UserDto> result = TestGet(
                "/api/v1/user/getUserByUsername",
                param,
                true,
                new TypeReference<ResponseModel<UserDto>>() {
                });

        Assertions.assertEquals(result.getData().getUsername(), "amirAshrafi");
    }


    @Test
    @Order(9)
    public void checkUsernameAvailable() throws Exception {

        final Map<String, Object> param = new TreeMap<>();
        param.put("username", "amirAshrafi22");

        ResponseModel<Boolean> result = TestGet(
                "/api/v1/user/checkUsernameAvailable",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                });

        Assertions.assertTrue(result.getData());
    }


//    @Test
//    @Order(10)
//    public void getCreditByUser() throws Exception {
//        final Map<String, Object> param = new TreeMap<>();
//        param.put("id", "1");
//
//        ResponseModel<UserCreditDto> result = TestGet(
//                "/api/v1/user/getCreditByUser",
//                param,
//                true,
//                new TypeReference<ResponseModel<UserCreditDto>>() {
//                });
//
//        Assertions.assertNotNull(result.getData().getCreditDetail());
//    }


}
