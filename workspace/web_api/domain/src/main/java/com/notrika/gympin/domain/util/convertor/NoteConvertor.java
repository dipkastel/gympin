package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public final class NoteConvertor {

    public static NoteDto toDto(NoteEntity entity) {
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
