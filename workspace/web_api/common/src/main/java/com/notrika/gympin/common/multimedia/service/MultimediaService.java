package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;

import java.io.IOException;
import java.io.InputStream;

public interface MultimediaService {

    boolean storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException;

    InputStream loadFileAsResource(String fileName) throws Exception;
}
