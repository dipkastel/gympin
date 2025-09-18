package com.notrika.gympin.common.socket.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class ChatDto extends BaseDtoWithCreate<ChatDto> {

    @JsonProperty("Message")
    public String message;

    @JsonProperty("Sender")
    public String sender;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("ChatId")
    public String chatId;

    @JsonProperty("DriverId")
    public String driverId;

    @JsonProperty("AppName")
    public String appName;

    @JsonProperty("UserId")
    private Long userId;

}
