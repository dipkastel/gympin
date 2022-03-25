package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;

public final class MultimediaConvertor {

    public static MultimediaDto multimediaToMultimediaDto(Multimedia multimedia) {
        return MultimediaDto.builder().id(multimedia.getId()).name(multimedia.getFileName()).createdDate(multimedia.getCreatedDate()).updatedDate(multimedia.getUpdatedDate()).isDeleted(multimedia.isDeleted()).build();
    }

}
