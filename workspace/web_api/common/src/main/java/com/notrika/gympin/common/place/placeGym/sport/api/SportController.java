package com.notrika.gympin.common.place.placeGym.sport.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.place.placeGym.sport.param.SportParam;
import com.notrika.gympin.common.place.placeGym.sport.query.SportQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SportController extends BaseController<SportParam,SportDto, SportQuery> {


}
