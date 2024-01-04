package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PagingConvertor {
    public static Pageable extractPagingParams(BasePagedParam pagingParam) {
        Sort sort = Sort.by((pagingParam.isDesc())?Sort.Order.desc(pagingParam.getOrderBy()):Sort.Order.asc(pagingParam.getOrderBy()));
        return PageRequest.of(pagingParam.getPage(), pagingParam.getSize(), sort);
    }
}
