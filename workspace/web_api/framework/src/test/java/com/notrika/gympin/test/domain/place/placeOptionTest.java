package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.option.dto.PlaceOptionDto;
import com.notrika.gympin.common.place.option.param.PlaceOptionParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class placeOptionTest extends BaseTest {

    public static Long placeOption1Id = null;
    public static Long placeOption2Id = null;

    @Test
    @Order(1)
    public void add1() throws Exception {
        final PlaceOptionParam param = PlaceOptionParam.builder()
                .name("گل آرایی")
                .build();

        ResponseModel<PlaceOptionDto> result = TestPost(
                "/api/v1/placeOption/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceOptionDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "گل آرایی");
        placeOption1Id = result.getData().getId();
    }

    @Test
    @Order(2)
    public void add2() throws Exception {
        final PlaceOptionParam param = PlaceOptionParam.builder()
                .name("گل آرایی22")
                .weight((short) 8)
                .build();

        ResponseModel<PlaceOptionDto> result = TestPost(
                "/api/v1/placeOption/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceOptionDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "گل آرایی22");
        Assertions.assertEquals(result.getData().getWeight(), (short) 8);
        placeOption2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if(placeOption1Id==null) throw new Exception("is not exist");
        final PlaceOptionParam param = PlaceOptionParam.builder()
                .id(placeOption1Id)
                .name( "گل آرایی65")
                .weight((short) 5)
                .build();

        ResponseModel<PlaceOptionDto> result = TestPut(
                "/api/v1/placeOption/update",
                param,
                true,
                new TypeReference<ResponseModel<PlaceOptionDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "گل آرایی65");
        Assertions.assertEquals(result.getData().getWeight(), (short) 5);
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(placeOption1Id==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeOption1Id);

        ResponseModel<PlaceOptionDto> result = TestGet(
                "/api/v1/placeOption/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlaceOptionDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "گل آرایی65");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlaceOptionDto>> result = TestGet(
                "/api/v1/placeOption/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlaceOptionDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(6)
    public void delete() throws Exception {
        if(placeOption1Id==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeOption1Id.toString());

        ResponseModel<PlaceOptionDto> result = TestPut(
                "/api/v1/placeOption/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlaceOptionDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
