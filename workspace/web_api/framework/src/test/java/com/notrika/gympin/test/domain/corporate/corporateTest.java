package com.notrika.gympin.test.domain.corporate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class corporateTest extends BaseTest {

    public static Long corporateId = null;
    public static Long corporate2Id = null;
    public static Long corporateGroupId = null;

    @Test
    @Order(1)
    public void addByName() throws Exception {
        final CorporateParam param = CorporateParam.builder()
                .name("شرکت 1")
                .build();

        ResponseModel<CorporateDto> result = TestPost(
                "/api/v1/corporate/add",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "شرکت 1");
        corporateId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void add() throws Exception {
        final CorporateParam param = CorporateParam.builder()
                .name("شرکت 2")
                .address("آدرس شرکت 2")
                .status(CorporateStatusEnum.ACTIVE)
                .build();

        ResponseModel<CorporateDto> result = TestPost(
                "/api/v1/corporate/add",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "شرکت 2");
        corporate2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if (corporateId == null) throw new Exception("not exist");
        final CorporateParam param = CorporateParam.builder()
                .id(corporateId)
                .name("نام تغییر کرده")
                .address("آدرس شرکت تغییر کرده")
                .build();

        ResponseModel<CorporateDto> result = TestPut(
                "/api/v1/corporate/update",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "نام تغییر کرده");
        Assertions.assertEquals(result.getData().getAddress(), "آدرس شرکت تغییر کرده");
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if (corporateId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporateId);

        ResponseModel<CorporateDto> result = TestGet(
                "/api/v1/corporate/getById",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });

        Assertions.assertEquals(result.getData().getAddress(), "آدرس شرکت تغییر کرده");
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<CorporateDto>> result = TestGet(
                "/api/v1/corporate/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<CorporateDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(6)
    public void delete() throws Exception {
        if (corporateId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporateId.toString());

        ResponseModel<CorporateDto> result = TestPut(
                "/api/v1/corporate/delete",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(7)
    public void addGroup() throws Exception {
        final CorporatePersonnelGroupParam param = CorporatePersonnelGroupParam.builder()
                .name("گروه 1")
                .corporateId(corporate2Id)
                .build();

        ResponseModel<CorporatePersonnelGroupDto> result = TestPost(
                "/api/v1/corporate/addGroup",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelGroupDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "گروه 1");
        corporateGroupId = result.getData().getId();
    }


    @Test
    @Order(8)
    public void getCorporateGroups() throws Exception {
        if (corporate2Id == null) throw new Exception("not exist");
        if (corporateGroupId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporate2Id);

        ResponseModel<List<CorporatePersonnelGroupDto>> result = TestGet(
                "/api/v1/corporate/getCorporateGroups",
                param,
                true,
                new TypeReference<ResponseModel<List<CorporatePersonnelGroupDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }



    @Test
    @Order(9)
    public void deleteGroup() throws Exception {
        if (corporateGroupId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporateGroupId.toString());

        ResponseModel<CorporatePersonnelGroupDto> result = TestPut(
                "/api/v1/corporate/deleteGroup",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelGroupDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
