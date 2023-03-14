package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.filter.GateFilter;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.query.MultimediaQuery;

import java.io.InputStream;
import java.util.List;

public interface MultimediaService extends BaseService<MultimediaStoreParam, MultimediaDto, MultimediaQuery> {

    InputStream getById(MultimediaRetrieveParam multimediaStoreParam) throws Exception;

    List<MultimediaDto> getAll(BasePagedParam pageable, MediaType mediaType);


    boolean delete(Long id);

}
