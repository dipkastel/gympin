package com.notrika.gympin.common.place.option.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OptionOfPlaceController extends BaseController<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>> {

    ResponseEntity<List<OptionOfPlaceDto>> getByPlaceId(PlaceParam placeParam);

}
