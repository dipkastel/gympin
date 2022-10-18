package com.notrika.gympin.common.accounting.account.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class OverallSportsTransactionItemDto extends BaseDto<OverallSportsTransactionItemDto> {

    private SportDto sport;

    private BigDecimal totalIncome;

}
