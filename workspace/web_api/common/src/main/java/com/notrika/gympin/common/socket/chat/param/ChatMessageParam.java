package com.notrika.gympin.common.socket.chat.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreate;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ChatMessageParam extends BaseParam<ChatMessageParam> {

    @JsonProperty("Message")
    public String message;

    @JsonProperty("Sender")
    public String sender;

}
