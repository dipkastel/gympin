package com.notrika.gympin.common.gympin.homePage.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDeadendDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDestinationDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageItemDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageTypeDto;
import com.notrika.gympin.common.gympin.homePage.param.HomePageDestinationParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageItemParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageTypeParam;
import com.notrika.gympin.common.gympin.homePage.query.HomePageQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
