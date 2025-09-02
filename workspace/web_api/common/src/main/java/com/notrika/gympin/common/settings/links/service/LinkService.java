package com.notrika.gympin.common.settings.links.service;

import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.common.settings.links.param.LinkParam;
import com.notrika.gympin.common.settings.links.query.LinkQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

public interface LinkService extends BaseService<LinkParam, LinkDto, LinkQuery> {


    LinkDto getByCode(String code);

}
