package com.notrika.gympin.test.domain.settings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class settingTest extends BaseTest {

    public static Long settingId = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final SettingParam param = SettingParam.builder()
                .key("Key 1")
                .value("value 1")
                .data("data 1")
                .description("desc 1")
                .type(settingsType.WEB_APP)
                .build();

        ResponseModel<SettingDto> result = TestPost(
                "/api/v1/settings/add",
                param,
                true,
                new TypeReference<ResponseModel<SettingDto>>() {
                });

        Assertions.assertEquals(result.getData().getKey(), "Key 1");
        Assertions.assertEquals(result.getData().getValue(), "value 1");
        Assertions.assertEquals(result.getData().getData(), "data 1");
        Assertions.assertEquals(result.getData().getDescription(), "desc 1");
        settingId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if (settingId == null) throw new Exception("not exist");
        final SettingParam param = SettingParam.builder()
                .id(settingId)
                .key("Key 2")
                .value("value 2")
                .data("data 2")
                .description("desc 2")
                .type(settingsType.WEB_APP)
                .build();

        ResponseModel<SettingDto> result = TestPut(
                "/api/v1/settings/update",
                param,
                true,
                new TypeReference<ResponseModel<SettingDto>>() {
                });

        Assertions.assertEquals(result.getData().getKey(), "Key 2");
        Assertions.assertEquals(result.getData().getValue(), "value 2");
        Assertions.assertEquals(result.getData().getData(), "data 2");
        Assertions.assertEquals(result.getData().getDescription(), "desc 2");
    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if (settingId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", settingId);

        ResponseModel<SettingDto> result = TestGet(
                "/api/v1/settings/getById",
                param,
                true,
                new TypeReference<ResponseModel<SettingDto>>() {
                });

        Assertions.assertEquals(result.getData().getKey(), "Key 2");
    }

    @Test
    @Order(4)
    public void getByType() throws Exception {
        if (settingId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("type", settingsType.WEB_APP);

        ResponseModel<List<SettingDto>> result = TestGet(
                "/api/v1/settings/getByType",
                param,
                true,
                new TypeReference<ResponseModel<List<SettingDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<SettingDto>> result = TestGet(
                "/api/v1/settings/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<SettingDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(6)
    public void delete() throws Exception {
        if (settingId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", settingId.toString());

        ResponseModel<SettingDto> result = TestPut(
                "/api/v1/settings/delete",
                param,
                true,
                new TypeReference<ResponseModel<SettingDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
    }

}
