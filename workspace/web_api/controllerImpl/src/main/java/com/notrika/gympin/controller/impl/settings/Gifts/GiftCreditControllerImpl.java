package com.notrika.gympin.controller.impl.settings.Gifts;

import com.notrika.gympin.common.settings.gifts.api.GiftCreditController;
import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.gifts.param.GiftCreditParam;
import com.notrika.gympin.common.settings.gifts.query.GiftCreditQuery;
import com.notrika.gympin.common.settings.gifts.service.GiftCreditService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/giftCredit")
public class GiftCreditControllerImpl implements GiftCreditController {

    @Autowired
    private GiftCreditService giftCreditService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GiftCreditDto> add(GiftCreditParam param) {
        return ResponseEntity.ok(giftCreditService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GiftCreditDto> update(GiftCreditParam param) {
        return ResponseEntity.ok(giftCreditService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GiftCreditDto> delete(GiftCreditParam param) {
        return ResponseEntity.ok(giftCreditService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<GiftCreditDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(giftCreditService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<GiftCreditDto> getById(Long id) {
        return ResponseEntity.ok(giftCreditService.getById(id));
    }

    @Override
    public ResponseEntity<Page<GiftCreditDto>> query(GiftCreditQuery filter) {
        return ResponseEntity.ok(giftCreditService.query(filter));
    }


    @Override
    @GetMapping("checkStatus")
    public ResponseEntity<GiftCreditDto> getByCode(String code) {
        return ResponseEntity.ok(giftCreditService.getByCode(code));
    }

    @Override
    @PostMapping("claimGift")
    public ResponseEntity<GiftCreditDto> claimGift(GiftCreditParam param) throws Exception {
        return ResponseEntity.ok(giftCreditService.claimGiftCredit(param));
    }
}
