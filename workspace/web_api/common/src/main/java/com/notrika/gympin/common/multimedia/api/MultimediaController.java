package com.notrika.gympin.common.multimedia.api;

import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface MultimediaController {

    ResponseEntity<Boolean> storeMultimedia(MultimediaStoreParam multimediaStoreParam) throws IOException;

    InputStreamResource retrieveMultimedia(String fileName) throws Exception;

    ResponseEntity<Long> getMultimediaByFileName(String fileName);
}
