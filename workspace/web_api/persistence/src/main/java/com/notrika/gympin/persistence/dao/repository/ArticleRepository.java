package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends BaseRepository<ArticleEntity, Long> {

}
