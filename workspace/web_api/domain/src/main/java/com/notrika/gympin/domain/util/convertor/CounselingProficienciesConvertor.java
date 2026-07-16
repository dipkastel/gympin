package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeCounseling.Counseling.dto.CounselingDto;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto.CounselingProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingProficienciesEntity;

public final class CounselingProficienciesConvertor {

    public static CounselingProficienciesDto toDto(CounselingProficienciesEntity entity) {
        CounselingDto placeDto = PlaceConvertor.ToCounselingDto(entity.getCounseling());
        ProficienciesDto proficienciesDto = ProficienciesConvertor.toDto(entity.getProficiencies());
        CounselingProficienciesDto dto = new CounselingProficienciesDto();
        dto.setId(entity.getId());
        dto.setCounseling(placeDto);
        dto.setProficiencies(proficienciesDto);
        return dto;
    }

}
