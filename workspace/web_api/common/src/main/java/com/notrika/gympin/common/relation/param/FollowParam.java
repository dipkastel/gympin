package com.notrika.gympin.common.relation.param;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class FollowParam extends BaseParam<UserParam> {

    @JsonProperty("Requester-User")
    private UserParam requesterUser;

    @JsonProperty("Requested-User")
    private UserParam requestedUser;

    @JsonIgnore
    private FollowingStatus status;

}
