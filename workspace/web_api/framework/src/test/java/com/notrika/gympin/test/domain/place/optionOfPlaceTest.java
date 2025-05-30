package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.option.param.PlaceOptionParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class optionOfPlaceTest extends BaseTest {

    public static Long placeId = null;
    public static Long placeOptionId = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception {
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز برای امکانات مرکز")
                .build();

        ResponseModel<PlaceGymDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        placeId = result.getData().getId();
    }

    @Test
    @Order(1)
    public void addSportToPlace() throws Exception {
        final OptionOfPlaceParam param = OptionOfPlaceParam.builder()
                .placeOption(PlaceOptionParam.builder().id(3l).build())
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<OptionOfPlaceDto> result = TestPost(
                "/api/v1/OptionOfPlace/add",
                param,
                true,
                new TypeReference<ResponseModel<OptionOfPlaceDto>>() {
                });

        Assertions.assertEquals(result.getData().getPlaceOption().getName(), "مربی");
        placeOptionId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addSportToPlace2() throws Exception {
        final OptionOfPlaceParam param = OptionOfPlaceParam.builder()
                .placeOption(PlaceOptionParam.builder().id(2l).build())
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<OptionOfPlaceDto> result = TestPost(
                "/api/v1/OptionOfPlace/add",
                param,
                true,
                new TypeReference<ResponseModel<OptionOfPlaceDto>>() {
                });

        Assertions.assertEquals(result.getData().getPlaceOption().getName(), "سقف بلند");
        placeOptionId = result.getData().getId();
    }

//    @Test
//    @Order(3)
//    public void getAll() throws Exception {
//        ResponseModel<List<OptionOfPlaceGymDto>> result = TestGet(
//                "/api/v1/OptionOfPlace/getAll",
//                null,
//                true,
//                new TypeReference<ResponseModel<List<OptionOfPlaceGymDto>>>() {
//                });
//
//        Assertions.assertTrue(result.getData().size() > 1);
//    }

    @Test
    @Order(4)
    public void getOptionByPlace() throws Exception {
        if (placeId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId.toString());

        ResponseModel<List<OptionOfPlaceDto>> result = TestGet(
                "/api/v1/OptionOfPlace/getByPlaceId",
                param,
                true,
                new TypeReference<ResponseModel<List<OptionOfPlaceDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
    }


    @Test
    @Order(5)
    public void delete() throws Exception {
        if (placeOptionId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeOptionId.toString());

        ResponseModel<OptionOfPlaceDto> result = TestPut(
                "/api/v1/OptionOfPlace/delete",
                param,
                true,
                new TypeReference<ResponseModel<OptionOfPlaceDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }
}
