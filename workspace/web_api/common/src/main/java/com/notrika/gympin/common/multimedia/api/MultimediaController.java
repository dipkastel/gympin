package com.notrika.gympin.common.multimedia.api;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface MultimediaController {

    ResponseEntity<Long> add(MultimediaStoreParam multimediaStoreParam) throws IOException;

    ResponseEntity<Long> addImage(MultimediaStoreParam multimediaStoreParam) throws IOException;

    ResponseEntity<Long> addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException;

    ResponseEntity<Long> addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException;

    void getByName(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception;

    ResponseEntity<Long> getMultimediaIdByFileName(String fileName);

    void getById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception;

    List<byte[]> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException;

    ResponseEntity<List<Long>> getAllId();

    ResponseEntity<List<String>> getAllName();

    ResponseEntity<List<MultimediaDto>> getAll();

    ResponseEntity<Long> update(MultimediaStoreParam multimediaStoreParam);

    ResponseEntity<Boolean> delete(Long id);

}
