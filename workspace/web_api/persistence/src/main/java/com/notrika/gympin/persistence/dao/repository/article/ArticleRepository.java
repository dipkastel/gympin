package com.notrika.gympin.persistence.dao.repository.article;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.article.ArticleSeoCountQDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends BaseRepository<ArticleEntity, Long> {

    ArticleEntity findFirstBySlug(String slug);


    @Query("SELECT new com.notrika.gympin.persistence.entity.article.ArticleSeoCountQDto(" +
            "COUNT(a)," +
            " COALESCE(SUM(" +
            "((FUNCTION('CHAR_LENGTH', a.text) - FUNCTION('CHAR_LENGTH', FUNCTION('REPLACE', a.text, :phrase, ''))) / FUNCTION('CHAR_LENGTH', :phrase))" +
            "), 0)) " +
            "FROM ArticleEntity a " +
            "WHERE a.text IS NOT NULL " +
            "AND a.articleStatus = 'PUBLISHED' " +
            "AND a.id <> :exceptId "+
            "AND a.text LIKE CONCAT('%', :phrase, '%') " +
            "AND a.deleted = false")
    ArticleSeoCountQDto getCountByPhraseName(@Param("phrase") String phrase, @Param("exceptId") Long exceptId);

    @Query("SELECT DISTINCT a.text FROM ArticleEntity a " +
            "WHERE a.text IS NOT NULL " +
            "AND a.articleStatus = 'PUBLISHED' " +
            "AND (:exceptId IS NULL OR a.id <> :exceptId) " +
            "AND a.deleted = false")
    List<String> findTextsForAnalysis(@Param("exceptId") Long exceptId);
}
