package com.notrika.gympin.common.multimedia.service;

import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import org.springframework.core.io.Resource;

import java.io.IOException;

public interface MultimediaService {
    boolean storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException;

    Resource loadFileAsResource(String fileName) throws Exception;
}
