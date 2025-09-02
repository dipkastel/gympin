package com.notrika.gympin.common.settings.links.api;

import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.common.settings.links.param.LinkParam;
import com.notrika.gympin.common.settings.links.query.LinkQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

public interface LinkController extends BaseController<LinkParam, LinkDto, LinkQuery> {

    ResponseEntity<LinkDto> getByCode(String code);

}
