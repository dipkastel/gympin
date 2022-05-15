package com.notrika.gympin.common.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseEventParam<T> extends BaseParam<T> {

    @JsonProperty("Sport")
    @NonNull
    private SportParam sport;

    @JsonProperty("Title")
    @NonNull
    private String title;

    @JsonProperty("Description")
    @NonNull
    private String description;

    @JsonProperty("Participants")
    private List<UserParam> participants;

    @JsonProperty("StartDate")
    @NonNull
    private Date startDate;

    //    @JsonProperty("Owner")
    //    private UserParam owner;
}
