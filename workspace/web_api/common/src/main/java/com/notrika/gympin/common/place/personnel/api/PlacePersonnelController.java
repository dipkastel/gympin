package com.notrika.gympin.common.place.personnel.api;

import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelBuyableAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlacePersonnelController extends BaseController<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>> {

    ResponseEntity<List<PlacePersonnelDto>> getPersonnelByPlace(PlaceParam placeParam);

    ResponseEntity<List<PlacePersonnelDto>> getPersonnelByUser(UserParam placeParam);

    ResponseEntity<List<PlacePersonnelAccessDto>> getUserPlaceAccess(Long placeId,Long userId);

    ResponseEntity<List<PlacePersonnelBuyableAccessDto>> getUserPlaceBuyableAccess(Long placeId, Long userId);

    ResponseEntity<PlacePersonnelDto> updatePersonnelCommissionFee(PlacePersonnelParam param);

    ResponseEntity<List<PlacePersonnelAccessDto>> updatePersonnelAccess(List<PlacePersonnelAccessParam> param);

    ResponseEntity<List<PlacePersonnelDto>> getPlaceBeneficiaries(Long placeId);

    ResponseEntity<List<PlacePersonnelBuyableAccessDto>> updatePersonnelBuyableAccess(List<PlacePersonnelBuyableAccessParam> param);

    ResponseEntity<PlacePersonnelDto> addRole(PlacePersonnelParam param);

    ResponseEntity<PlacePersonnelDto> deleteRole(PlacePersonnelParam param);
}
