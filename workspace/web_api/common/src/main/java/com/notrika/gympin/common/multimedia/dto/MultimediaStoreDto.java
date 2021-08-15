package com.notrika.gympin.common.multimedia.dto;

import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultimediaStoreDto extends BaseDto<MultimediaStoreDto> {
    private boolean stored;
}
