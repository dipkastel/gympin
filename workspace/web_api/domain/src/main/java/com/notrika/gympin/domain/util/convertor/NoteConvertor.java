package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class NoteConvertor {

    public static NoteDto toDto(ManageNoteEntity entity) {
        NoteDto dto = NoteDto.builder()
                .id(entity.getId())
                .isToDo(entity.getIsToDo())
                .text(entity.getText())
                .type(entity.getType())
                .corporate(CorporateConvertor.toDto(entity.getCorporate()))
                .placeDto(PlaceConvertor.toSimpleDto(entity.getPlace()))
                .user(UserConvertor.toDtoSimple(entity.getUser()))
                .invoice(InvoiceConvertor.toDto(entity.getInvoice()))
                .purchased(PurchasedConvertor.ToDto(entity.getPurchased()))
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }


    public static SimpleNoteDto toSimpleDto(ManageNoteEntity entity) {
        SimpleNoteDto dto = SimpleNoteDto.builder()
                .id(entity.getId())
                .isToDo(entity.getIsToDo())
                .text(entity.getText())
                .type(entity.getType())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }

    public static List<SimpleNoteDto> convertToSimpleDtos(List<ManageNoteEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(NoteConvertor::toSimpleDto).collect(Collectors.toList());
    }
}
