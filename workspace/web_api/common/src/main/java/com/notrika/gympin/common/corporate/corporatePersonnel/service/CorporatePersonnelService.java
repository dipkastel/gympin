package com.notrika.gympin.common.corporate.corporatePersonnel.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCategoryDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;

import java.util.List;

public interface CorporatePersonnelService extends BaseService<CorporatePersonnelParam, CorporatePersonnelDto, BaseQuery<?>> {

    List<CorporatePersonnelDto> getPersonnelByCorporate(CorporateParam corporateParam);
    List<CorporatePersonnelDto> getByUserid(Long userId);
    List<CorporatePersonnelDto> getOwnedByUserid(Long userId);


}
