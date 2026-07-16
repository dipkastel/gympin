package com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.service;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto.CounselingProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.param.CounselingProficienciesParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;

import java.util.List;

public interface CounselingProficienciesService extends BaseService<CounselingProficienciesParam, CounselingProficienciesDto, BaseQuery<?>> {

    List<CounselingProficienciesDto> getCounselingProficiencies(CounselingParam param);
}
