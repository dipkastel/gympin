package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.about.param.PlaceAboutParam;
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
public class placeAboutTest extends BaseTest {

    public static Long placeId = null;
    public static Long placeAbout1Id = null;
    public static Long placeAbout2Id = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز برای درباره")
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
    public void add1() throws Exception {
        final PlaceAboutParam param = PlaceAboutParam.builder()
                .name("درباره 1")
                .active(true)
                .acceptable(false)
                .description("درباره 1 مجموعه ")
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlaceAboutDto> result = TestPost(
                "/api/v1/placeAbout/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceAboutDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "درباره 1");
        Assertions.assertEquals(result.getData().getDescription(), "درباره 1 مجموعه ");
        placeAbout1Id = result.getData().getId();
    }

    @Test
    @Order(2)
    public void add2() throws Exception {
        final PlaceAboutParam param = PlaceAboutParam.builder()
                .name("قوانین 2")
                .active(true)
                .acceptable(true)
                .description("قوانین 2 مجموعه ")
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlaceAboutDto> result = TestPost(
                "/api/v1/placeAbout/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceAboutDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "قوانین 2");
        Assertions.assertEquals(result.getData().getDescription(), "قوانین 2 مجموعه ");
        placeAbout2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if(placeAbout1Id==null) throw new Exception("is not exist");
        final PlaceAboutParam param = PlaceAboutParam.builder()
                .id(placeAbout1Id)
                .name("تغییر درباره 1")
                .active(true)
                .acceptable(false)
                .description("تغییر درباره 1 مجموعه ")
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlaceAboutDto> result = TestPut(
                "/api/v1/placeAbout/update",
                param,
                true,
                new TypeReference<ResponseModel<PlaceAboutDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "تغییر درباره 1");
        Assertions.assertEquals(result.getData().getDescription(), "تغییر درباره 1 مجموعه ");
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(placeAbout1Id==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeAbout1Id);

        ResponseModel<PlaceAboutDto> result = TestGet(
                "/api/v1/placeAbout/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlaceAboutDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "تغییر درباره 1");
        Assertions.assertEquals(result.getData().getDescription(), "تغییر درباره 1 مجموعه ");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlaceAboutDto>> result = TestGet(
                "/api/v1/placeAbout/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlaceAboutDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(6)
    public void delete() throws Exception {
        if(placeAbout1Id==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeAbout1Id.toString());

        ResponseModel<PlaceAboutDto> result = TestPut(
                "/api/v1/placeAbout/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlaceAboutDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
