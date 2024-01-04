package com.notrika.gympin.test.domain.user;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.user.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserInviteCodesDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.common.user.user.enums.UsernameType;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class userAccountTest extends BaseTest {

    @Value("${gympin.test.fullTest}")
    private Boolean fullTest;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static String code = null;
    public static String Token = null;
    public static String RefreshToken = null;
    public static UserInviteCodesDto userInviteCodes = null;

    @Test
    @Order(1)
    public void requestPublicMessage() throws Exception {
        RequestRegisterParam param = RequestRegisterParam.builder()
                .fullName("full name")
                .text("text ::DD")
                .phoneNumber("09126540027")
                .build();


        ResponseModel<Boolean> result = TestPost(
                "/api/v1/account/requestPublicMessage",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                }
        );

        Assertions.assertTrue(result.getData());
    }


    @Test
    @Order(2)
    public void requestRegisterAdvise() throws Exception {
        RequestRegisterParam param = RequestRegisterParam.builder()
                .fullName("full name2")
                .text("register advice")
                .phoneNumber("09126540027")
                .build();


        ResponseModel<Boolean> result = TestPost(
                "/api/v1/account/requestRegisterAdvise",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                }
        );

        Assertions.assertTrue(result.getData());
    }


    @Test
    @Order(3)
    public void requestRegisterCorporate() throws Exception {
        RequestRegisterParam param = RequestRegisterParam.builder()
                .fullName("full name")
                .text("corporate name")
                .phoneNumber("09126540027")
                .build();


        ResponseModel<Boolean> result = TestPost(
                "/api/v1/account/requestRegisterCorporate",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                }
        );
        Assertions.assertTrue(result.getData());
    }


    @Test
    @Order(4)
    public void requestRegisterPlace() throws Exception {
        RequestRegisterParam param = RequestRegisterParam.builder()
                .fullName("full name")
                .text("place name")
                .phoneNumber("09126540027")
                .build();


        ResponseModel<Boolean> result = TestPost(
                "/api/v1/account/requestRegisterPlace",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                }
        );

        Assertions.assertTrue(result.getData());
    }

    @Test
    @Order(5)
    public void getUserInviteCodes() throws Exception {

        ResponseModel<UserInviteCodesDto> result = TestGet(
                "/api/v1/account/getUserInviteCodes",
                null,
                true,
                new TypeReference<ResponseModel<UserInviteCodesDto>>() {
                });

        Assertions.assertNotNull(result.getData().getFirstInviteCode());
        Assertions.assertNotNull(result.getData().getSecondInviteCode());
        userInviteCodes = result.getData();
    }


    @Test
    @Order(6)
    public void registerByInviteCode() throws Exception {
        UserRegisterParam param = UserRegisterParam.builder()
                .invitedBy(userInviteCodes.getFirstInviteCode().getCode())
                .phoneNumber("09194711540")
                .fullName("ali ashrafi")
                .userRole(UserRoleParam.builder().role(UserRole.USER).build())
                .build();


        ResponseModel<UserRegisterDto> result = TestPost(
                "/api/v1/account/registerByInviteCode",
                param,
                true,
                new TypeReference<ResponseModel<UserRegisterDto>>() {
                }
        );

        Assertions.assertEquals(result.getData().getPhoneNumber(), "09194711540");
    }

    @Test
    @Order(7)
    public void sendSms() throws Exception {
        String userPhoneNumber = "09126540027";
        UserSendSmsParam param = UserSendSmsParam.builder()
                .application(ApplicationEnum.WEBAPP)
                .phoneNumber(userPhoneNumber)
                .build();


        ResponseModel<Boolean> result = TestPost(
                "/api/v1/account/sendsms",
                param,
                true,
                new TypeReference<ResponseModel<Boolean>>() {
                }
        );
        Assertions.assertTrue(result.getData());
        if (fullTest) {
            var enCode = userService.getByPhoneNumber(userPhoneNumber).getActivationCode().getCode();
            for (int t = 1000; t < 10000; t++) {
                if (passwordEncoder.matches(String.valueOf(t), enCode)) {
                    code = String.valueOf(t);
                    break;
                }
            }
        }
    }

    @Test
    @Order(8)
    public void login() throws Exception {
        if (fullTest) {
            String userPhoneNumber = "09126540027";
            LoginParam param = LoginParam.builder()
                    .application(ApplicationEnum.WEBAPP)
                    .username(userPhoneNumber)
                    .password(code)
                    .usernameType(UsernameType.PHONENUMBER)
                    .build();
            ResponseModel<UserDto> result = TestPost(
                    "/api/v1/account/login",
                    param,
                    true,
                    new TypeReference<ResponseModel<UserDto>>() {
                    }
            );
            Assertions.assertTrue(result.isSuccess());
            Token = result.getData().getToken();
            RefreshToken = result.getData().getRefreshToken();
        }

    }

    @Test
    @Order(6)
    public void refreshToken() throws Exception {
        if (fullTest) {
            RefreshTokenParam param = RefreshTokenParam.builder()
                    .refreshToken(RefreshToken)
                    .build();
            ResponseModel<RefreshTokenDto> result = TestPost(
                    "/api/v1/account/refreshToken",
                    param,
                    true,
                    new TypeReference<ResponseModel<RefreshTokenDto>>() {
                    }
            );
            Assertions.assertNotNull(result.getData().getToken());
        }
    }


}
