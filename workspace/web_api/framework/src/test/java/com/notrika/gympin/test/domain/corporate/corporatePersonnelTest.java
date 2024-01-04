package com.notrika.gympin.test.domain.corporate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class corporatePersonnelTest extends BaseTest {


    public static Long corporateId = null;
    public static Long corporatePersonnelId = null;


    @BeforeAll
    @Order(1)
    public void addCorporate() throws Exception {
        final CorporateParam param = CorporateParam.builder()
                .name("شرکت تست")
                .build();

        ResponseModel<CorporateDto> result = TestPost(
                "/api/v1/corporate/add",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });
        corporateId = result.getData().getId();
    }

    @Test
    @Order(1)
    public void add() throws Exception {
        final CorporatePersonnelParam param = CorporatePersonnelParam.builder()
                .corporate(CorporateParam.builder().id(corporateId).build())
                .phoneNumber("09126540027")
                .role(CorporatePersonnelRoleEnum.ADMIN)
                .build();

        ResponseModel<CorporatePersonnelDto> result = TestPost(
                "/api/v1/corporatePersonnel/add",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getRole().toString(), "PERSONEL");
        corporatePersonnelId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if(corporatePersonnelId ==null) throw new Exception("is not exist");

        final CorporatePersonnelParam param = CorporatePersonnelParam.builder()
                .id(corporatePersonnelId)
                .corporate(CorporateParam.builder().id(corporateId).build())
                .role(CorporatePersonnelRoleEnum.PERSONEL)
                .build();

        ResponseModel<CorporatePersonnelDto> result = TestPut(
                "/api/v1/corporatePersonnel/update",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getRole().toString(), "PERSONEL");
        corporatePersonnelId = result.getData().getId();

    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if(corporatePersonnelId ==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporatePersonnelId);

        ResponseModel<CorporatePersonnelDto> result = TestGet(
                "/api/v1/corporatePersonnel/getById",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelDto>>() {
                });

        Assertions.assertEquals(result.getData().getRole().toString(), "PERSONEL");

    }


    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<CorporatePersonnelDto>> result = TestGet(
                "/api/v1/corporatePersonnel/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<CorporatePersonnelDto>>>() {
                });

        Assertions.assertEquals(result.getData().size(), 1);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {
        if(corporatePersonnelId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporatePersonnelId.toString());

        ResponseModel<CorporatePersonnelDto> result = TestPut(
                "/api/v1/corporatePersonnel/delete",
                param,
                true,
                new TypeReference<ResponseModel<CorporatePersonnelDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
