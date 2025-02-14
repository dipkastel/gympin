package com.notrika.gympin.common.settings.gifts.api;

import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.gifts.param.GiftCreditParam;
import com.notrika.gympin.common.settings.gifts.query.GiftCreditQuery;
import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.common.settings.tag.query.TagQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface GiftCreditController extends BaseController<GiftCreditParam, GiftCreditDto, GiftCreditQuery> {


    ResponseEntity<GiftCreditDto> getByCode(String code);

    ResponseEntity<GiftCreditDto> claimGift(@RequestBody GiftCreditParam param) throws Exception;

}
