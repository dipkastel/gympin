package com.notrika.gympin.common.sport.sport.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.sport.sport.query.SportQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SportController extends BaseController<SportParam,SportDto, SportQuery> {

    ResponseEntity<List<MultimediaDto>> getSportMultimedia(SportParam sportParam);

}
