package com.notrika.gympin.domain;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.persistence.entity.BaseEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public abstract class AbstractBaseService<I extends BaseParam<?>,O extends BaseDto<?>,ET extends BaseEntity> implements BaseService<I, O> {

    @Override
    public final List<O> getAll(BasePagedParam pagingParam) {
        Pageable pageable = extractPagingParams(pagingParam);
        return convertToDtos(getAll(pageable));
    }

    public Pageable extractPagingParams(BasePagedParam pagingParam){
        return PageRequest.of(pagingParam.getPage(), pagingParam.getSize());
    }

    public abstract List<ET> getAll(Pageable pageable);

    public abstract List<O> convertToDtos(List<ET> entities);

}
