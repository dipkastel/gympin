package com.notrika.gympin.common.user.relation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.user.relation.enums.FollowingStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class FollowDto extends BaseDto<UserDto> {

    @JsonProperty("requester-user")
    private UserDto requesterUser;

    @JsonProperty("Requested-User")
    private UserDto requestedUser;

    @JsonProperty("Status")
    private FollowingStatus status;

}
