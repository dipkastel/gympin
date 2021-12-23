package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.api.MultimediaController;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> add(@ModelAttribute MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.storeFile(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addImage", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> addImage(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addImage(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addVideo", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addVideo(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    @RequestMapping(path = "/addAudio", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException {
        return new ResponseEntity<Boolean>(multimediaService.addAudio(multimediaStoreParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/resource")
    @RequestMapping(path = "/getByName", method = GET)
    @ResponseBody
    @IgnoreWrapAspect
    public void getByName(HttpServletResponse response, MultimediaRetrieveParam param) throws Exception {
        InputStream byName = multimediaService.getByName(param);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        IOUtils.copy(byName,response.getOutputStream());
    }

    @Override
    @GetMapping("/getMultimediaIdByFileName")
    public ResponseEntity<Long> getMultimediaIdByFileName(String fileName) {
        return new ResponseEntity<>(multimediaService.getMultimediaIdByFileName(fileName),HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/resource")
    @RequestMapping(path = "/getById", method = GET)
    @IgnoreWrapAspect
    public  @ResponseBody void getById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception {
        InputStream byId = multimediaService.getById(param);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        IOUtils.copy(byId,response.getOutputStream());
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

    @Override
    @GetMapping("/getAll")
    public ResponseEntity<List<MultimediaDto>> getAll() {
        return new ResponseEntity<List<MultimediaDto>>(multimediaService.getAll(),HttpStatus.OK);
    }

    @Override
    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> update(MultimediaStoreParam multimediaStoreParam) {
        return new ResponseEntity<Boolean>(multimediaService.update(multimediaStoreParam),HttpStatus.OK);
    }

    @Override
    @PutMapping("/delete")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<Boolean> delete(Long id) {
        return new ResponseEntity<Boolean>(multimediaService.delete(id),HttpStatus.OK);
    }
}
