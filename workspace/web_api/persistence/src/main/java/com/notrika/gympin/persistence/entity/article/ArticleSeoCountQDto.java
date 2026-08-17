package com.notrika.gympin.persistence.entity.article;

import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ArticleSeoCountQDto extends BaseDtoWithCreateUpdate<ArticleSeoCountQDto> {

    private Long wordCount;
    private Long articleCount;

    public ArticleSeoCountQDto(Long _wordCount, Long _articleCount) {
        this.wordCount = _wordCount;
        this.articleCount = _articleCount;
    }
}
