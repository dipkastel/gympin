package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRole;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class placePersonnelsTest extends BaseTest {

    public static Long placePersonnelId = null;
    public static Long placePersonnel2Id = null;
    public static Long placeId = null;
    public static Long userId = null;



    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceParam param = PlaceParam.builder()
                .name("مرکز برای پرسنل")
                .build();

        ResponseModel<PlaceDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceDto>>() {
                });

        placeId = result.getData().getId();
    }


    @Test
    @Order(1)
    public void addByPronenumber() throws Exception {
        if (placeId == null) throw new Exception("is not exist");
        final PlacePersonnelParam param = PlacePersonnelParam.builder()
                .PhoneNumber("09126540027")
                .place(PlaceParam.builder().id(placeId).build())
                .build();

        ResponseModel<PlacePersonnelDto> result = TestPost(
                "/api/v1/placePersonnel/add",
                param,
                true,
                new TypeReference<ResponseModel<PlacePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getUserDto().getPhoneNumber(), "09126540027");
        placePersonnelId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void add() throws Exception {
        if (placeId == null) throw new Exception("is not exist");
        final PlacePersonnelParam param = PlacePersonnelParam.builder()
                .PhoneNumber("09194711540")
                .place(PlaceParam.builder().id(placeId).build())
                .userRole(PlacePersonnelRole.PLACE_PERSONNEL)
                .build();

        ResponseModel<PlacePersonnelDto> result = TestPost(
                "/api/v1/placePersonnel/add",
                param,
                true,
                new TypeReference<ResponseModel<PlacePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getUserDto().getPhoneNumber(), "09194711540");
        Assertions.assertEquals(result.getData().getUserRole().toString(), "PLACE_PERSONNEL");
        placePersonnel2Id = result.getData().getId();
        userId = result.getData().getUserDto().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if (placePersonnelId == null) throw new Exception("is not exist");
        final PlacePersonnelParam param = PlacePersonnelParam.builder()
                .id(placePersonnelId)
                .place(PlaceParam.builder().id(placeId).build())
                .userRole(PlacePersonnelRole.PLACE_COACH)
                .build();

        ResponseModel<PlacePersonnelDto> result = TestPut(
                "/api/v1/placePersonnel/update",
                param,
                true,
                new TypeReference<ResponseModel<PlacePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getUserRole().toString(), "Place_COACH");
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if (placePersonnelId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placePersonnelId);

        ResponseModel<PlacePersonnelDto> result = TestGet(
                "/api/v1/placePersonnel/getById",
                param,
                true,
                new TypeReference<ResponseModel<PlacePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getUserRole().toString(), "Place_COACH");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<PlacePersonnelDto>> result = TestGet(
                "/api/v1/placePersonnel/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<PlacePersonnelDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 1);
    }

    @Test
    @Order(6)
    public void getByPlaceId() throws Exception {
        if (placeId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId);

        ResponseModel<List<PlacePersonnelDto>> result = TestGet(
                "/api/v1/placePersonnel/PersonnelByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<PlacePersonnelDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
    }


    @Test
    @Order(7)
    public void delete() throws Exception {
        if (placePersonnelId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placePersonnelId.toString());

        ResponseModel<PlacePersonnelDto> result = TestPut(
                "/api/v1/placePersonnel/delete",
                param,
                true,
                new TypeReference<ResponseModel<PlacePersonnelDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(8)
    public void getUserFalseAccess() throws Exception{
        if (placeId == null) throw new Exception("is not exist");
        if (userId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("placeId", placeId);
        param.put("userId", userId);

        ResponseModel<List<PlacePersonnelAccessDto>> result = TestGet(
                "/api/v1/placePersonnel/getUserPlaceAccess",
                param,
                true,
                new TypeReference<ResponseModel<List<PlacePersonnelAccessDto>>>() {
                });

        for (PlacePersonnelAccessDto access :result.getData()){
            Assertions.assertFalse(access.getAccess(),access.getSection().toString());
        }
    }
    @Test
    @Order(9)
    public void updatePersonnelAccess() throws Exception{
        if (placePersonnel2Id == null) throw new Exception("is not exist");
        List<PlacePersonnelAccessParam> param = new ArrayList<>();

        for (PlacePersonnelAccessEnum section : PlacePersonnelAccessEnum.values()) {
            param.add(PlacePersonnelAccessParam.builder().access(true).placePersonelId(placePersonnel2Id).section(section).build());
        }

        ResponseModel<List<PlacePersonnelAccessDto>> result = TestPost(
                "/api/v1/placePersonnel/updatePersonnelAccess",
                param,
                true,
                new TypeReference<ResponseModel<List<PlacePersonnelAccessDto>>>() {
                });

        for (PlacePersonnelAccessDto access :result.getData()){
            Assertions.assertTrue(access.getAccess(),access.getSection().toString());
        }
    }
    @Test
    @Order(10)
    public void getUserAccess() throws Exception{
        if (placeId == null) throw new Exception("is not exist");
        if (userId == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("placeId", placeId);
        param.put("userId", userId);

        ResponseModel<List<PlacePersonnelAccessDto>> result = TestGet(
                "/api/v1/placePersonnel/getUserPlaceAccess",
                param,
                true,
                new TypeReference<ResponseModel<List<PlacePersonnelAccessDto>>>() {
                });

        for (PlacePersonnelAccessDto access :result.getData()){
            Assertions.assertTrue(access.getAccess(),access.getSection().toString());
        }
    }
}
