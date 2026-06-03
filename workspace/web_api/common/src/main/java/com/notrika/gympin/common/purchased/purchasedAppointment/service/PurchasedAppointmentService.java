package com.notrika.gympin.common.purchased.purchasedAppointment.service;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.dto.PurchasedAppointmentDto;
import com.notrika.gympin.common.purchased.purchasedAppointment.param.PurchasedAppointmentParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.query.PurchasedAppointmentQuery;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.IncreaseExpireParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PurchasedAppointmentService extends BaseService<PurchasedAppointmentParam, PurchasedAppointmentDto, PurchasedAppointmentQuery> {


    //tickets
    List<PurchasedAppointmentDto> getUserAppointmentByPlace(UserPlacePurchasedParam param);
    List<PurchasedAppointmentDto> getActiveAppointmentOfPlace(Long placeId);
    List<PurchasedAppointmentDto> getPlaceAppointments(Long placeId);
    List<PurchasedAppointmentDto> getByUser(UserParam userParam);
    PurchasedAppointmentDto getByKey(String key);
    Long getPlaceSellsAppointmentsCount(Long placeId);

    //ticketAction
    PurchasedAppointmentDto updateStatus(PurchasedAppointmentParam param);
    PurchasedAppointmentDto refundTicket(PurchasedAppointmentParam param);


}
