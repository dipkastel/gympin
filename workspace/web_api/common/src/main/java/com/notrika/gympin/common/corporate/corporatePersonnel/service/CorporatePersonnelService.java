package com.notrika.gympin.common.corporate.corporatePersonnel.service;

import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelFileParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.query.CorporatePersonnelQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;

import java.util.List;

public interface CorporatePersonnelService extends BaseService<CorporatePersonnelParam, CorporatePersonnelDto, CorporatePersonnelQuery> {

    List<CorporatePersonnelDto> getPersonnelByCorporate(CorporateParam corporateParam);
    List<CorporatePersonnelDto> getByUserid(Long userId);
    List<CorporatePersonnelDto> getOwnedByUserid(Long userId);
    List<CorporatePersonnelDto> addList(CorporatePersonnelFileParam param);
}
