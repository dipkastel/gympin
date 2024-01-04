package com.notrika.gympin.test.domain.sport;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.sport.sport.enums.LaunchStatus;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class sportTest extends BaseTest {

    public static Long sportId = null;

    @Test
    @Order(1)
    public void add() throws Exception {
        final SportParam param = SportParam.builder()
                .name("ورزش 1")
                .launchStatus(LaunchStatus.COMING_SOON)
                .build();

        ResponseModel<SportDto> result = TestPost(
                "/api/v1/sport/add",
                param,
                true,
                new TypeReference<ResponseModel<SportDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "ورزش 1");
        sportId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if (sportId == null) throw new Exception("not exist");
        final SportParam param = SportParam.builder()
                .id(sportId)
                .name("ورزش تغییر کرده")
                .build();

        ResponseModel<SportDto> result = TestPut(
                "/api/v1/sport/update",
                param,
                true,
                new TypeReference<ResponseModel<SportDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "ورزش تغییر کرده");
    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if (sportId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", sportId);

        ResponseModel<SportDto> result = TestGet(
                "/api/v1/sport/getById",
                param,
                true,
                new TypeReference<ResponseModel<SportDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "ورزش تغییر کرده");
    }


    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<SportDto>> result = TestGet(
                "/api/v1/sport/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<SportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {
        if (sportId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", sportId.toString());

        ResponseModel<SportDto> result = TestPut(
                "/api/v1/sport/delete",
                param,
                true,
                new TypeReference<ResponseModel<SportDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
