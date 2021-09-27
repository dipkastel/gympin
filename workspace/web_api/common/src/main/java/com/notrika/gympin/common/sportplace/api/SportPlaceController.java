package com.notrika.gympin.common.sportplace.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface SportPlaceController extends BaseController<SportPlaceParam, SportPlaceDto> {

}
