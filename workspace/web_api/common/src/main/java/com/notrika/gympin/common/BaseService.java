package com.notrika.gympin.common;

import lombok.NonNull;

import java.util.List;

public interface BaseService<I extends BaseParam<?>, O extends BaseDto<?>> {

    O add(@NonNull I i);

    O update(@NonNull I i);

    O delete(@NonNull I i);

    List<O> getAll(BasePagedParam pagingParam);

    O getById(long id);

}
