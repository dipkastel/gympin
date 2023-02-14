package com.notrika.gympin.domain.comment.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.comment.gate.dto.CommentGateDto;
import com.notrika.gympin.common.comment.gate.param.CommentGateParam;
import com.notrika.gympin.common.comment.gate.service.CommentGateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CommentConvertor;
import com.notrika.gympin.persistence.dao.repository.CommentGateRepository;
import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentGateServiceImpl extends AbstractBaseService<CommentGateParam, CommentGateDto, BaseQuery<?>, CommentGateEntity> implements CommentGateService {

    @Autowired
    private CommentGateRepository commentGateRepository;

    @Override
    public CommentGateDto add(@NonNull CommentGateParam commentGateParam) {
        CommentGateEntity addedComment = this.add(CommentConvertor.convertToCommentGateEntity(commentGateParam));
        return CommentConvertor.convertToCommentGateDto(addedComment);
    }

    @Override
    public CommentGateDto update(@NonNull CommentGateParam commentGateParam) {
        return null;
    }

    @Override
    public CommentGateDto delete(@NonNull CommentGateParam commentGateParam) {
        return null;
    }

    @Override
    public CommentGateDto getById(long id) {
        return null;
    }

    @Override
    public CommentGateEntity add(CommentGateEntity entity) {
        return commentGateRepository.add(entity);
    }

    @Override
    public CommentGateEntity update(CommentGateEntity entity) {
        return null;
    }

    @Override
    public CommentGateEntity delete(CommentGateEntity entity) {
        return null;
    }

    @Override
    public CommentGateEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<CommentGateEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<CommentGateEntity> findAll(Specification<CommentGateEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<CommentGateDto> convertToDtos(List<CommentGateEntity> entities) {
        return null;
    }

    @Override
    public Page<CommentGateDto> convertToDtos(Page<CommentGateEntity> entities) {
        return null;
    }
}
