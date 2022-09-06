package com.notrika.gympin.common.android.gympin.layout.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;

import java.util.List;

public interface MainPageLayoutCollectionService extends BaseService<MainPageLayoutCollectionParam, MainPageLayoutCollectionDto, BaseFilter<?>> {

    List<MainPageLayoutItemDto> mainPage(Long id);

}
