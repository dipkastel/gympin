package com.notrika.gympin.common.socket.chat.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreate;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ChatMessageDto extends BaseDtoWithCreate<ChatMessageDto> {

    @JsonProperty("Message")
    public String message;

    @JsonProperty("Sender")
    public String sender;

}
