package com.notrika.gympin.test.domain.settings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.settings.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class reportTest extends BaseTest {

    public static Long reportId = null;
    public static String reportKey = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final ReportSettingsParam param = ReportSettingsParam.builder()
                .key("Key 1")
                .value("value 1")
                .description("desc 1")
                .updateAuto(false)
                .build();

        ResponseModel<ReportSettingsDto> result = TestPost(
                "/api/v1/reportSettings/add",
                param,
                true,
                new TypeReference<ResponseModel<ReportSettingsDto>>() {
                });


        Assertions.assertEquals(result.getData().getKey(), "Key 1");
        Assertions.assertEquals(result.getData().getValue(), "value 1");
        Assertions.assertEquals(result.getData().getDescription(), "desc 1");
        reportId = result.getData().getId();
        reportKey = result.getData().getKey();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if (reportKey == null) throw new Exception("not exist");
        final ReportSettingsParam param = ReportSettingsParam.builder()
                .key(reportKey)
                .value("value 2")
                .description("desc 2")
                .build();

        ResponseModel<ReportSettingsDto> result = TestPut(
                "/api/v1/reportSettings/update",
                param,
                true,
                new TypeReference<ResponseModel<ReportSettingsDto>>() {
                });

        Assertions.assertEquals(result.getData().getKey(), "Key 1");
        Assertions.assertEquals(result.getData().getValue(), "value 2");
        Assertions.assertEquals(result.getData().getDescription(), "desc 2");
    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if (reportId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", reportId);

        ResponseModel<ReportSettingsDto> result = TestGet(
                "/api/v1/reportSettings/getById",
                param,
                true,
                new TypeReference<ResponseModel<ReportSettingsDto>>() {
                });

        Assertions.assertEquals(result.getData().getKey(), "Key 1");
    }

    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<ReportSettingsDto>> result = TestGet(
                "/api/v1/reportSettings/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<ReportSettingsDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {
        if (reportId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("key", reportKey);

        ResponseModel<ReportSettingsDto> result = TestPut(
                "/api/v1/reportSettings/delete",
                param,
                true,
                new TypeReference<ResponseModel<ReportSettingsDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
