package com.notrika.gympin.test.domain.home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.home.dto.HomePageDestinationDto;
import com.notrika.gympin.common.home.dto.HomePageItemDto;
import com.notrika.gympin.common.home.dto.HomePageTypeDto;
import com.notrika.gympin.common.home.enums.HomePageElementsEnum;
import com.notrika.gympin.common.home.param.HomePageDestinationParam;
import com.notrika.gympin.common.home.param.HomePageItemParam;
import com.notrika.gympin.common.home.param.HomePageTypeParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class homeTest extends BaseTest {

    public static Long homeId = null;
    public static Long itemId = null;
    public static Long subItemId = null;
    public static Long typeId = null;
    public static Long destinationId = null;
//    public static Long place2Id = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final HomePageItemParam param = HomePageItemParam.builder()
                .title("صفحه اصلی 2")
                .build();

        ResponseModel<HomePageItemDto> result = TestPost(
                "/api/v1/homepage/add",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "صفحه اصلی 2");
        homeId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addItem() throws Exception {
        final HomePageItemParam param = HomePageItemParam.builder()
                .title("لیست مطالب")
                .parent(HomePageItemParam.builder().id(homeId).build())
                .type("CONTENT_LIST")
                .build();

        ResponseModel<HomePageItemDto> result = TestPost(
                "/api/v1/homepage/add",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "لیست مطالب");
        itemId = result.getData().getId();
    }

    @Test
    @Order(3)
    public void addSubItem() throws Exception {
        final HomePageItemParam param = HomePageItemParam.builder()
                .title("تیتر مطلب")
                .description("مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب ")
                .parent(HomePageItemParam.builder().id(itemId).build())
                .type("CONTENT_LIST")
                .destination(HomePageDestinationParam.builder().id(2l).build())
                .data("1")
                .build();

        ResponseModel<HomePageItemDto> result = TestPost(
                "/api/v1/homepage/add",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

            param.setTitle("تیتر مطلب 2");
            param.setDescription("مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2");
            param.setDestination(HomePageDestinationParam.builder().id(2l).build());
            param.setData("1");

        ResponseModel<HomePageItemDto> result2 = TestPost(
                "/api/v1/homepage/add",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "تیتر مطلب");
        Assertions.assertEquals(result.getData().getType(), "CONTENT_LIST");

        subItemId = result.getData().getId();
    }


    @Test
    @Order(4)
    public void update() throws Exception {
        if(subItemId==null) throw new Exception("is not exist");
        final HomePageItemParam param = HomePageItemParam.builder()
                .id(subItemId)
                .title("تیتر مطلب جدید")
                .description("مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب ")
                .parent(HomePageItemParam.builder().id(itemId).build())
                .type("CONTENT_LIST")
                .destination(HomePageDestinationParam.builder().id(2l).build())
                .data("1")
                .build();

        ResponseModel<HomePageItemDto> result = TestPut(
                "/api/v1/homepage/update",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {});

        Assertions.assertEquals(result.getData().getTitle(), "تیتر مطلب جدید");
    }

    @Test
    @Order(5)
    public void getById() throws Exception {
        if(homeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", homeId);

        ResponseModel<HomePageItemDto> result = TestGet(
                "/api/v1/homepage/getById",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getId(),homeId);
    }

    @Test
    @Order(6)
    public void getHome() throws Exception {
        if(homeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", homeId);

        ResponseModel<HomePageItemDto> result = TestGet(
                "/api/v1/homepage/getHome",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertTrue(result.getData().getItems().stream().filter(o->!o.isDeleted()).findFirst().get().getItems().size()>0);
    }


    @Test
    @Order(7)
    public void getAll() throws Exception {
        ResponseModel<List<HomePageItemDto>> result = TestGet(
                "/api/v1/homepage/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<HomePageItemDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }


    @Test
    @Order(8)
    public void addType() throws Exception {
        final HomePageTypeParam param = HomePageTypeParam.builder()
                .name("نام تایپ")
                .canBeParent(true)
                .description("توضیح")
                .type("TestType")
                .elements(List.of(HomePageElementsEnum.Description,HomePageElementsEnum.Title))
                .build();

        ResponseModel<HomePageTypeDto> result = TestPost(
                "/api/v1/homepage/addType",
                param,
                true,
                new TypeReference<ResponseModel<HomePageTypeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "نام تایپ");
        typeId = result.getData().getId();
    }

    @Test
    @Order(9)
    public void getAllTypes() throws Exception {
        ResponseModel<List<HomePageTypeDto>> result = TestGet(
                "/api/v1/homepage/getAllTypes",
                null,
                true,
                new TypeReference<ResponseModel<List<HomePageTypeDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(10)
    public void deleteType() throws Exception {
        if(typeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", typeId.toString());

        ResponseModel<HomePageTypeDto> result = TestPut(
                "/api/v1/homepage/deleteType",
                param,
                true,
                new TypeReference<ResponseModel<HomePageTypeDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(11)
    public void addDestination() throws Exception {
        final HomePageDestinationParam param = HomePageDestinationParam.builder()
                .name("نام مقصد")
                .description("توضیح")
                .build();

        ResponseModel<HomePageDestinationDto> result = TestPost(
                "/api/v1/homepage/addDestination",
                param,
                true,
                new TypeReference<ResponseModel<HomePageDestinationDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "نام مقصد");
        destinationId = result.getData().getId();
    }

    @Test
    @Order(12)
    public void getAllDestinations() throws Exception {
        ResponseModel<List<HomePageDestinationDto>> result = TestGet(
                "/api/v1/homepage/getAllDestinations",
                null,
                true,
                new TypeReference<ResponseModel<List<HomePageDestinationDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(13)
    public void deleteDestination() throws Exception {
        if(destinationId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", destinationId.toString());

        ResponseModel<HomePageDestinationDto> result = TestPut(
                "/api/v1/homepage/deleteDestination",
                param,
                true,
                new TypeReference<ResponseModel<HomePageDestinationDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(14)
    public void delete() throws Exception {
        if(subItemId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", subItemId.toString());

        ResponseModel<HomePageItemDto> result = TestPut(
                "/api/v1/homepage/delete",
                param,
                true,
                new TypeReference<ResponseModel<HomePageItemDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }


}
