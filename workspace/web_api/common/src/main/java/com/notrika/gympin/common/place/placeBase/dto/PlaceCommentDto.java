package com.notrika.gympin.common.place.placeBase.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.enums.PlaceCommentStatusEnum;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class PlaceCommentDto extends BaseDtoWithCreateUpdate<PlaceCommentDto> {


    @JsonProperty("Comment")
    private String Comment;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Status")
    private PlaceCommentStatusEnum status;

    @JsonProperty("Childes")
    private List<PlaceCommentDto> childes;
}
