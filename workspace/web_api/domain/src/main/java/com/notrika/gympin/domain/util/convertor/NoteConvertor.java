package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;

public final class NoteConvertor {

    public static NoteDto toDto(ManageNoteEntity entity) {
        NoteDto dto = NoteDto.builder()
                .id(entity.getId())
                .isToDo(entity.getIsToDo())
                .text(entity.getText())
                .type(entity.getType())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }
}
