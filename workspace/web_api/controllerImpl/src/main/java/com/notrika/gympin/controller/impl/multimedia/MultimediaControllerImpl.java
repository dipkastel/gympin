package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.multimedia.api.MultimediaController;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/v1/multimedia")
public class MultimediaControllerImpl implements MultimediaController {

    @Autowired
    private MultimediaService multimediaService;

    @Override
    @RequestMapping(path = "/addMultimediaFile", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> storeMultimedia(@ModelAttribute MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.storeFile(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/resource")
    @RequestMapping(path = "/resource", method = GET)
    @ResponseBody
    @IgnoreWrapAspect
    public InputStreamResource retrieveMultimedia(String fileName) throws Exception {
        return new InputStreamResource(multimediaService.loadFileAsResource(fileName));
    }
}
