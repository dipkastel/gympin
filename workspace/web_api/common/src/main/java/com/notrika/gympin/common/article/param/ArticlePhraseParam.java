package com.notrika.gympin.common.article.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class ArticlePhraseParam extends BaseParam<ArticlePhraseParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("ArticleId")
    private Long articleId;


}
