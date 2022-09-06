package com.notrika.gympin.common.android.gympin.layout.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;

import java.util.List;

public interface MainPageLayoutItemService extends BaseService<MainPageLayoutItemParam, MainPageLayoutItemDto, BaseFilter<?>> {

    List<MainPageLayoutItemDto> mainPage();

    //    MainPageLayoutChildItemDto addMainPageChildItem(MainPageLayoutChildItemParam childItemParam);
    //
    //    MainPageLayoutCollectionDto createMainPageLayoutCollection(List<MainPageLayoutItemParam> mainPageLayoutItemParamList);
}
