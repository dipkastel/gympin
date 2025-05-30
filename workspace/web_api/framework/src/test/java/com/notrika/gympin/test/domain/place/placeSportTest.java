package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class placeSportTest extends BaseTest {

    public static Long placeId = null;
    public static Long placeSportId = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز برای ورزش")
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
        final PlaceSportParam param = PlaceSportParam.builder()
                .sport(SportParam.builder().id(3l).build())
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlaceSportDto> result = TestPost(
                "/api/v1/placeSport/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceSportDto>>() {
                });

        Assertions.assertEquals(result.getData().getSport().getName(), "اسکواش");
        placeSportId = result.getData().getId();
    }

//    @Test
//    @Order(3)
//    public void update() throws Exception {
//        if(placeSportId==null) throw new Exception("is not exist");
//        final PlaceSportParam param = PlaceSportParam.builder()
//                .id(placeSportId)
//                .place(PlaceGymParam.builder().id(placeId).build())
//                .sportTest(SportParam.builder().id(2l).build())
//                .build();
//
//        ResponseModel<PlaceSportDto> result = TestPut(
//                "/api/v1/placeSport/update",
//                param,
//                true,
//                new TypeReference<ResponseModel<PlaceSportDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getSport().getName(), "اسب سواری");
//        Assertions.assertEquals(result.getData().getPlace().getId(), placeId);
//    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(placeSportId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeSportId);

        ResponseModel<PlaceSportDto> result = TestGet(
                "/api/v1/placeSport/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlaceSportDto>>() {
                });

        Assertions.assertEquals(result.getData().getSport().getName(), "اسکواش");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlaceSportDto>> result = TestGet(
                "/api/v1/placeSport/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlaceSportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 0);
    }

    @Test
    @Order(6)
    public void getSportsByPlace() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId.toString());

        ResponseModel<List<PlaceSportDto>> result = TestGet(
                "/api/v1/placeSport/getSportsByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<PlaceSportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(7)
    public void delete() throws Exception {
        if(placeSportId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeSportId.toString());

        ResponseModel<PlaceSportDto> result = TestPut(
                "/api/v1/placeSport/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlaceSportDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
