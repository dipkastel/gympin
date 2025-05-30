package com.notrika.gympin.test.domain.support;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SupportTest extends BaseTest {

    public static Long placeId = null;
    public static Long corporateId = null;
    public static Long support1Id = null;
    public static Long support2Id = null;
    public static Long support3Id = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز برای پشتیبانی")
                .build();

        ResponseModel<PlaceGymDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        placeId = result.getData().getId();
    }

    @BeforeAll
    @Order(2)
    public void addCorporate() throws Exception {
        final CorporateParam param = CorporateParam.builder()
                .name("شرکت برای پشتیبانی")
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
    public void addCorporateSupport() throws Exception {
        if(corporateId==null) throw new Exception("is not exist");
        final SupportParam param =  SupportParam.builder()
                .corporateId(corporateId)
                .userId(1l)
                .title("تیتر درخواست")
                .supportMessages(SupportMessageParam.builder().messages("پیام درخواست !!").build())
                .build();


        ResponseModel<SupportDto> result = TestPost(
                "/api/v1/support/add",
                param,
                true,
                new TypeReference<ResponseModel<SupportDto>>() {
                });

        Assertions.assertEquals(result.getData().getMessages().get(0).getMessage(),"پیام درخواست !!");
        Assertions.assertEquals(result.getData().getTitle(),"تیتر درخواست");
        support1Id = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addPlaceSupport() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final SupportParam param =  SupportParam.builder()
                .placeId(placeId)
                .userId(1l)
                .title("تیتر درخواست")
                .supportMessages(SupportMessageParam.builder().messages("پیام درخواست !!").build())
                .build();


        ResponseModel<SupportDto> result = TestPost(
                "/api/v1/support/add",
                param,
                true,
                new TypeReference<ResponseModel<SupportDto>>() {
                });

        Assertions.assertEquals(result.getData().getMessages().get(0).getMessage(),"پیام درخواست !!");
        Assertions.assertEquals(result.getData().getTitle(),"تیتر درخواست");
        support2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void addUserSupport() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final SupportParam param =  SupportParam.builder()
                .userId(1l)
                .title("تیتر درخواست")
                .supportMessages(SupportMessageParam.builder().messages("پیام درخواست !!").build())
                .build();


        ResponseModel<SupportDto> result = TestPost(
                "/api/v1/support/add",
                param,
                true,
                new TypeReference<ResponseModel<SupportDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(),"تیتر درخواست");
        Assertions.assertEquals(result.getData().getMessages().get(0).getMessage(),"پیام درخواست !!");
        support3Id = result.getData().getId();
    }
    @Test
    @Order(4)
    public void addAnswerSupport() throws Exception {
        if(support2Id==null) throw new Exception("is not exist");
        final SupportMessageParam param =  SupportMessageParam.builder()
                .messages("پیام درخواست 22!!")
                .isAnswer(true)
                .status(SupportStatus.COMPLETE)
                .supportId(support2Id)
                .build();


        ResponseModel<SupportDto> result = TestPost(
                "/api/v1/support/addMessage",
                param,
                true,
                new TypeReference<ResponseModel<SupportDto>>() {
                });

//        Assertions.assertEquals(result.getData().getMessages().get(1).getMessage(),"پیام درخواست 22!!");
        Assertions.assertEquals(result.getData().getTitle(),"تیتر درخواست");
    }

    @Test
    @Order(5)
    public void getById() throws Exception {
        if(support2Id==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", support2Id);

        ResponseModel<SupportDto> result = TestGet(
                "/api/v1/support/getById",
                param,
                true,
                new TypeReference<ResponseModel<SupportDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "تیتر درخواست");
    }


    @Test
    @Order(6)
    public void getByPlace() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId);

        ResponseModel<List<SupportDto>> result = TestGet(
                "/api/v1/support/getByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<SupportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(7)
    public void getByUser() throws Exception {
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", "1");

        ResponseModel<List<SupportDto>> result = TestGet(
                "/api/v1/support/getByUser",
                param,
                true,
                new TypeReference<ResponseModel<List<SupportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(8)
    public void getByCorporate() throws Exception {
        if(corporateId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", corporateId);

        ResponseModel<List<SupportDto>> result = TestGet(
                "/api/v1/support/getByCorporate",
                param,
                true,
                new TypeReference<ResponseModel<List<SupportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(9)
    public void getAll() throws Exception {
        ResponseModel<List<SupportDto>> result = TestGet(
                "/api/v1/support/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<SupportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }


}
