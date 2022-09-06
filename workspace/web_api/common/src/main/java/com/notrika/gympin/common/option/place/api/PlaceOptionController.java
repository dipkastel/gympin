package com.notrika.gympin.common.option.place.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceOptionController extends BaseController<PlaceOptionParam,PlaceOptionDto, BaseFilter<?>> {

}
