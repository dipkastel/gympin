package com.notrika.gympin.common;

import com.notrika.gympin.common.primitive.param.LongParam;

import java.util.Collection;
import java.util.List;

public interface BaseService<I extends BaseParam<?>,O extends BaseDto<?>> {

    O add(I i);

    O update(I i);

    void delete(I i);

    List<O> getAll();

    O getById(LongParam longParam);

}
