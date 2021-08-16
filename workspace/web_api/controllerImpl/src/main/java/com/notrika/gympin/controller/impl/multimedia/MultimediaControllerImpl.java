package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.multimedia.api.MultimediaController;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/multimedia")
public class MultimediaControllerImpl implements MultimediaController {

    @Autowired
    private MultimediaService multimediaService;

    @Override
    public ResponseEntity<Boolean> storeMultimedia(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.storeFile(multimediaStoreParam), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Resource> retrieveMultimedia(String fileName) throws Exception {
        return new ResponseEntity<Resource>(multimediaService.loadFileAsResource(fileName), HttpStatus.OK);
    }
}
