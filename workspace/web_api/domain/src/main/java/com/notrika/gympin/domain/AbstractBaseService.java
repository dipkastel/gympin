package com.notrika.gympin.domain;

import com.notrika.gympin.common.*;
import com.notrika.gympin.persistence.entity.BaseEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public abstract class AbstractBaseService<I extends BaseParam, O extends BaseDto, F extends BaseFilter, ET extends BaseEntity> implements BaseService<I, O, F> {

    public abstract ET add(ET entity);

    public abstract ET update(ET entity);

    public abstract ET delete(ET entity);

    public abstract ET getEntityById(long id);

    @Override
    public final List<O> getAll(BasePagedParam pagingParam) {
        Pageable pageable = extractPagingParams(pagingParam);
        return convertToDtos(getAll(pageable));
    }

    public Pageable extractPagingParams(BasePagedParam pagingParam) {
        return PageRequest.of(pagingParam.getPage(), pagingParam.getSize());
    }

    public abstract List<ET> getAll(Pageable pageable);

    public abstract List<O> convertToDtos(List<ET> entities);

    //    public abstract ET convertToEntity(I param);

//    public List<SearchCriteria> createSearchCriteria(){
//
//    }

    @Override
    public Long countSearch(F filter) {
        return null;
    }

    @Override
    public List<O> search(F filter) {
        return null;
    }

    @Override
    public Long countFilter(F filter) {
        return null;
    }

    @Override
    public List<O> filter(F filter) {
        return null;
    }
}
