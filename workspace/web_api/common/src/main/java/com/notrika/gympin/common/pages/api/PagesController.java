package com.notrika.gympin.common.pages.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.pages.dto.PagesDeadendDto;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
import com.notrika.gympin.common.pages.query.PagesQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PagesController extends BaseController<PagesItemParam, PagesDeadendDto, PagesQuery> {

    ResponseEntity<List<PagesItemDto>> getHome(String SettingKey,Long PageId);
    ResponseEntity<List<PagesItemDto>> getPageByData(String Data);
    ResponseEntity<Void> clearCash();
    ResponseEntity<PagesDeadendDto> updatePriority(@RequestBody PagesItemParam pagesParam);

    ResponseEntity<List<PagesTypeDto>> getAllTypes(Pageable pageable);
    ResponseEntity<PagesTypeDto> addType(@RequestBody PagesTypeParam param);
    ResponseEntity<PagesTypeDto> UpdateType(@RequestBody PagesTypeParam param);
    ResponseEntity<PagesTypeDto> deleteType(PagesTypeParam param);
}
