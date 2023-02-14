package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class UserRoleInfoDto  {

    @JsonProperty("Level")
    private int level ;
    @JsonProperty("Value")
    private String value ;
    @JsonProperty("Name")
    private String name ;

}
