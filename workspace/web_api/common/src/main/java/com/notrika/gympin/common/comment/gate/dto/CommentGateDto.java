package com.notrika.gympin.common.comment.gate.dto;

import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class CommentGateDto extends BaseDtoWithCreateUpdate<CommentGateDto> {

    private GateDto gate;

    private String comment;

    private UserDto user;

}
