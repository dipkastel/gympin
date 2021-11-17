package com.notrika.gympin.common.multimedia.api;

import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface MultimediaController {

    ResponseEntity<Boolean> add(MultimediaStoreParam multimediaStoreParam) throws IOException;

    InputStreamResource getByName(MultimediaRetrieveParam multimediaParam) throws Exception;

    ResponseEntity<Long> getMultimediaIdByFileName(String fileName);

    InputStreamResource getById(MultimediaRetrieveParam multimediaParam) throws Exception;

    List<byte[]> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException;
}
