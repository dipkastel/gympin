package com.notrika.gympin.common.relation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.common.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FollowDto extends BaseDto<UserDto> {

    @JsonProperty("requester-user")
    private UserDto requesterUser;

    @JsonProperty("Requested-User")
    private UserDto requestedUser;

    @JsonProperty("Status")
    private FollowingStatus status;

}
