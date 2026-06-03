package com.notrika.gympin.test.domain.home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.enums.PagesDestinationsEnum;
import com.notrika.gympin.common.pages.enums.PagesElementsEnum;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
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
//    public static Long place2Id = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final PagesItemParam param = PagesItemParam.builder()
                .title("صفحه اصلی 2")
                .build();

        ResponseModel<PagesItemDto> result = TestPost(
                "/api/v1/pages/add",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "صفحه اصلی 2");
        homeId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addItem() throws Exception {
        final PagesItemParam param = PagesItemParam.builder()
                .title("لیست مطالب")
                .parent(PagesItemParam.builder().id(homeId).build())
                .type("CONTENT_LIST")
                .build();

        ResponseModel<PagesItemDto> result = TestPost(
                "/api/v1/pages/add",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "لیست مطالب");
        itemId = result.getData().getId();
    }

    @Test
    @Order(3)
    public void addSubItem() throws Exception {
        final PagesItemParam param = PagesItemParam.builder()
                .title("تیتر مطلب")
                .description("مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب ")
                .parent(PagesItemParam.builder().id(itemId).build())
                .type("CONTENT_LIST")
                .destination(PagesDestinationsEnum.INNERBROWSER)
                .data("1")
                .build();

        ResponseModel<PagesItemDto> result = TestPost(
                "/api/v1/pages/add",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

            param.setTitle("تیتر مطلب 2");
            param.setDescription("مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2 مطلب 2");
            param.setDestination(PagesDestinationsEnum.INNERBROWSER);
            param.setData("1");

        ResponseModel<PagesItemDto> result2 = TestPost(
                "/api/v1/pages/add",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "تیتر مطلب");
        Assertions.assertEquals(result.getData().getType(), "CONTENT_LIST");

        subItemId = result.getData().getId();
    }


    @Test
    @Order(4)
    public void update() throws Exception {
        if(subItemId==null) throw new Exception("is not exist");
        final PagesItemParam param = PagesItemParam.builder()
                .id(subItemId)
                .title("تیتر مطلب جدید")
                .description("مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب مطلب ")
                .parent(PagesItemParam.builder().id(itemId).build())
                .type("CONTENT_LIST")
                .destination(PagesDestinationsEnum.INNERBROWSER)
                .data("1")
                .build();

        ResponseModel<PagesItemDto> result = TestPut(
                "/api/v1/pages/update",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {});

        Assertions.assertEquals(result.getData().getTitle(), "تیتر مطلب جدید");
    }

    @Test
    @Order(5)
    public void getById() throws Exception {
        if(homeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", homeId);

        ResponseModel<PagesItemDto> result = TestGet(
                "/api/v1/pages/getById",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertEquals(result.getData().getId(),homeId);
    }

    @Test
    @Order(6)
    public void getHome() throws Exception {
        if(homeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", homeId);

        ResponseModel<PagesItemDto> result = TestGet(
                "/api/v1/pages/getHome",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertTrue(result.getData().getItems().stream().filter(o->!o.isDeleted()).findFirst().get().getItems().size()>0);
    }


    @Test
    @Order(7)
    public void getAll() throws Exception {
        ResponseModel<List<PagesItemDto>> result = TestGet(
                "/api/v1/pages/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PagesItemDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }


    @Test
    @Order(8)
    public void addType() throws Exception {
        final PagesTypeParam param = PagesTypeParam.builder()
                .name("نام تایپ")
                .parent(null)
                .description("توضیح")
                .type("TestType")
                .elements(List.of(PagesElementsEnum.Description, PagesElementsEnum.Title))
                .build();

        ResponseModel<PagesTypeDto> result = TestPost(
                "/api/v1/pages/addType",
                param,
                true,
                new TypeReference<ResponseModel<PagesTypeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "نام تایپ");
        typeId = result.getData().getId();
    }

    @Test
    @Order(9)
    public void getAllTypes() throws Exception {
        ResponseModel<List<PagesTypeDto>> result = TestGet(
                "/api/v1/pages/getAllTypes",
                null,
                true,
                new TypeReference<ResponseModel<List<PagesTypeDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(10)
    public void deleteType() throws Exception {
        if(typeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", typeId.toString());

        ResponseModel<PagesTypeDto> result = TestPut(
                "/api/v1/pages/deleteType",
                param,
                true,
                new TypeReference<ResponseModel<PagesTypeDto>>() {
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

        ResponseModel<PagesItemDto> result = TestPut(
                "/api/v1/pages/delete",
                param,
                true,
                new TypeReference<ResponseModel<PagesItemDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }


}
