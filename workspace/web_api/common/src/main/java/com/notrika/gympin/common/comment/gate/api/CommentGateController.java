package com.notrika.gympin.common.comment.gate.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.comment.gate.dto.CommentGateDto;
import com.notrika.gympin.common.comment.gate.param.CommentGateParam;

public interface CommentGateController extends BaseController<CommentGateParam, CommentGateDto, BaseFilter<?>> {
}
