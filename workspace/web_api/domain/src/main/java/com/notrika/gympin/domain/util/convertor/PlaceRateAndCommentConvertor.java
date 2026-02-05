package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeBase.dto.PlaceCommentDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceRateDto;
import com.notrika.gympin.persistence.entity.place.rateAndComment.PlaceCommentEntity;
import com.notrika.gympin.persistence.entity.place.rateAndComment.PlaceRateEntity;

import java.util.stream.Collectors;

public final class PlaceRateAndCommentConvertor {

    public static PlaceCommentDto toDto(PlaceCommentEntity entity) {
        if (entity == null) return null;
        return PlaceCommentDto.builder()
                .id(entity.getId())
                .Comment(entity.getComment())
                .user(UserConvertor.toDtoSimple(entity.getUser()))
                .status(entity.getStatus())
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .childes(entity.getChilds() != null ? entity.getChilds().stream().map(p -> toDto(p)).collect(Collectors.toList()) : null)
                .createdDate(entity.getCreatedDate())
                .build();

    }

    public static PlaceRateDto toDto(PlaceRateEntity entity) {
        if (entity == null) return null;
        return PlaceRateDto.builder()
                .rate(entity.getRate())
                .user(UserConvertor.toDtoSimple(entity.getUser()))
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .build();
    }
}
