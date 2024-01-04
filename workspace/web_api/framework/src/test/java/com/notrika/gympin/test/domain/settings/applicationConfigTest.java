package com.notrika.gympin.test.domain.settings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class applicationConfigTest extends BaseTest {


    @Test
    @Order(1)
    public void getAndroidSplash() throws Exception {
        ResponseModel<AndroidSplashDto> result = TestPost(
                "/api/v1/configs/AndroidSplash",
                null,
                false,
                new TypeReference<ResponseModel<AndroidSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }

    @Test
    @Order(2)
    public void getIosSplash() throws Exception {
        ResponseModel<IosSplashDto> result = TestPost(
                "/api/v1/configs/IosSplash",
                null,
                false,
                new TypeReference<ResponseModel<IosSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }

    @Test
    @Order(3)
    public void getWebAppSplash() throws Exception {
        ResponseModel<WebAppSplashDto> result = TestPost(
                "/api/v1/configs/WebAppSplash",
                null,
                false,
                new TypeReference<ResponseModel<WebAppSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }

    @Test
    @Order(4)
    public void getMasterSplash() throws Exception {
        ResponseModel<MasterSplashDto> result = TestPost(
                "/api/v1/configs/MasterSplash",
                null,
                false,
                new TypeReference<ResponseModel<MasterSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }

    @Test
    @Order(5)
    public void getCorporateSplash() throws Exception {
        ResponseModel<CorporateSplashDto> result = TestPost(
                "/api/v1/configs/CorporateSplash",
                null,
                false,
                new TypeReference<ResponseModel<CorporateSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }

    @Test
    @Order(6)
    public void getAdminPanelSplash() throws Exception {
        ResponseModel<AdminPanelSplashDto> result = TestPost(
                "/api/v1/configs/AdminPanelSplash",
                null,
                false,
                new TypeReference<ResponseModel<AdminPanelSplashDto>>() {
                });

        Assertions.assertTrue(result.isSuccess());
    }
}

