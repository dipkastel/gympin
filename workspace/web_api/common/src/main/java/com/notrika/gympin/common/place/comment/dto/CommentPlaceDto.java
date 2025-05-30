package com.notrika.gympin.common.place.comment.dto;

import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class CommentPlaceDto extends BaseDto<CommentPlaceDto> {

    private PlaceGymDto place;

    private String comment;

}
