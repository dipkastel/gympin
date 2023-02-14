package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.multimedia.api.ResourceController;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import com.notrika.gympin.common.user.enums.MyMediaType;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class ResourceControllerImpl implements ResourceController {

    @Autowired
    private MultimediaService multimediaService;

    @Override
    @RequestMapping(path = "/resource/image", method = GET)
    @IgnoreWrapAspect
    public  @ResponseBody void getImageById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception {
        param.setMediaType(MediaType.IMAGE);
        response.setContentType(MyMediaType.IMAGE_JPEG_VALUE);
        InputStream inputStream = multimediaService.getById(param);
        IOUtils.copy(inputStream,response.getOutputStream());
    }

    @Override
    @RequestMapping(path = "/resource/video", method = GET)
    @IgnoreWrapAspect
    public  @ResponseBody void getVideoById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception {
        param.setMediaType(MediaType.VIDEO);
        response.setContentType(MyMediaType.VIDEO_MP4_VALUE);
        InputStream inputStream = multimediaService.getById(param);
        IOUtils.copy(inputStream,response.getOutputStream());
    }

    @Override
    @RequestMapping(path = "/resource/audio", method = GET)
    @IgnoreWrapAspect
    public  @ResponseBody void getAudioById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception {
        param.setMediaType(MediaType.AUDIO);
        response.setContentType(MyMediaType.AUDIO_MP3_VALUE);
        InputStream inputStream = multimediaService.getById(param);
        IOUtils.copy(inputStream,response.getOutputStream());
    }

}
