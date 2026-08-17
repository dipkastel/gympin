package com.notrika.gympin.common.article.service;

import com.notrika.gympin.common.article.dto.ArticlePhraseDto;
import com.notrika.gympin.common.article.dto.ArticleSeoCountDto;
import com.notrika.gympin.common.article.param.ArticlePhraseParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.query.ArticleQuery;

import java.util.List;

public interface ArticleService extends BaseService<ArticleParam, ArticleDto, ArticleQuery> {

    ArticleDto updateArticleImage(ArticleImageParam articleImageParam);
    ArticleDto getBySlug(String slug);

    ArticlePhraseDto addPhrases(ArticlePhraseParam phrase);
    List<ArticlePhraseDto> getPhrasesByArticleId(Long id);
    ArticlePhraseDto deletePhrasesById(ArticlePhraseParam param);
    ArticleSeoCountDto getArticleCountWithPhrase(ArticlePhraseParam param);
    ArticleSeoCountDto getAllArticleLinkCount(ArticlePhraseParam param);


}
