//package com.notrika.gympin.test.domain.place;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.notrika.gympin.common.place.hall.dto.HallDto;
//import com.notrika.gympin.common.place.hall.param.HallParam;
//import com.notrika.gympin.common.place.hallEnter.dto.EnterHallConfirmDto;
//import com.notrika.gympin.common.place.hallEnter.dto.EnterHallRequestDto;
//import com.notrika.gympin.common.place.hallEnter.param.EnterHallRequestParam;
//import com.notrika.gympin.common.place.place.dto.PlaceGymDto;
//import com.notrika.gympin.common.place.place.param.PlaceParam;
//import com.notrika.gympin.common.sportTest.sportTest.param.SportParam;
//import com.notrika.gympin.common.util._base.base.ResponseModel;
//import com.notrika.gympin.test.domain.utils.BaseTest;
//import org.junit.jupiter.api.*;
//
//
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class placeHallEnterTest extends BaseTest {
//
//    public static Long placeId = null;
//    public static Long hallId = null;
//    public static Long requestId = null;
//    public static String refrenceId = null;
//
//    @BeforeAll
//    @Order(1)
//    public void addPlace() throws Exception{
//        final PlaceParam param = PlaceParam.builder()
//                .name("مرکز برای سالن")
//                .build();
//
//        ResponseModel<PlaceGymDto> result = TestPost(
//                "/api/v1/place/add",
//                param,
//                true,
//                new TypeReference<ResponseModel<PlaceGymDto>>() {
//                });
//
//        placeId = result.getData().getId();
//    }
//
//
//    @BeforeAll
//    @Order(2)
//    public void addHall() throws Exception{
//        if(placeId==null) throw new Exception("is not exist");
//        final HallParam param = HallParam.builder()
//                .name("سالن برای ورود")
//                .place(PlaceParam.builder().id(placeId).build())
//                .trafficManagement(false)
//                .enable(true)
//                .sportTest(SportParam.builder().id(1l).build())
//                .build();
//
//        ResponseModel<HallDto> result = TestPost(
//                "/api/v1/hall/add",
//                param,
//                true,
//                new TypeReference<ResponseModel<HallDto>>() {
//                });
//
//        hallId = result.getData().getId();
//    }
//
//    @Test
//    @Order(1)
//    public void requsetEnter() throws Exception {
//        if(hallId==null) throw new Exception("is not exist");
//        final EnterHallRequestParam param = EnterHallRequestParam.builder()
//                .hall(HallParam.builder().id(hallId).build())
//                .build();
//
//        ResponseModel<EnterHallRequestDto> result = TestPost(
//                "/api/v1/HallEnter/requestEnter",
//                param,
//                true,
//                new TypeReference<ResponseModel<EnterHallRequestDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getHall().getId(), hallId);
//        refrenceId = result.getData().getReferenceId();
//        requestId = result.getData().getId();
//    }
//
//    @Test
//    @Order(2)
//    public void confirmEnter() throws Exception {
//        if(hallId==null) throw new Exception("is not exist");
//        final EnterHallConfirmDto param = EnterHallConfirmDto.builder()
//                .id(requestId)
//                .build();
//
//        ResponseModel<EnterHallConfirmDto> result = TestPost(
//                "/api/v1/HallEnter/confirmEnter",
//                param,
//                true,
//                new TypeReference<ResponseModel<EnterHallConfirmDto>>() {
//                });
//
//        Assertions.assertTrue(result.getData().getId()>0l);
//    }
//
//
//}
