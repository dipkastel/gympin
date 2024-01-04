package com.notrika.gympin.test.domain.article;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.enums.ArticleStatus;
import com.notrika.gympin.common.article.enums.ArticleType;
import com.notrika.gympin.common.article.param.ArticleCategoryParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class articleTest extends BaseTest {

    public static Long articleId = null;
    @Test
    @Order(1)
    public void add() throws Exception {
        final ArticleParam param = ArticleParam.builder()
                .title("تیتر 1")
                .articleStatus(ArticleStatus.PUBLISHED)
                .articleType(ArticleType.SIMPLE)
                .categories(List.of(ArticleCategoryParam.builder().id(1l).build()))
                .fullText("لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ")
                .summary("لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ")
                .build();

        ResponseModel<ArticleDto> result = TestPost(
                "/api/v1/article/add",
                param,
                true,
                new TypeReference<ResponseModel<ArticleDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "تیتر 1");
        articleId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void update() throws Exception {
        if(articleId==null) throw new Exception("article is not exist");
        final ArticleParam param = ArticleParam.builder()
                .id(articleId)
                .title("تیتر تغییر کرده")
                .articleStatus(ArticleStatus.DRAFT)
                .articleType(ArticleType.SIMPLE)
                .categories(List.of(ArticleCategoryParam.builder().id(2l).build()))
                .fullText("لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ")
                .summary("لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ")
                .build();

        ResponseModel<ArticleDto> result = TestPut(
                "/api/v1/article/update",
                param,
                true,
                new TypeReference<ResponseModel<ArticleDto>>() {
                });

        Assertions.assertEquals(result.getData().getTitle(), "تیتر تغییر کرده");
    }

    @Test
    @Order(3)
    public void getById() throws Exception {
        if(articleId==null) throw new Exception("article is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", articleId);

        ResponseModel<ArticleDto> result = TestGet(
                "/api/v1/article/getById",
                param,
                true,
                new TypeReference<ResponseModel<ArticleDto>>() {
                });

        Assertions.assertEquals(result.getData().getSummary(), "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ");
    }


    @Test
    @Order(4)
    public void getAll() throws Exception {
        ResponseModel<List<ArticleDto>> result = TestGet(
                "/api/v1/article/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<ArticleDto>>>() {
                });

        Assertions.assertEquals(result.getData().size(), 1);
    }

    @Test
    @Order(5)
    public void delete() throws Exception {
        if(articleId==null) throw new Exception("article is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", articleId.toString());

        ResponseModel<ArticleDto> result = TestPut(
                "/api/v1/article/delete",
                param,
                true,
                new TypeReference<ResponseModel<ArticleDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}
