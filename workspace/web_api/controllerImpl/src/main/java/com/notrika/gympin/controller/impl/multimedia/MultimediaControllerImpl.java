package com.notrika.gympin.controller.impl.multimedia;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.multimedia.api.MultimediaController;
import com.notrika.gympin.common.multimedia.dto.InputStreamResourceDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/v1/multimedia")
public class MultimediaControllerImpl implements MultimediaController {

    @Autowired
    private MultimediaService multimediaService;

    @Override
    @RequestMapping(path = "/add", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> add(@ModelAttribute MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.storeFile(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addImage", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> addImage(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addImage(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addVideo", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addVideo(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addAudio", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addAudio(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/resource")
    @RequestMapping(path = "/getByName", method = GET)
    @ResponseBody
    @IgnoreWrapAspect
    public InputStreamResource getByName(MultimediaRetrieveParam multimediaParam) throws Exception {
        return new InputStreamResource(multimediaService.loadFileAsResource(multimediaParam));
    }

    @Override
    @GetMapping("/getMultimediaIdByFileName")
    public ResponseEntity<Long> getMultimediaIdByFileName(String fileName) {
        return new ResponseEntity<>(multimediaService.getMultimediaIdByFileName(fileName),HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/resource")
    @RequestMapping(path = "/getById", method = GET)
    @ResponseBody
    @IgnoreWrapAspect
    public InputStreamResource getById(MultimediaRetrieveParam id) throws Exception {
        return new InputStreamResource(multimediaService.getById(id));
    }

    @Override
    @RequestMapping(path = "/getAllByType", method = GET)
    @ResponseBody
    @IgnoreWrapAspect
    public List<byte[]> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException {
        List<InputStream> allByType = multimediaService.getAllByType(multimediaRetrieveParam);
        List<byte[]> inputStreamResources=new ArrayList<>();
        for (int i = 0; i < allByType.size(); i++) {
            inputStreamResources.add(allByType.get(i).readAllBytes());
        }
        return inputStreamResources;
    }

    @Override
    @GetMapping("/getAllId")
    public ResponseEntity<List<Long>> getAllId() {
        return new ResponseEntity<List<Long>>(multimediaService.getAllId(),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllName")
    public ResponseEntity<List<String>> getAllName() {
        return new ResponseEntity<List<String>>(multimediaService.getAllName(),HttpStatus.OK);
    }
}
