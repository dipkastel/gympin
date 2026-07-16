package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.persistence.entity.place.Counseling.ProficienciesEntity;

public final class ProficienciesConvertor {


    public static ProficienciesDto toDto(ProficienciesEntity entity) {
        if(entity==null) return null;
        ProficienciesDto dto = new ProficienciesDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

}
