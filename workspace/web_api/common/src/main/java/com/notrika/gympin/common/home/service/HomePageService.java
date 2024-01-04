package com.notrika.gympin.common.home.service;

import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.home.dto.HomePageDeadendDto;
import com.notrika.gympin.common.home.dto.HomePageDestinationDto;
import com.notrika.gympin.common.home.dto.HomePageItemDto;
import com.notrika.gympin.common.home.dto.HomePageTypeDto;
import com.notrika.gympin.common.home.param.HomePageDestinationParam;
import com.notrika.gympin.common.home.param.HomePageItemParam;
import com.notrika.gympin.common.home.param.HomePageTypeParam;
import com.notrika.gympin.common.home.query.HomePageQuery;
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
