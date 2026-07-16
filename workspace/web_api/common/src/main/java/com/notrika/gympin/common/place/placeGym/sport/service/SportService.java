package com.notrika.gympin.common.place.placeGym.sport.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.place.placeGym.sport.param.SportParam;
import com.notrika.gympin.common.place.placeGym.sport.query.SportQuery;

import java.util.List;

public interface SportService extends BaseService<SportParam,SportDto, SportQuery> {


    Long getCount(BaseQuery<?> filter);
}
