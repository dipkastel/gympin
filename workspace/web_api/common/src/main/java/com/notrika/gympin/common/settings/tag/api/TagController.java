package com.notrika.gympin.common.settings.tag.api;

import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.common.settings.tag.param.TagParam;
import com.notrika.gympin.common.settings.tag.query.TagQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TagController extends BaseController<TagParam, TagDto, TagQuery> {
    ResponseEntity<List<TagDto>> addToPlace(@RequestBody TagParam tagParam);
    ResponseEntity<List<TagDto>> removeFromPlace(@RequestBody TagParam tagParam);
    ResponseEntity<List<TagDto>> getPlaceTags(Long placeId);
}
