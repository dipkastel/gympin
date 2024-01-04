package com.notrika.gympin.common.util._base.base;

import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import lombok.NonNull;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BaseService<I extends BaseParam, O extends BaseDto, F extends BaseQuery> {

    O add(@NonNull I i);

    O update(@NonNull I i);

    O delete(@NonNull I i);

    List<O> getAll(BasePagedParam pagingParam);

    O getById(long id);

    Page<O> query(F query);


}
