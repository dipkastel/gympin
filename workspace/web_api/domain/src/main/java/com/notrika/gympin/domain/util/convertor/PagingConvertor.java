package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.comment.gate.dto.CommentGateDto;
import com.notrika.gympin.common.comment.gate.param.CommentGateParam;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.domain.gate.GateServiceImpl;
import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PagingConvertor {
    public static Pageable extractPagingParams(BasePagedParam pagingParam) {
        Sort sort = Sort.by((pagingParam.isDesc())?Sort.Order.desc(pagingParam.getOrderBy()):Sort.Order.asc(pagingParam.getOrderBy()));
        return PageRequest.of(pagingParam.getPage(), pagingParam.getSize(), sort);
    }
}
