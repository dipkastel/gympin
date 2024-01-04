package com.notrika.gympin.test.domain.article;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.article.dto.ArticleCategoryDto;
import com.notrika.gympin.common.article.param.ArticleCategoryParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class articleCategoryTest extends BaseTest {

    @Test
    @Order(1)
    public void add() throws Exception {
        final ArticleCategoryParam param = ArticleCategoryParam.builder()
                .name("catName1")
                .build();

        ResponseModel<ArticleCategoryDto> result = TestPost(
                "/api/v1/articleCategory/add",
                param,
                true,
                new TypeReference<ResponseModel<ArticleCategoryDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "catName1");
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        final ArticleCategoryParam param = ArticleCategoryParam.builder()
                .id(13l)
                .name("catName2")
                .build();

        ResponseModel<ArticleCategoryDto> result = TestPut(
                "/api/v1/articleCategory/update",
                param,
                true,
                new TypeReference<ResponseModel<ArticleCategoryDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "catName2");
    }

    @Test
    @Order(3)
    public void getById() throws Exception {

        final Map<String, Object> param = new TreeMap<>();
        param.put("id", "13");

        ResponseModel<ArticleCategoryDto> result = TestGet(
                "/api/v1/articleCategory/getById",
                param,
                true,
                new TypeReference<ResponseModel<ArticleCategoryDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "catName2");
    }


    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<ArticleCategoryDto>> result = TestGet(
                "/api/v1/articleCategory/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<ArticleCategoryDto>>>() {
                });

        Assertions.assertEquals(result.getData().size(), 13);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {


        final Map<String, Object> param = new TreeMap<>();
        param.put("id", "13");

        ResponseModel<ArticleCategoryDto> result = TestPut(
                "/api/v1/articleCategory/delete",
                param,
                true,
                new TypeReference<ResponseModel<ArticleCategoryDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }


}
