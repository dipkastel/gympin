package com.notrika.gympin.common.purchased.purchasedSubscribe.service;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.*;
import com.notrika.gympin.common.purchased.purchasedSubscribe.query.PurchasedSubscribeQuery;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface PurchasedSubscribeService extends BaseService<PurchasedSubscribeParam, PurchasedSubscribeDto, PurchasedSubscribeQuery> {


    PurchasedSubscribeScannedDto scannedSubscribe(PurchasedSubscribeParam param) throws Exception;

    //tickets
    List<PurchasedSubscribeDto> getUserEnteredSubscribe(Long placeId);
    List<PurchasedSubscribeDto> getUserSubscribesByPlace(UserPlacePurchasedParam param);
    List<PurchasedSubscribeDto> getActiveSubscribesOfPlace(Long placeId);
    List<PurchasedSubscribeDto> getByUser(UserParam userParam);

    //ticketAction
    Boolean increaseExpireDate(IncreaseExpireParam param);
    PurchasedSubscribeDto updateStatus(PurchasedSubscribeParam param);

    //messages
    PurchasedSubscribeScannedDto addEntryMessage(EntryMessageParam param);
    Boolean deleteEntryMessage(Long messageId);

    //enter
    PurchasedSubscribeDto addEnterToSubscribe(PurchasedSubscribeParam subscribe);
    List<PurchasedSubscribeDto> getEnterRequestedSubscribe(Long placeId);
    Boolean acceptEnterRequested(PurchasedSubscribeParam param) throws Exception;
    Boolean enterRequest(PurchasedSubscribeParam param);
    Boolean exitUserOfPlace(Long id);
    Boolean exitRequest(Long id);








}
