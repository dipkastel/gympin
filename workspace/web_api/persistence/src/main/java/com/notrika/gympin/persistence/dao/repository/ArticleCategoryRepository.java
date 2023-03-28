package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.article.ArticleCategoryEntity;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleCategoryRepository extends BaseRepository<ArticleCategoryEntity, Long> {

    List<ArticleCategoryEntity> findAllByDeletedIsFalseAndIdIn(List<Long> ids);
}
