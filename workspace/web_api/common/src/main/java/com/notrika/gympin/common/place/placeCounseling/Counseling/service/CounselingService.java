package com.notrika.gympin.common.place.placeCounseling.Counseling.service;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCounseling.Counseling.dto.CounselingDto;
import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.Counseling.query.CounselingQuery;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface CounselingService extends BaseService<CounselingParam, CounselingDto, CounselingQuery> {

    CounselingDto changeStatus(CounselingParam param);
    List<CounselingDto> getPlacesByLocation(LocationParam param);
    List<CounselingDto> getPlacesByUser(UserParam userParam);
    List<MultimediaDto> getMultimedias(CounselingParam param);
    CounselingDto addMultimedia(PlaceMultimediaParam param);
    CounselingDto addMultimediaList(PlaceMultimediaListParam param);
    CounselingDto removeMultimedia(PlaceMultimediaParam param);
    InviteCode getPlaceInviteCode(CounselingParam param);
    List<TicketBuyableDto> getBuyableByPlace(CounselingParam param);
    CounselingDto updateOrder(CounselingParam placeParam);
    CounselingDto updateContract(CounselingParam placeParam);
    CounselingDto signContract(CounselingParam placeParam);
    Boolean sendContractCode(PlaceContractSmsParam param);
    CounselingDto setDefaultMultimedia(PlaceMultimediaParam param);
    List<ProficienciesDto> getProficienciesOfCounseling(CounselingParam place);
}
