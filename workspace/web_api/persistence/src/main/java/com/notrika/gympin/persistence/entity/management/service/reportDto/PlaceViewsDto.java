package com.notrika.gympin.persistence.entity.management.service.reportDto;

import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlaceViewsDto extends BaseDto<PlaceViewsDto> {

    private Long ViewCount;
    private Date Date;

    public PlaceViewsDto(Long _viewCount, Date _date) {
        this.ViewCount = _viewCount;
        this.Date = _date;
    }

}
