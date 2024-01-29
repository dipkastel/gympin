package com.notrika.gympin.common.user.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class RoleEnumDto extends BaseDto<RoleEnum> {

    @JsonProperty("Role")
    private RoleEnum role;

    @JsonProperty("RoleName")
    private String roleName;


}
