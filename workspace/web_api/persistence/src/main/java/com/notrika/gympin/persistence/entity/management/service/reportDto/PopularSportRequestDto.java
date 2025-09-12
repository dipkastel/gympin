package com.notrika.gympin.persistence.entity.management.service.reportDto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PopularSportRequestDto {

    private String sportName;
    private Long count;

    public PopularSportRequestDto(String sportName, Long count) {
        this.sportName = sportName;
        this.count = count;
    }
}
