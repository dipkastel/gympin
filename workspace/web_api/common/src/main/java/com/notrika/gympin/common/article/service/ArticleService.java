package com.notrika.gympin.common.article.service;

import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.query.ArticleQuery;

public interface ArticleService extends BaseService<ArticleParam, ArticleDto, ArticleQuery> {

    ArticleDto updateArticleImage(ArticleImageParam articleImageParam);

}
