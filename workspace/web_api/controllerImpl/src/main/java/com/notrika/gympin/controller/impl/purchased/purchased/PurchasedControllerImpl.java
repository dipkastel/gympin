package com.notrika.gympin.controller.impl.purchased.purchased;

import com.notrika.gympin.common.purchased.purchased.api.PurchasedController;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.purchased.purchased.query.PurchasedQuery;
import com.notrika.gympin.common.purchased.purchased.service.PurchasedService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Purchased")
public class PurchasedControllerImpl implements PurchasedController {

    @Autowired
    private PurchasedService purchasedService;

    @Override
    public ResponseEntity<PurchasedDto> add(PurchasedParam param) {
        return ResponseEntity.ok(purchasedService.add(param));
    }

    @Override
    public ResponseEntity<PurchasedDto> update(PurchasedParam param) {
        return ResponseEntity.ok(purchasedService.update(param));
    }

    @Override
    public ResponseEntity<PurchasedDto> delete(PurchasedParam param) {
        return ResponseEntity.ok(purchasedService.delete(param));
    }

    @Override
    public ResponseEntity<List<PurchasedDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(purchasedService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PurchasedDto> getById(Long id) {
        return ResponseEntity.ok(purchasedService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PurchasedDto>> query(PurchasedQuery filter) {
        return ResponseEntity.ok(purchasedService.query(filter));
    }
}
