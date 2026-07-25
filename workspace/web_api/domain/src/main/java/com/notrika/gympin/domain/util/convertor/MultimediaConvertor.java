package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class MultimediaConvertor {

    private static String urlPreFix = "http://localhost:8080/api/resource/image?";
//    private static String urlPreFix = "http://192.168.0.117:8080/api/resource/image?Id=";

    public static MultimediaDto toDto(MultimediaEntity entity) {
        if(entity==null)return null;
        String url = urlPreFix;
        if(entity.getExtension().equals("webp")){
            url+="Slug="+entity.getSlug()+".webp";
        }else{
            url+="Id="+entity.getId();
        }

        return MultimediaDto.builder()
                .id(entity.getId())
                .name(entity.getFileName())
                .mediaType(entity.getMediaType())
                .isDefault(entity.getIsDef())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .documentFormat(entity.getDocumentFormat())
                .category(MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(entity.getCategory()))
                .url(url)
                .isDefault(entity.getIsDef())
                .description(entity.getDescription())
                .extension(entity.getExtension())
                .createdDate(entity.getCreatedDate())
                .updatedDate(entity.getUpdatedDate())
                .isDeleted(entity.isDeleted())
                .build();
    }
    public static List<MultimediaDto> toDto(List<MultimediaEntity> entity) {
        if(entity==null)return null;
        return entity.stream().filter(o->!o.isDeleted()).map(MultimediaConvertor::toDto).collect(Collectors.toList());
    }

}
