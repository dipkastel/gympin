package com.notrika.gympin.common.sport.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface SportService extends BaseService<SportParam,SportDto, BaseQuery<?>> {

    List<MultimediaDto> getSportMultimedia(SportParam sportParam);

    Long getCount(BaseQuery<?> filter);
}
