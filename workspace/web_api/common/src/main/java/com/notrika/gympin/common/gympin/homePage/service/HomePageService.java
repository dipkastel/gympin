package com.notrika.gympin.common.gympin.homePage.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDeadendDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDestinationDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageItemDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageTypeDto;
import com.notrika.gympin.common.gympin.homePage.param.HomePageDestinationParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageItemParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageTypeParam;
import com.notrika.gympin.common.gympin.homePage.query.HomePageQuery;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HomePageService extends BaseService<HomePageItemParam, HomePageDeadendDto, HomePageQuery> {
    HomePageItemDto getByHomeList(Long Id);
    List<HomePageTypeDto> getAllTypes(Pageable pageable);
    HomePageTypeDto addType(HomePageTypeParam param);
    HomePageTypeDto deleteType(HomePageTypeParam param);
    List<HomePageDestinationDto> getAllDestinations(Pageable pageable);
    HomePageDestinationDto addDestination(HomePageDestinationParam param);
    HomePageDestinationDto deleteDestination(HomePageDestinationParam param);
}
