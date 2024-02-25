package com.notrika.gympin.common.place.comment.param;

import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
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