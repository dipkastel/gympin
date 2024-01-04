package com.notrika.gympin.persistence.dao.repository.article;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends BaseRepository<ArticleEntity, Long> {

}
