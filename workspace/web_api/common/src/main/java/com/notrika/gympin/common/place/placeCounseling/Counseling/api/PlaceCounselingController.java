package com.notrika.gympin.common.place.placeCounseling.Counseling.api;

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
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceCounselingController extends BaseController<CounselingParam, CounselingDto, CounselingQuery> {

    ResponseEntity<CounselingDto> changeStatus(@RequestBody CounselingParam place);

    ResponseEntity<List<CounselingDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<CounselingDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<List<ProficienciesDto>> getProficienciesOfCounseling(CounselingParam place);

    ResponseEntity<List<MultimediaDto>> getMultimedias(CounselingParam place);

    ResponseEntity<CounselingDto> getMyPlaceCounselingById(Long id);

    ResponseEntity<CounselingDto> addMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<CounselingDto> addMultimediaList(@RequestBody PlaceMultimediaListParam place);

    ResponseEntity<CounselingDto> setDefaultMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<CounselingDto> deleteMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<InviteCode> getPlaceInviteCode(CounselingParam placeParam);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(CounselingParam placeParam);

    ResponseEntity<CounselingDto> updateOrder(@RequestBody CounselingParam param);

    ResponseEntity<CounselingDto> updateContract(@RequestBody CounselingParam param);

    ResponseEntity<CounselingDto>  signContract(@RequestBody CounselingParam placeParam);

    ResponseEntity<Boolean> sendContractCode(@RequestBody PlaceContractSmsParam param);

}
