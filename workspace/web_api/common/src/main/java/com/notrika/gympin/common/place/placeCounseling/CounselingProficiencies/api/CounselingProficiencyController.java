package com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.api;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto.CounselingProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.param.CounselingProficienciesParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface CounselingProficiencyController extends BaseController<CounselingProficienciesParam, CounselingProficienciesDto, BaseQuery<?>> {

    ResponseEntity<List<CounselingProficienciesDto>> getCounselingProficiencies(CounselingParam counselingParam);

}
