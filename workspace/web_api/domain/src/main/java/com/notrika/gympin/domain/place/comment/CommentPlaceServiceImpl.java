package com.notrika.gympin.domain.place.comment;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.comment.dto.CommentPlaceDto;
import com.notrika.gympin.common.place.comment.param.CommentPlaceParam;
import com.notrika.gympin.common.place.comment.service.CommentPlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.entity.place.comment.PlaceCommentEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentPlaceServiceImpl extends AbstractBaseService<CommentPlaceParam, CommentPlaceDto, BaseQuery<?>, PlaceCommentEntity> implements CommentPlaceService {
    @Override
    public CommentPlaceDto add(@NonNull CommentPlaceParam commentPlaceParam) {
        return null;
    }

    @Override
    public CommentPlaceDto update(@NonNull CommentPlaceParam commentPlaceParam) {
        return null;
    }

    @Override
    public CommentPlaceDto delete(@NonNull CommentPlaceParam commentPlaceParam) {
        return null;
    }

    @Override
    public CommentPlaceDto getById(long id) {
        return null;
    }

    @Override
    public PlaceCommentEntity add(PlaceCommentEntity entity) {
        return null;
    }

    @Override
    public PlaceCommentEntity update(PlaceCommentEntity entity) {
        return null;
    }

    @Override
    public PlaceCommentEntity delete(PlaceCommentEntity entity) {
        return null;
    }

    @Override
    public PlaceCommentEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<PlaceCommentEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<PlaceCommentEntity> findAll(Specification<PlaceCommentEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<CommentPlaceDto> convertToDtos(List<PlaceCommentEntity> entities) {
        return null;
    }

    @Override
    public Page<CommentPlaceDto> convertToDtos(Page<PlaceCommentEntity> entities) {
        return null;
    }
}
