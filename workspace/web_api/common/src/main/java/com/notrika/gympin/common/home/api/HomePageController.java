package com.notrika.gympin.common.home.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.home.dto.HomePageDeadendDto;
import com.notrika.gympin.common.home.dto.HomePageDestinationDto;
import com.notrika.gympin.common.home.dto.HomePageItemDto;
import com.notrika.gympin.common.home.dto.HomePageTypeDto;
import com.notrika.gympin.common.home.param.HomePageDestinationParam;
import com.notrika.gympin.common.home.param.HomePageItemParam;
import com.notrika.gympin.common.home.param.HomePageTypeParam;
import com.notrika.gympin.common.home.query.HomePageQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface HomePageController extends BaseController<HomePageItemParam, HomePageDeadendDto, HomePageQuery> {

    ResponseEntity<HomePageItemDto> getHome(Long id);

    ResponseEntity<List<HomePageTypeDto>> getAllTypes(Pageable pageable);
    ResponseEntity<HomePageTypeDto> addType(@RequestBody HomePageTypeParam param);
    ResponseEntity<HomePageTypeDto> deleteType(HomePageTypeParam param);

    //destination
    ResponseEntity<List<HomePageDestinationDto>> getAllDestinations(Pageable pageable);
    ResponseEntity<HomePageDestinationDto> addDestination(@RequestBody HomePageDestinationParam param);
    ResponseEntity<HomePageDestinationDto> deleteDestination(HomePageDestinationParam param);
}
