package com.notrika.gympin.common.place.parts.personnel.api;

import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.parts.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.parts.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.parts.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.parts.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.parts.personnel.param.PlacePersonnelBuyableAccessParam;
import com.notrika.gympin.common.place.parts.personnel.param.PlacePersonnelParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlacePersonnelController extends BaseController<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>> {

    ResponseEntity<List<PlacePersonnelDto>> getPersonnelByPlace(PlaceGymParam placeParam);

    ResponseEntity<List<PlacePersonnelDto>> getPersonnelByUser(UserParam placeParam);
    ResponseEntity<List<PlacePersonnelDto>> getGymPersonnelByUser(UserParam placeParam);
    ResponseEntity<List<PlacePersonnelDto>> getCateringPersonnelByUser(UserParam placeParam);

    ResponseEntity<List<PlacePersonnelAccessDto>> getUserPlaceAccess(Long placeId,Long userId);

    ResponseEntity<PlacePersonnelDto> updatePersonnelCommissionFee(PlacePersonnelParam param);

    ResponseEntity<PlacePersonnelDto> updatePersonnelGetSms(PlacePersonnelParam param);

    ResponseEntity<List<PlacePersonnelAccessDto>> updatePersonnelAccess(List<PlacePersonnelAccessParam> param);

    ResponseEntity<List<PlacePersonnelDto>> getPlaceBeneficiaries(Long placeId);

    ResponseEntity<PlacePersonnelDto> addRole(PlacePersonnelParam param);

    ResponseEntity<PlacePersonnelDto> deleteRole(PlacePersonnelParam param);
}
