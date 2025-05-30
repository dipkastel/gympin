package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class placeTest extends BaseTest {

    public static Long placeId = null;
    public static Long place2Id = null;
    @Test
    @Order(1)
    public void addByName() throws Exception {
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز 1")
                .build();

        ResponseModel<PlaceGymDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "مرکز 1");
        placeId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void add() throws Exception {
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز 2")
                .address("آدرس مرکز")
                .autoDiscount(true)
                .latitude(35.5)
                .longitude(52.8)
                .location(new LocationParam().builder().id(15l).build())
                .status(PlaceStatusEnum.INACTIVE)
                .build();

        ResponseModel<PlaceGymDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "مرکز 2");
        place2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final PlaceGymParam param = PlaceGymParam.builder()
                .id(placeId)
                .name("مرکز 3")
                .address("آدرس مرکز")
                .autoDiscount(true)
                .latitude(35.5)
                .longitude(52.8)
                .location(new LocationParam().builder().id(15l).build())
                .status(PlaceStatusEnum.INACTIVE)
                .build();

        ResponseModel<PlaceGymDto> result = TestPut(
                "/api/v1/place/update",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "مرکز 3");
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId);

        ResponseModel<PlaceGymDto> result = TestGet(
                "/api/v1/place/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "مرکز 3");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlaceGymDto>> result = TestGet(
                "/api/v1/place/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlaceGymDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(6)
    public void delete() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId.toString());

        ResponseModel<PlaceGymDto> result = TestPut(
                "/api/v1/place/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
