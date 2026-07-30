package com.notrika.gympin.controller.impl.article;

import com.notrika.gympin.common.article.dto.ArticlePhraseDto;
import com.notrika.gympin.common.article.param.ArticlePhraseParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.article.api.ArticleController;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.query.ArticleQuery;
import com.notrika.gympin.common.article.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/article")
public class ArticleControllerImpl implements ArticleController {

    @Autowired
    private ArticleService articleService;


    @Override
    public ResponseEntity<ArticleDto> add(ArticleParam articleParam) {
        return ResponseEntity.ok(articleService.add(articleParam));
    }

    @Override
    public ResponseEntity<ArticleDto> update( ArticleParam articleParam) {
        return ResponseEntity.ok(articleService.update(articleParam));
    }

    @Override
    public ResponseEntity<ArticleDto> delete( ArticleParam articleParam) {
        return ResponseEntity.ok(articleService.delete(articleParam));
    }

    @Override
    public ResponseEntity<List<ArticleDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(articleService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<ArticleDto> getById(Long id) {
        return ResponseEntity.ok(articleService.getById(id));
    }

    @Override
    public ResponseEntity<Page<ArticleDto>> query(ArticleQuery param) {
        return ResponseEntity.ok(articleService.query(param));
    }

    @Override
    @PostMapping("/updateArticleImage")
    public ResponseEntity<ArticleDto> updateArticleImage(@RequestBody ArticleImageParam articleImageParam) {
        return ResponseEntity.ok(articleService.updateArticleImage(articleImageParam));
    }

    @Override
    @GetMapping("/getBySlug")
    public ResponseEntity<ArticleDto> getBySlug(String slug) {
        return ResponseEntity.ok(articleService.getBySlug(slug));
    }

    @Override
    @PostMapping("/addPhrase")
    public ResponseEntity<ArticlePhraseDto> addPhrase(ArticlePhraseParam phrase) {
        return ResponseEntity.ok(articleService.addPhrases(phrase));
    }

    @Override
    @GetMapping("/getPhrasesByArticleId")
    public ResponseEntity<List<ArticlePhraseDto>> getPhrasesByArticleId(Long id) {
        return ResponseEntity.ok(articleService.getPhrasesByArticleId(id));
    }

    @Override
    @PutMapping("/deletePhrasesById")
    public ResponseEntity<ArticlePhraseDto> deletePhrasesById(ArticlePhraseParam param) {
        return ResponseEntity.ok(articleService.deletePhrasesById(param));
    }

}
