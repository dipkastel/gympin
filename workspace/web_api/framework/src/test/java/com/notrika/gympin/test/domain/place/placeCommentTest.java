//package com.notrika.gympin.test.domain.place;
//
//import com.notrika.gympin.test.domain.utils.BaseTest;
//import org.junit.jupiter.api.MethodOrderer;
//import org.junit.jupiter.api.TestInstance;
//import org.junit.jupiter.api.TestMethodOrder;
//
//
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class placeCommentTest extends BaseTest {
//
//    public static Long placeId = null;
//    public static Long commentId = null;
//    public static Long hall2Id = null;
//
//    @BeforeAll
//    @Order(1)
//    public void addPlace() throws Exception{
//        final PlaceGymParam param = PlaceGymParam.builder()
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
//
//    @Test
//    @Order(1)
//    public void addByName() throws Exception {
//        final HallParam param = HallParam.builder()
//                .name("سالن 1")
//                .place(PlaceGymParam.builder().id(placeId).build())
//                .build();
//
//        ResponseModel<HallDto> result = TestPost(
//                "/api/v1/hall/add",
//                param,
//                true,
//                new TypeReference<ResponseModel<HallDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getName(), "سالن 1");
//        hall1Id = result.getData().getId();
//    }
//
//    @Test
//    @Order(2)
//    public void add() throws Exception {
//        final HallParam param = HallParam.builder()
//                .name("سالن 2")
//                .place(PlaceGymParam.builder().id(placeId).build())
//                .trafficManagement(false)
//                .enable(false)
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
//        Assertions.assertEquals(result.getData().getName(), "سالن 2");
//        Assertions.assertEquals(result.getData().getTrafficManagement(), false);
//        hall2Id = result.getData().getId();
//    }
//
//    @Test
//    @Order(3)
//    public void update() throws Exception {
//        if(hall1Id==null) throw new Exception("is not exist");
//        final HallParam param = HallParam.builder()
//                .id(hall1Id)
//                .name("تغییر سالن 1")
//                .place(PlaceGymParam.builder().id(placeId).build())
//                .trafficManagement(true)
//                .enable(false)
//                .sportTest(SportParam.builder().id(2l).build())
//                .build();
//
//        ResponseModel<HallDto> result = TestPut(
//                "/api/v1/hall/update",
//                param,
//                true,
//                new TypeReference<ResponseModel<HallDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getName(), "تغییر سالن 1");
//        Assertions.assertEquals(result.getData().getTrafficManagement(), true);
//        Assertions.assertEquals(result.getData().getEnable(), false);
//    }
//
//    @Test
//    @Order(4)
//    public void getById() throws Exception {
//        if(hall1Id==null) throw new Exception("is not exist");
//        final Map<String, Object> param = new TreeMap<>();
//        param.put("id", hall1Id);
//
//        ResponseModel<HallDto> result = TestGet(
//                "/api/v1/hall/getById",
//                param,
//                true,
//                new TypeReference<ResponseModel<HallDto>>() {
//                });
//
//        Assertions.assertEquals(result.getData().getName(), "تغییر سالن 1");
//    }
//
//
//    @Test
//    @Order(5)
//    public void getAll() throws Exception {
//        ResponseModel<List<HallDto>> result = TestGet(
//                "/api/v1/hall/getAll",
//                null,
//                true,
//                new TypeReference<ResponseModel<List<HallDto>>>() {
//                });
//
//        Assertions.assertTrue(result.getData().size()> 1);
//    }
//
//    @Test
//    @Order(6)
//    public void delete() throws Exception {
//        if(hall1Id==null) throw new Exception("is not exist");
//        final Map<String, Object> param = new TreeMap<>();
//        param.put("id", hall1Id.toString());
//
//        ResponseModel<HallDto> result = TestPut(
//                "/api/v1/hall/delete",
//                param,
//                true,
//                new TypeReference<ResponseModel<HallDto>>() {
//                });
//
//        Assertions.assertEquals(result.isSuccess(), true);
//        Assertions.assertEquals(result.getError(), null);
//        Assertions.assertNotEquals(result.getData(), null);
//    }
//
//}
