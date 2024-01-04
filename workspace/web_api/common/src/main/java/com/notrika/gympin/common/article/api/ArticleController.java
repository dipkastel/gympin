package com.notrika.gympin.common.article.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.query.ArticleQuery;
import org.springframework.http.ResponseEntity;

public interface ArticleController extends BaseController<ArticleParam, ArticleDto, ArticleQuery> {

    ResponseEntity<ArticleDto> updateArticleImage(ArticleImageParam articleImageParam);
}
