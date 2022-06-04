package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface MultimediaService {

    Long storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException;

    Long addImage(MultimediaStoreParam multimediaStoreParam) throws IOException;

    Long addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException;

    Long addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException;

    InputStream loadFileAsResource(MultimediaRetrieveParam multimediaParam) throws Exception;

    Long getMultimediaIdByFileName(String fileName);

    InputStream getById(MultimediaRetrieveParam param) throws Exception;

    InputStream getByName(MultimediaRetrieveParam param) throws Exception;

    List<InputStream> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException;

    List<Long> getAllId();

    List<String> getAllName();

    List<MultimediaDto> getAll();

    Long update(MultimediaStoreParam multimediaStoreParam);

    boolean delete(Long id);

}
