package com.notrika.gympin.persistence.dao.repository.article;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.article.ArticlePhraseEntity;
import com.notrika.gympin.persistence.entity.article.ArticleSeoCountQDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlePhraseRepository extends BaseRepository<ArticlePhraseEntity, Long> {

    List<ArticlePhraseEntity> findAllByDeletedIsFalseAndArticleIsNot(ArticleEntity article);


}
