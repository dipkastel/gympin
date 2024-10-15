package com.notrika.gympin.common.support.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SupportDto extends BaseDtoWithCreateUpdate<SupportDto> {

    @JsonProperty("Messages")
    private List<SupportMessageDto> messages;

    @JsonProperty("Status")
    private SupportStatus status;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("UnreadCount")
    private Long unreadCount;

}
