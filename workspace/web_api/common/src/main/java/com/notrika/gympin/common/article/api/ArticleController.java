package com.notrika.gympin.common.article.api;

import com.notrika.gympin.common.article.dto.ArticlePhraseDto;
import com.notrika.gympin.common.article.dto.ArticleSeoCountDto;
import com.notrika.gympin.common.article.param.ArticlePhraseParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.query.ArticleQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ArticleController extends BaseController<ArticleParam, ArticleDto, ArticleQuery> {

    ResponseEntity<ArticleDto> updateArticleImage(ArticleImageParam articleImageParam);
    ResponseEntity<ArticleDto> getBySlug(String slug);
    ResponseEntity<ArticlePhraseDto> addPhrase(@RequestBody ArticlePhraseParam phrase);
    ResponseEntity<List<ArticlePhraseDto>> getPhrasesByArticleId(Long id);
    ResponseEntity<ArticlePhraseDto> deletePhrasesById(@RequestBody ArticlePhraseParam id);

    ResponseEntity<ArticleSeoCountDto> getArticleCountWithPhrase(@RequestBody ArticlePhraseParam param);
    ResponseEntity<ArticleSeoCountDto> getAllArticleLinkCount(@RequestBody ArticlePhraseParam param);
}
