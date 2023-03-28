package com.notrika.gympin.common.article.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.article.enums.ArticleStatus;
import com.notrika.gympin.common.article.enums.ArticleType;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ArticleDto extends BaseDtoWithCreateUpdate<ArticleDto> {

    @JsonProperty("Title")
    private String title;

    @JsonProperty("FullText")
    private String fullText;

    @JsonProperty("Summary")
    private String summary;

    @JsonProperty("ArticleStatus")
    private ArticleStatus articleStatus;

    @JsonProperty("ArticleType")
    private ArticleType articleType;

    @JsonProperty("ArticleImage")
    private MultimediaDto articleImage;

    @JsonProperty("Categories")
    private List<ArticleCategoryDto> categories;

}
