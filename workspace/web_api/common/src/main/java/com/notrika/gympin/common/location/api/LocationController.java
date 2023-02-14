package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.query.LocationQuery;
import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.note.param.NoteParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LocationController extends BaseController<LocationParam, LocationDto, LocationQuery> {



}
