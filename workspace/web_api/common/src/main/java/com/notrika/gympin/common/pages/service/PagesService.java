package com.notrika.gympin.common.pages.service;

import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.pages.dto.PagesDeadendDto;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
import com.notrika.gympin.common.pages.query.PagesQuery;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PagesService extends BaseService<PagesItemParam, PagesDeadendDto, PagesQuery> {
    List<PagesItemDto> getHomeBySettingKeyOrPageId(String AppName, Long PageId);
    List<PagesItemDto> getPageByPageData(String data);
    Void clearCash();
    PagesDeadendDto updatePriority(PagesItemParam pagesParam);
    List<PagesTypeDto> getAllTypes(Pageable pageable);
    PagesTypeDto addType(PagesTypeParam param);
    PagesTypeDto UpdateType(PagesTypeParam param);
    PagesTypeDto deleteType(PagesTypeParam param);
}
