package com.notrika.gympin.controller.impl.purchased.purchasedSubscribe;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.api.PurchasedSubscribeController;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.*;
import com.notrika.gympin.common.purchased.purchasedSubscribe.query.PurchasedSubscribeQuery;
import com.notrika.gympin.common.purchased.purchasedSubscribe.service.PurchasedSubscribeService;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchasedSubscribe")
public class PurchasedSubscribeControllerImpl implements PurchasedSubscribeController {

    @Autowired
    PurchasedSubscribeService purchasedSubscribeService;

    @Override
    public ResponseEntity<PurchasedSubscribeDto> add(PurchasedSubscribeParam purchasedSubscribeParam) {
        return ResponseEntity.ok(purchasedSubscribeService.add(purchasedSubscribeParam));
    }

    @Override
    public ResponseEntity<PurchasedSubscribeDto> update(PurchasedSubscribeParam purchasedSubscribeParam) {
        return ResponseEntity.ok(purchasedSubscribeService.update(purchasedSubscribeParam));
    }

    @Override
    public ResponseEntity<PurchasedSubscribeDto> delete(PurchasedSubscribeParam purchasedSubscribeParam) {
        return ResponseEntity.ok(purchasedSubscribeService.delete(purchasedSubscribeParam));
    }

    @Override
    public ResponseEntity<List<PurchasedSubscribeDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(purchasedSubscribeService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PurchasedSubscribeDto> getById(Long id) {
        return ResponseEntity.ok(purchasedSubscribeService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PurchasedSubscribeDto>> query(PurchasedSubscribeQuery param) {
        return ResponseEntity.ok(purchasedSubscribeService.query(param));
    }

    @Override
    @GetMapping("/getByUser")
    public ResponseEntity<List<PurchasedSubscribeDto>> getByUser(UserParam userParam) {
        return ResponseEntity.ok(purchasedSubscribeService.getByUser(userParam));
    }

    @Override
    @PostMapping("/acceptEnterRequested")
    public ResponseEntity<Boolean> acceptEnterRequested(@RequestBody PurchasedSubscribeParam param) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.acceptEnterRequested(param));
    }

    @Override
    @PostMapping("/getUserSubscribesByPlace")
    public ResponseEntity<List<PurchasedSubscribeDto>> getUserSubscribesByPlace(@RequestBody UserPlacePurchasedParam param) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.getUserSubscribesByPlace(param));
    }

    @Override
    @GetMapping("/getEnterRequested")
    public ResponseEntity<List<PurchasedSubscribeDto>> getEnterRequestedSubscribe(Long placeId) {
        return ResponseEntity.ok(purchasedSubscribeService.getEnterRequestedSubscribe(placeId));
    }

    @Override
    @GetMapping("/getUserEntered")
    public ResponseEntity<List<PurchasedSubscribeDto>> getUserEnteredSubscribe(Long placeId) {
        return ResponseEntity.ok(purchasedSubscribeService.getUserEnteredSubscribe(placeId));
    }

    @Override
    @GetMapping("/GetByKey")
    public ResponseEntity<PurchasedSubscribeDto> getPurchasedByKey(String key) {
        return ResponseEntity.ok(purchasedSubscribeService.getByKey(key));
    }

    @Override
    @PostMapping("/addEntryMessage")
    public ResponseEntity<PurchasedSubscribeScannedDto> addEntryMessage(@RequestBody EntryMessageParam param) {
        return ResponseEntity.ok(purchasedSubscribeService.addEntryMessage(param));
    }

    @Override
    @PutMapping("/deleteEntryMessage")
    public ResponseEntity<Boolean> deleteEntryMessage(Long messageId) {
        return ResponseEntity.ok(purchasedSubscribeService.deleteEntryMessage(messageId));
    }

    @Override
    @PostMapping("/addEnterToSubscribe")
    public ResponseEntity<PurchasedSubscribeDto> addEnterToSubscribe(@RequestBody PurchasedSubscribeParam subscribe) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.addEnterToSubscribe(subscribe));
    }


    @Override
    @GetMapping("/getActiveSubscribes")
    public ResponseEntity<List<PurchasedSubscribeDto>> getActiveSubscribesOfPlace(Long placeId) {
        return ResponseEntity.ok(purchasedSubscribeService.getActiveSubscribesOfPlace(placeId));
    }


    @Override
    @GetMapping("/getPlaceSubscribes")
    public ResponseEntity<List<PurchasedSubscribeDto>> getPlaceSubscribes(Long placeId) {
        return ResponseEntity.ok(purchasedSubscribeService.getPlaceSubscribes(placeId));
    }

    @Override
    @PostMapping("/enterRequest")
    public ResponseEntity<Boolean> enterRequest(@RequestBody PurchasedSubscribeParam param) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.enterRequest(param));
    }

    @Override
    @GetMapping("/exitRequest")
    public ResponseEntity<Boolean> exitRequest(Long id) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.exitRequest(id));
    }


    @Override
    @GetMapping("/exitUserOfPlace")
    public ResponseEntity<Boolean> exitUserOfPlace(Long id) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.exitUserOfPlace(id));
    }

    @Override
    @PostMapping("/increaseExpireDate")
    public ResponseEntity<Boolean> increaseExpireDate(@RequestBody IncreaseExpireParam param) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.increaseExpireDate(param));
    }

    @Override
    @PostMapping("/updateStatus")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PurchasedSubscribeDto> updateStatus(@RequestBody PurchasedSubscribeParam param) throws Exception {
        return ResponseEntity.ok(purchasedSubscribeService.updateStatus(param));
    }
}
