package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class TagConvertor {

    public static TagDto toDto(ManageTagsEntity entity) {
        TagDto dto = TagDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .priority(entity.getPriority())
                .tagTypes(entity.getTagTypes())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        try {
            dto.setPlaceCount(entity.getPlaces().stream().count());
        }catch (Exception e){}
        return dto;
    }
}
