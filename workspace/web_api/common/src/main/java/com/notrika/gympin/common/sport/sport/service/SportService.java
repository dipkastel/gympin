package com.notrika.gympin.common.sport.sport.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.sport.sport.query.SportQuery;

import java.util.List;

public interface SportService extends BaseService<SportParam,SportDto, SportQuery> {

    List<MultimediaDto> getSportMultimedia(SportParam sportParam);

    Long getCount(BaseQuery<?> filter);
}
