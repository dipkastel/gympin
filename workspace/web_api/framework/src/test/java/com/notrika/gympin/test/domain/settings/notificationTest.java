//package com.notrika.gympin.test.domain.settings;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.notrika.gympin.common.settings.notification.param.NotificationParam;
//import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
//import com.notrika.gympin.common.util._base.base.ResponseModel;
//import com.notrika.gympin.test.domain.utils.BaseTest;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//
//import java.util.List;
//import java.util.Map;
//import java.util.TreeMap;
//
//public class notificationTest  extends BaseTest {
//
//    public static Long notificationId = null;
//
//    @Test
//    @Order(1)
//    public void add() throws Exception {
//        final NotificationParam param = NotificationParam.builder()
//                .key("Key 1")
//                .value("value 1")
//                .description("desc 1")
//                .updateAuto(false)
//                .build();
//
//        ResponseModel<ReportSettingsDto> result = TestPost(
//                "/api/v1/reportSettings/add",
//                param,
//                true,
//                new TypeReference<ResponseModel<ReportSettingsDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getKey(), "Key 1");
//        Assertions.assertEquals(result.getData().getValue(), "value 1");
//        Assertions.assertEquals(result.getData().getDescription(), "desc 1");
//        notificationId = result.getData().getId();
//    }
//
//    @Test
//    @Order(2)
//    public void update() throws Exception {
//        if (notificationId == null) throw new Exception("not exist");
//        final NotificationParam param = NotificationParam.builder()
//                .id(notificationId)
//                .key("Key 2")
//                .value("value 2")
//                .description("desc 2")
//                .build();
//
//        ResponseModel<ReportSettingsDto> result = TestPut(
//                "/api/v1/reportSettings/update",
//                param,
//                true,
//                new TypeReference<ResponseModel<ReportSettingsDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getKey(), "Key 2");
//        Assertions.assertEquals(result.getData().getValue(), "value 2");
//        Assertions.assertEquals(result.getData().getDescription(), "desc 2");
//    }
//
//    @Test
//    @Order(3)
//    public void getById() throws Exception {
//        if (notificationId == null) throw new Exception("not exist");
//        final Map<String, Object> param = new TreeMap<>();
//        param.put("id", notificationId);
//
//        ResponseModel<ReportSettingsDto> result = TestGet(
//                "/api/v1/reportSettings/getById",
//                param,
//                true,
//                new TypeReference<ResponseModel<ReportSettingsDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getKey(), "Key 2");
//    }
//
//    @Test
//    @Order(4)
//    public void getAll() throws Exception {
//        ResponseModel<List<ReportSettingsDto>> result = TestGet(
//                "/api/v1/reportSettings/getAll",
//                null,
//                true,
//                new TypeReference<ResponseModel<List<ReportSettingsDto>>>() {
//                });
//
//        Assertions.assertTrue(result.getData().size()>0);
//    }
//
//    @Test
//    @Order(5)
//    public void delete() throws Exception {
//        if (notificationId == null) throw new Exception("not exist");
//        final Map<String, Object> param = new TreeMap<>();
//        param.put("id", notificationId.toString());
//
//        ResponseModel<ReportSettingsDto> result = TestPut(
//                "/api/v1/reportSettings/delete",
//                param,
//                true,
//                new TypeReference<ResponseModel<ReportSettingsDto>>() {
//                });
//
//        Assertions.assertEquals(result.isSuccess(), true);
//        Assertions.assertEquals(result.getError(), null);
//        Assertions.assertNotEquals(result.getData(), null);
//    }
//
//}
