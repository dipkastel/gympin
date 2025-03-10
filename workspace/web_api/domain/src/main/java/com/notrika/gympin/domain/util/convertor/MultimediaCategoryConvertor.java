package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaCategoryEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class MultimediaCategoryConvertor {

    public static MultimediaCategoryDto multimediaCategoryToMultimediaCategoryDto(MultimediaCategoryEntity multimediaCategory) {
        return MultimediaCategoryDto.builder()
                .id(multimediaCategory.getId())
                .name(multimediaCategory.getName())
                .arw(multimediaCategory.getArw())
                .arh(multimediaCategory.getArh())
                .minw(multimediaCategory.getMinw())
                .minh(multimediaCategory.getMinh())
                .maxw(multimediaCategory.getMaxw())
                .maxh(multimediaCategory.getMaxh())
                .isDeleted(multimediaCategory.isDeleted())
                .build();
    }

    public static List<MultimediaCategoryDto> multimediaCategoriesToMultimediaCategoryDto(List<MultimediaCategoryEntity> multimediaCategories) {
        return multimediaCategories.stream().filter(o->!o.isDeleted()).map(MultimediaCategoryConvertor::multimediaCategoryToMultimediaCategoryDto).collect(Collectors.toList());
    }

    public static MultimediaCategoryEntity multimediaCategoryDtoToMultimediaCategory(MultimediaCategoryDto dto) {
        return  MultimediaCategoryEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .arw(dto.getArw())
                .arh(dto.getArh())
                .minw(dto.getMinw())
                .minh(dto.getMinh())
                .maxw(dto.getMaxw())
                .maxh(dto.getMaxh())
                .deleted(dto.isDeleted()).build();
    }

    public static MultimediaCategoryEntity multimediaCategoryParamToMultimediaCategory(MultimediaCategoryParam param) {
        return MultimediaCategoryEntity.builder()
                .id(param.getId())
                .name(param.getName())
                .arw(param.getArw())
                .arh(param.getArh())
                .minw(param.getMinw())
                .minh(param.getMinh())
                .maxw(param.getMaxw())
                .maxh(param.getMaxh())
                .deleted(param.isDeleted()).build();
    }

}
