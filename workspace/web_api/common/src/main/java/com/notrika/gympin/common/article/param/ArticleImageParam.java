package com.notrika.gympin.common.article.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.article.enums.ArticleStatus;
import com.notrika.gympin.common.article.enums.ArticleType;
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
public class ArticleImageParam extends BaseParam<ArticleImageParam> {

    @JsonProperty("ArticleId")
    private Long articleId;

    @JsonProperty("MultimediaId")
    private Long multimediaId;

}
