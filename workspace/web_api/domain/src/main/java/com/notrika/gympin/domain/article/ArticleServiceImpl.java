package com.notrika.gympin.domain.article;

import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.article.dto.ArticlePhraseDto;
import com.notrika.gympin.common.article.dto.ArticleSeoCountDto;
import com.notrika.gympin.common.article.param.ArticleImageParam;
import com.notrika.gympin.common.article.param.ArticleParam;
import com.notrika.gympin.common.article.param.ArticlePhraseParam;
import com.notrika.gympin.common.article.query.ArticleQuery;
import com.notrika.gympin.common.article.service.ArticleService;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ArticleConvertor;
import com.notrika.gympin.persistence.dao.repository.article.ArticleCategoryRepository;
import com.notrika.gympin.persistence.dao.repository.article.ArticlePhraseRepository;
import com.notrika.gympin.persistence.dao.repository.article.ArticleRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.entity.article.ArticleCategoryEntity;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.article.ArticlePhraseEntity;
import com.notrika.gympin.persistence.entity.article.ArticleSeoCountQDto;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.EmptyStackException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl extends AbstractBaseService<ArticleParam, ArticleDto, ArticleQuery, ArticleEntity> implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleCategoryRepository articleCategoryRepository;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private ArticlePhraseRepository articlePhraseRepository;


    @Override
    public ArticleDto add(@NonNull ArticleParam articleParam) {
        ArticleEntity entity = ArticleEntity.builder()
                .title(articleParam.getTitle())
                .slug(articleParam.getSlug())
                .seoPriority(articleParam.getSeoPriority())
                .summary(articleParam.getSummary())
                .faq(articleParam.getFaq())
                .reference(articleParam.getReference())
                .text(articleParam.getFullText())
                .articleStatus(articleParam.getArticleStatus())
                .articleType(articleParam.getArticleType())
                .build();
        return ArticleConvertor.toDto(articleRepository.add(entity));
    }

    @Override
    public ArticleDto update(ArticleParam articleParam) {
        ArticleEntity entity = articleRepository.getById(articleParam.getId());
        entity.setTitle(articleParam.getTitle());
        entity.setSlug(articleParam.getSlug());
        entity.setSeoPriority(articleParam.getSeoPriority());
        entity.setSummary(articleParam.getSummary());
        entity.setFaq(articleParam.getFaq());
        entity.setReference(articleParam.getReference());
        entity.setText(articleParam.getFullText());
        entity.setArticleStatus(articleParam.getArticleStatus());
        entity.setArticleType(articleParam.getArticleType());
        if (articleParam.getCategories() != null) {
            List<ArticleCategoryEntity> newCategorires = articleCategoryRepository.findAllByDeletedIsFalseAndIdIn(articleParam.getCategories().stream().filter(o -> !o.isDeleted()).map(BaseParam::getId).collect(Collectors.toList()));
            entity.setCategories(newCategorires);
        }
        return ArticleConvertor.toDto(articleRepository.update(entity));
    }

    @Override
    public ArticleDto delete(ArticleParam articleParam) {
        ArticleEntity entity = articleRepository.getById(articleParam.getId());
        return ArticleConvertor.toDto(articleRepository.deleteById2(entity));
    }

    @Override
    public ArticleDto getById(long id) {
        ArticleEntity entity = articleRepository.getById(id);
        return ArticleConvertor.toDto(entity);
    }

    @Override
    public ArticleEntity add(ArticleEntity entity) {
        return articleRepository.add(entity);
    }

    @Override
    public ArticleEntity update(ArticleEntity entity) {
        return articleRepository.update(entity);
    }

    @Override
    public ArticleEntity delete(ArticleEntity entity) {
        return articleRepository.deleteById2(entity);
    }

    @Override
    public ArticleEntity getEntityById(long id) {
        return articleRepository.getById(id);
    }

    @Override
    public List<ArticleEntity> getAll(Pageable pageable) {
        return articleRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ArticleEntity> findAll(Specification<ArticleEntity> specification, Pageable pageable) {
        return articleRepository.findAll(specification, pageable);
    }

    @Override
    public List<ArticleDto> convertToDtos(List<ArticleEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(ArticleConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ArticleDto> convertToDtos(Page<ArticleEntity> entities) {
        return entities.map(ArticleConvertor::toDto);
    }

    @Override
    public ArticleDto updateArticleImage(ArticleImageParam articleImageParam) {
        MultimediaEntity articleImage = multimediaRepository.getById(articleImageParam.getMultimediaId());
        ArticleEntity article = articleRepository.getById(articleImageParam.getArticleId());
        article.setArticleImage(articleImage);
        return ArticleConvertor.toDto(articleRepository.update(article));
    }

    @Override
    public ArticleDto getBySlug(String slug) {
        String decoded = URLDecoder.decode(slug, StandardCharsets.UTF_8);
        ArticleEntity article = articleRepository.findFirstBySlug(decoded);
        List<ArticlePhraseEntity> phrases = articlePhraseRepository.findAllByDeletedIsFalseAndArticleIsNot(article);
        return ArticleConvertor.toDto(article,phrases);
    }

    @Override
    public ArticlePhraseDto addPhrases(ArticlePhraseParam phrase) {
        if (phrase.getName().isEmpty()) throw new EmptyStackException();
        if (phrase.getArticleId() == null) throw new EmptyStackException();
        ArticlePhraseEntity phraseEntity = articlePhraseRepository.add(ArticlePhraseEntity.builder()
                .name(phrase.getName())
                .article(articleRepository.getById(phrase.getArticleId()))
                .build());
        return ArticleConvertor.toDto(phraseEntity);

    }

    @Override
    public List<ArticlePhraseDto> getPhrasesByArticleId(Long id) {
        List<ArticlePhraseEntity> phraseListEntity = articleRepository.getById(id).getPhrases().stream().filter(i->!i.isDeleted()).collect(Collectors.toList());
        return phraseListEntity.stream().map(ArticleConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public ArticlePhraseDto deletePhrasesById(ArticlePhraseParam param) {
        ArticlePhraseEntity phraseEntity = articlePhraseRepository.getById(param.getId());
        articlePhraseRepository.deleteById2(phraseEntity);
        return ArticleConvertor.toDto(phraseEntity);
    }

    @Override
    public ArticleSeoCountDto getArticleCountWithPhrase(ArticlePhraseParam param) {
        ArticleSeoCountQDto count = articleRepository.getCountByPhraseName(param.getName(),param.getArticleId());
        ArticleSeoCountDto artCount = ArticleSeoCountDto
                .builder()
                .articleCount(count.getArticleCount())
                .wordCount(count.getWordCount())
                .build();
        return artCount;
    }

    @Override
    public ArticleSeoCountDto getAllArticleLinkCount(ArticlePhraseParam param) {
        ArticleEntity article = articleRepository.getById(param.getArticleId());
        List<ArticlePhraseEntity> phrases = article.getPhrases();
        List<String> texts = articleRepository.findTextsForAnalysis(param.getArticleId());
        long matchingRowsCount = 0;
        long totalOccurrencesCount = 0;
        for (String text : texts) {
            long rowOccurrences = 0;
            for (String phrase : phrases.stream().map(ArticlePhraseEntity::getName).collect(Collectors.toList())) {
                if (phrase != null && !phrase.isBlank() && text.contains(phrase)) {
                    int count = (text.length() - text.replace(phrase, "").length()) / phrase.length();
                    rowOccurrences += count;
                }
            }
            if (rowOccurrences > 0) {
                matchingRowsCount++;
                totalOccurrencesCount += rowOccurrences;
            }
        }
        ArticleSeoCountDto artCount = ArticleSeoCountDto
                .builder()
                .articleCount(matchingRowsCount)
                .wordCount(totalOccurrencesCount)
                .build();
        return artCount;
    }

}
