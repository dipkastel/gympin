package com.notrika.gympin.common.location.dto;

import com.notrika.gympin.common.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StateDto extends BaseDto<StateDto> {
    private Long id;
    private String name;
    //private Collection<CityDto> cities;

}
