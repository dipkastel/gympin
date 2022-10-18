package com.notrika.gympin.common.comment.place.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.location.param.PlaceParam;
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
public class CommentPlaceParam extends BaseParam<CommentPlaceParam> {

    private PlaceParam place;

    private String comment;

}
