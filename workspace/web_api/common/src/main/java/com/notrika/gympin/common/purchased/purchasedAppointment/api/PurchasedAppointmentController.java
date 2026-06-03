package com.notrika.gympin.common.purchased.purchasedAppointment.api;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.dto.PurchasedAppointmentDto;
import com.notrika.gympin.common.purchased.purchasedAppointment.param.PurchasedAppointmentParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.query.PurchasedAppointmentQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface PurchasedAppointmentController extends BaseController<PurchasedAppointmentParam, PurchasedAppointmentDto, PurchasedAppointmentQuery> {


    //tickets
    ResponseEntity<List<PurchasedAppointmentDto>> getUserAppointmentsByPlace(UserPlacePurchasedParam param) throws Exception;
    ResponseEntity<List<PurchasedAppointmentDto>> getActiveAppointmentsOfPlace(Long placeId);
    ResponseEntity<List<PurchasedAppointmentDto>> getPlaceAppointments(Long placeId);
    ResponseEntity<List<PurchasedAppointmentDto>> getByUser(UserParam userParam);
    ResponseEntity<PurchasedAppointmentDto> getPurchasedByKey(String key);
    ResponseEntity<Long> getPlaceSellsAppointmentCount(Long placeId);


    //ticketAction
    ResponseEntity<PurchasedAppointmentDto> updateStatus(PurchasedAppointmentParam param) throws Exception;
    ResponseEntity<PurchasedAppointmentDto> refundTicket(@RequestBody PurchasedAppointmentParam param) throws Exception;


}
