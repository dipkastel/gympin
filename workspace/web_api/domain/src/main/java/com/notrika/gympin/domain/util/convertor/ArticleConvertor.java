package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.article.dto.ArticleCategoryDto;
import com.notrika.gympin.common.article.dto.ArticleDto;
import com.notrika.gympin.common.report.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.persistence.entity.article.ArticleCategoryEntity;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;

import java.util.stream.Collectors;

public class ArticleConvertor {

    public static ArticleDto toDto(ArticleEntity entity) {
        if(entity==null) return null;
        ArticleDto dto = new ArticleDto();
        dto.setId(entity.getId());
        dto.setArticleType(entity.getArticleType());
        dto.setArticleStatus(entity.getArticleStatus());
        dto.setSummary(entity.getSummary());
        dto.setTitle(entity.getTitle());
        dto.setFullText(entity.getText());
        dto.setArticleImage(MultimediaConvertor.toDto(entity.getArticleImage()));
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setUpdatedDate(entity.getUpdatedDate());
        dto.setUpdaterUser(UserConvertor.toDtoSimple(entity.getUpdaterUser()));
        if(entity.getCategories()!=null)
            dto.setCategories(entity.getCategories().stream().map(ArticleConvertor::toDto).collect(Collectors.toList()));
        return dto;
    }

    public static ArticleCategoryDto toDto(ArticleCategoryEntity entity) {
        if(entity==null) return null;
        ArticleCategoryDto dto = new ArticleCategoryDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

}
