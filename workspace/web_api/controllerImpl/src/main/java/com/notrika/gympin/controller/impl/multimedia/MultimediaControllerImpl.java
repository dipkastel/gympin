package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.multimedia.api.MultimediaController;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.query.MultimediaQuery;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/v1/multimedia")
public class MultimediaControllerImpl implements MultimediaController {

    @Autowired
    private MultimediaService multimediaService;

    @Override
    @RequestMapping(path = "/add", method = POST, consumes = {org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MultimediaDto> add(MultimediaStoreParam multimediaStoreParam) {
        return ResponseEntity.ok(multimediaService.add(multimediaStoreParam));
    }

    @Override
    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER')")
    public ResponseEntity<MultimediaDto> update(MultimediaStoreParam multimediaStoreParam) {
        return ResponseEntity.ok(multimediaService.update(multimediaStoreParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<MultimediaDto> delete(MultimediaStoreParam param) {
        return ResponseEntity.ok(multimediaService.delete(param));
    }

    @Override
    public ResponseEntity<List<MultimediaDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(multimediaService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<MultimediaDto> getById(Long id) {
        return ResponseEntity.ok(multimediaService.getById(id));
    }

    @Override
    public ResponseEntity<Page<MultimediaDto>> query(MultimediaQuery param) {
        return ResponseEntity.ok(multimediaService.query(param));
    }

    @Override
    @RequestMapping(path = "/getAllImages", method = GET)
    public ResponseEntity<List<MultimediaDto>> getAllImages(HttpServletResponse response, BasePagedParam pagingParam) throws Exception {
        return ResponseEntity.ok(multimediaService.getAll(pagingParam,MediaType.IMAGE));
    }

    @Override
    @RequestMapping(path = "/getAllVideos", method = GET)
    public ResponseEntity<List<MultimediaDto>> getAllVideo(HttpServletResponse response, BasePagedParam pagingParam) throws Exception {
        return ResponseEntity.ok(multimediaService.getAll(pagingParam,MediaType.VIDEO));
    }

    @Override
    @RequestMapping(path = "/getAllAudios", method = GET)
    public ResponseEntity<List<MultimediaDto>> getAllAudio(HttpServletResponse response, BasePagedParam pagingParam) throws Exception {
        return ResponseEntity.ok(multimediaService.getAll(pagingParam,MediaType.AUDIO));
    }

    @Override
    @RequestMapping(path = "/getAllFiles", method = GET)
    public ResponseEntity<List<MultimediaDto>> getAllFiles(HttpServletResponse response, BasePagedParam pagingParam) throws Exception {
        return ResponseEntity.ok(multimediaService.getAllFiles(pagingParam,MediaType.FILE));
    }


}
