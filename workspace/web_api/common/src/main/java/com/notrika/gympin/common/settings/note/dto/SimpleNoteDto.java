package com.notrika.gympin.common.settings.note.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SimpleNoteDto extends BaseDtoWithCreateUpdate<SimpleNoteDto> {


    @JsonProperty("Text")
    private String text;

    @JsonProperty("Type")
    private NoteType type;

    @JsonProperty("IsToDo")
    private Boolean isToDo;
}
