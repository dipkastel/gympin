package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;

import java.io.InputStream;
import java.util.List;

public interface MultimediaService {

    MultimediaDto add(MultimediaStoreParam multimediaStoreParam) throws Exception;

    MultimediaDto update(MultimediaStoreParam multimediaStoreParam);

    InputStream getById(MultimediaRetrieveParam multimediaStoreParam) throws Exception;

    List<MultimediaDto> getAll(BasePagedParam pageable, MediaType mediaType);


    boolean delete(Long id);

}
