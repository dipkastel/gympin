package com.notrika.gympin.common.multimedia.api;

import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;

import javax.servlet.http.HttpServletResponse;

public interface ResourceController {

    void getImageById(HttpServletResponse response, MultimediaRetrieveParam param) throws Exception;

    void getVideoById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception;

    void getAudioById(HttpServletResponse response,MultimediaRetrieveParam param) throws Exception;

}
