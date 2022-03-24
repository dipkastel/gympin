package com.notrika.gympin.common.android.gympin.layout.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MainPageLayoutCollectionController extends BaseController<MainPageLayoutCollectionParam, MainPageLayoutCollectionDto> {

    ResponseEntity<List<MainPageLayoutItemDto>> mainPage(long id);

}
