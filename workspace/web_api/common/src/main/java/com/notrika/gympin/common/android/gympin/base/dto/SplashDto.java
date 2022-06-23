package com.notrika.gympin.common.android.gympin.base.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.util.StringUtil;
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
public class SplashDto extends BaseDto<SplashDto> {
    private String initialText = StringUtil.EMPTY_STRING;
}
