package com.notrika.gympin.common.comment.gate.param;

import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gate.param.GateParam;
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
public class CommentGateParam extends BaseParam<CommentGateParam> {

    private GateParam gate;

    private String comment;

}
