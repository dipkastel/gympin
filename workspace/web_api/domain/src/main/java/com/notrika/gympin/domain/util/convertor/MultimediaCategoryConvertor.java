package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaCategory;

import java.util.List;
import java.util.stream.Collectors;

public final class MultimediaCategoryConvertor {

    public static MultimediaCategoryDto multimediaCategoryToMultimediaCategoryDto(MultimediaCategory multimediaCategory) {
        MultimediaCategoryDto dto = MultimediaCategoryDto.builder().id(multimediaCategory.getId()).name(multimediaCategory.getName())
                //                .createdDate(multimediaCategory.getCreatedDate())
                //                .updatedDate(multimediaCategory.getUpdatedDate())
                .isDeleted(multimediaCategory.isDeleted()).build();
        return dto;
    }

    public static List<MultimediaCategoryDto> multimediaCategoriesToMultimediaCategoryDto(List<MultimediaCategory> multimediaCategories) {
        return multimediaCategories.stream().map(MultimediaCategoryConvertor::multimediaCategoryToMultimediaCategoryDto).collect(Collectors.toList());
    }

    public static MultimediaCategory multimediaCategoryDtoToMultimediaCategory(MultimediaCategoryDto dto) {
        MultimediaCategory multimediaCategory = MultimediaCategory.builder().id(dto.getId()).name(dto.getName())
                //                .createdDate(dto.getCreatedDate())
                //                .updatedDate(dto.getUpdatedDate())
                .deleted(dto.isDeleted()).build();
        return multimediaCategory;
    }

    public static List<MultimediaCategory> multimediaCategoryDtoToMultimediaCategories(List<MultimediaCategoryDto> dtoList) {
        return dtoList.stream().map(MultimediaCategoryConvertor::multimediaCategoryDtoToMultimediaCategory).collect(Collectors.toList());
    }

    public static MultimediaCategory multimediaCategoryParamToMultimediaCategory(MultimediaCategoryParam param) {
        MultimediaCategory multimediaCategory = MultimediaCategory.builder().id(param.getId()).name(param.getName())
                //                .createdDate(param.getCreatedDate())
                //                .updatedDate(param.getUpdatedDate())
                .deleted(param.isDeleted()).build();
        return multimediaCategory;
    }

    public static List<MultimediaCategory> multimediaCategoryParamsToMultimediaCategories(List<MultimediaCategoryParam> paramList) {
        return paramList.stream().map(MultimediaCategoryConvertor::multimediaCategoryParamToMultimediaCategory).collect(Collectors.toList());
    }

}
