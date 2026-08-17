package com.notrika.gympin.common.article.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ArticleSeoCountDto extends BaseDto<ArticleSeoCountDto> {

    @JsonProperty("WordCount")
    private Long wordCount;

    @JsonProperty("ArticleCount")
    private Long articleCount;
}
