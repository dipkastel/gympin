package com.notrika.gympin.common;

import java.util.List;

public interface BaseService<I extends BaseParam<?>, O extends BaseDto<?>> {

    O add(I i);

    O update(I i);

    O delete(I i);

    List<O> getAll();

    O getById(long id);

}
