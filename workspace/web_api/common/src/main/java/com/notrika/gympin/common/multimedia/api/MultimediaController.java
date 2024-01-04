package com.notrika.gympin.common.multimedia.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.query.MultimediaQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MultimediaController extends BaseController<MultimediaStoreParam, MultimediaDto, MultimediaQuery> {

    ResponseEntity<MultimediaDto> add(@ModelAttribute MultimediaStoreParam multimediaStoreParam);

    ResponseEntity<List<MultimediaDto>> getAllImages(HttpServletResponse response,BasePagedParam pagingParam) throws Exception;

    ResponseEntity<List<MultimediaDto>> getAllVideo(HttpServletResponse response,BasePagedParam pagingParam) throws Exception;

    ResponseEntity<List<MultimediaDto>> getAllAudio(HttpServletResponse response,BasePagedParam pagingParam) throws Exception;

}
