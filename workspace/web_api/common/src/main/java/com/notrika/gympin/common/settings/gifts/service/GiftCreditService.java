package com.notrika.gympin.common.settings.gifts.service;

import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.gifts.param.GiftCreditParam;
import com.notrika.gympin.common.settings.gifts.query.GiftCreditQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import lombok.NonNull;

public interface GiftCreditService extends BaseService<GiftCreditParam, GiftCreditDto, GiftCreditQuery> {

    GiftCreditDto getByCode(String code);

    GiftCreditDto claimGiftCredit(GiftCreditParam giftCreditParam) throws Exception;
}
