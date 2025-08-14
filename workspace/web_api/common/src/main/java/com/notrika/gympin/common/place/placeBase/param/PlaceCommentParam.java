package com.notrika.gympin.common.place.placeBase.param;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.enums.PlaceCommentStatusEnum;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class PlaceCommentParam extends BaseParam<PlaceCommentParam> {

    @JsonProperty("Comment")
    private String Comment;

    @JsonProperty("PlaceId")
    private Long placeId;

    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("Status")
    private PlaceCommentStatusEnum status;

    @JsonProperty("ParentId")
    private Long parentId;


}
