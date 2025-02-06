package com.notrika.gympin.common.settings.tag.service;

import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.common.settings.tag.param.TagParam;
import com.notrika.gympin.common.settings.tag.query.TagQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import lombok.NonNull;

import java.util.List;

public interface TagService extends BaseService<TagParam, TagDto, TagQuery> {

    List<TagDto> addToPlace(TagParam tagParam);
    List<TagDto> removeFromPlace(TagParam tagParam);
    List<TagDto> getPlaceTags(Long placeId);


}
