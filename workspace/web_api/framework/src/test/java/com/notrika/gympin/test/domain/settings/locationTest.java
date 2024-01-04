package com.notrika.gympin.test.domain.settings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class locationTest  extends BaseTest {

    public static Long locationId = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final LocationParam param = LocationParam.builder()
                .parent(LocationParam.builder().id(3l).build())//3 -> tehran
                .name("test location")
                .locationType(LocationType.REGION)
                .build();

        ResponseModel<LocationDto> result = TestPost(
                "/api/v1/location/add",
                param,
                true,
                new TypeReference<ResponseModel<LocationDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "test location");
        locationId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if (locationId == null) throw new Exception("not exist");
        final LocationParam param = LocationParam.builder()
                .id(locationId)
                .parent(LocationParam.builder().id(3l).build())//3 -> tehran
                .name("edited test location")
                .locationType(LocationType.REGION)
                .centerLat(35)
                .centerLng(52)
                .build();

        ResponseModel<LocationDto> result = TestPut(
                "/api/v1/location/update",
                param,
                true,
                new TypeReference<ResponseModel<LocationDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "edited test location");
        Assertions.assertEquals(result.getData().getCenterLat(), 35);
        Assertions.assertEquals(result.getData().getCenterLng(), 52);
    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if (locationId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", locationId);

        ResponseModel<LocationDto> result = TestGet(
                "/api/v1/location/getById",
                param,
                true,
                new TypeReference<ResponseModel<LocationDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "edited test location");
    }

    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<LocationDto>> result = TestGet(
                "/api/v1/location/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<LocationDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {
        if (locationId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", locationId.toString());

        ResponseModel<LocationDto> result = TestPut(
                "/api/v1/location/delete",
                param,
                true,
                new TypeReference<ResponseModel<LocationDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
