package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.persistence.entity.management.links.ManageLinkEntity;

public final class LinkConvertor {

    public static LinkDto toDto(ManageLinkEntity entity) {
        LinkDto dto = LinkDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .url(entity.getUrl())
                .value1(entity.getValue1())
                .value2(entity.getValue2())
                .value3(entity.getValue3())
                .code(entity.getCode())
                .isActive(entity.getIsActive())
                .description(entity.getDescription())
                .build();
        return dto;
    }
}
