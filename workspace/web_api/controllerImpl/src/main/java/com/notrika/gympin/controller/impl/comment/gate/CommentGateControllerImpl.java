package com.notrika.gympin.controller.impl.comment.gate;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.comment.gate.api.CommentGateController;
import com.notrika.gympin.common.comment.gate.dto.CommentGateDto;
import com.notrika.gympin.common.comment.gate.param.CommentGateParam;
import com.notrika.gympin.common.comment.gate.service.CommentGateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api/v1/comment/gate")
public class CommentGateControllerImpl implements CommentGateController {

    @Autowired
    private CommentGateService commentGateService;

    @Override
    public ResponseEntity<CommentGateDto> add(CommentGateParam param) {
        return ResponseEntity.ok(commentGateService.add(param));
    }

    @Override
    public ResponseEntity<CommentGateDto> update(CommentGateParam param) {
        return null;
    }

    @Override
    public ResponseEntity<CommentGateDto> delete(CommentGateParam param) {
        return null;
    }

    @Override
    public ResponseEntity<List<CommentGateDto>> getAll(BasePagedParam pagingParam) {
        return null;
    }

    @Override
    public ResponseEntity<CommentGateDto> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<CommentGateDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<CommentGateDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}