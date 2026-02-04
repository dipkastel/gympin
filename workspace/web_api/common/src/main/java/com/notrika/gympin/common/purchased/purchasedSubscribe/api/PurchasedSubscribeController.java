package com.notrika.gympin.common.purchased.purchasedSubscribe.api;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.*;
import com.notrika.gympin.common.purchased.purchasedSubscribe.query.PurchasedSubscribeQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface PurchasedSubscribeController extends BaseController<PurchasedSubscribeParam, PurchasedSubscribeDto, PurchasedSubscribeQuery> {


    //tickets
    ResponseEntity<List<PurchasedSubscribeDto>> getUserEnteredSubscribe(Long placeId);
    ResponseEntity<List<PurchasedSubscribeDto>> getUserSubscribesByPlace(UserPlacePurchasedParam param) throws Exception;
    ResponseEntity<List<PurchasedSubscribeDto>> getActiveSubscribesOfPlace(Long placeId);
    ResponseEntity<List<PurchasedSubscribeDto>> getPlaceSubscribes(Long placeId);
    ResponseEntity<List<PurchasedSubscribeDto>> getByUser(UserParam userParam);
    ResponseEntity<PurchasedSubscribeDto> getPurchasedByKey(String key);
    ResponseEntity<Long> getPlaceSellsSubscribesCount(Long placeId);


        //ticketAction
    ResponseEntity<Boolean> increaseExpireDate(IncreaseExpireParam param) throws Exception;
    ResponseEntity<PurchasedSubscribeDto> updateStatus(PurchasedSubscribeParam param) throws Exception;
    ResponseEntity<PurchasedSubscribeDto> refundTicket(@RequestBody PurchasedSubscribeParam param) throws Exception;

    //messages
    ResponseEntity<PurchasedSubscribeScannedDto> addEntryMessage(EntryMessageParam param);
    ResponseEntity<Boolean> deleteEntryMessage(Long messageId);

    //enter
    ResponseEntity<PurchasedSubscribeDto> addEnterToSubscribe(PurchasedSubscribeParam subscribe) throws Exception;
    ResponseEntity<List<PurchasedSubscribeDto>> getEnterRequestedSubscribe(Long placeId);
    ResponseEntity<Boolean> acceptEnterRequested(PurchasedSubscribeParam param) throws Exception;
    ResponseEntity<Boolean> enterRequest(PurchasedSubscribeParam param) throws Exception;
    ResponseEntity<Boolean> exitUserOfPlace(Long id) throws Exception;
    ResponseEntity<Boolean> exitRequest(Long Id) throws Exception;
}
