package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface MultimediaService {

    boolean storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException;

    boolean addImage(MultimediaStoreParam multimediaStoreParam) throws IOException;

    boolean addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException;

    boolean addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException;

    InputStream loadFileAsResource(MultimediaRetrieveParam multimediaParam) throws Exception;

    Long getMultimediaIdByFileName(String fileName);

    InputStream getById(MultimediaRetrieveParam multimediaParam) throws Exception;

    List<InputStream> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException;

    List<Long> getAllId();

    List<String> getAllName();

}
