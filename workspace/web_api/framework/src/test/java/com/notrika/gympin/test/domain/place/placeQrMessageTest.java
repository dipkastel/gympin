package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class placeQrMessageTest extends BaseTest {

    public static Long placeId = null;
    public static Long placeQrId = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceParam param = PlaceParam.builder()
                .name("مرکز برای qr")
                .build();

        ResponseModel<PlaceDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceDto>>() {
                });

        placeId = result.getData().getId();
    }

    @Test
    @Order(1)
    public void addMessageToPlace() throws Exception {
        final PlaceQrMessageParam param = PlaceQrMessageParam.builder()
                .text("qr 1")
                .replaceText("qr___1")
                .place(PlaceParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlaceQrMessageDto> result = TestPost(
                "/api/v1/placeQrMessage/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceQrMessageDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "qr 1");
        Assertions.assertEquals(result.getData().getReplace_text(), "qr___1");
        placeQrId = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if(placeQrId==null) throw new Exception("is not exist");
        final PlaceQrMessageParam param = PlaceQrMessageParam.builder()
                .id(placeQrId)
                .place(PlaceParam.builder().id(placeId).build())
                .text("qr 2")
                .replaceText("qr___2")
                .build();

        ResponseModel<PlaceQrMessageDto> result = TestPut(
                "/api/v1/placeQrMessage/update",
                param,
                true,
                new TypeReference<ResponseModel<PlaceQrMessageDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "qr 2");
        Assertions.assertEquals(result.getData().getReplace_text(), "qr___2");
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(placeQrId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeQrId);

        ResponseModel<PlaceQrMessageDto> result = TestGet(
                "/api/v1/placeQrMessage/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlaceQrMessageDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "qr 2");
        Assertions.assertEquals(result.getData().getReplace_text(), "qr___2");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlaceQrMessageDto>> result = TestGet(
                "/api/v1/placeQrMessage/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlaceQrMessageDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 0);
    }

    @Test
    @Order(6)
    public void getMessageByPlace() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId.toString());

        ResponseModel<List<PlaceQrMessageDto>> result = TestGet(
                "/api/v1/placeQrMessage/getByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<PlaceQrMessageDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(7)
    public void delete() throws Exception {
        if(placeQrId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeQrId.toString());

        ResponseModel<PlaceQrMessageDto> result = TestPut(
                "/api/v1/placeQrMessage/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlaceQrMessageDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
