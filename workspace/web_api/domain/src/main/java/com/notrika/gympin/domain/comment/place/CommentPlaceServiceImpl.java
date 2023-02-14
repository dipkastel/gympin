package com.notrika.gympin.domain.comment.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.comment.place.dto.CommentPlaceDto;
import com.notrika.gympin.common.comment.place.param.CommentPlaceParam;
import com.notrika.gympin.common.comment.place.service.CommentPlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.entity.place.comment.CommentPlaceEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentPlaceServiceImpl extends AbstractBaseService<CommentPlaceParam, CommentPlaceDto, BaseQuery<?>, CommentPlaceEntity> implements CommentPlaceService {
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
    public CommentPlaceEntity add(CommentPlaceEntity entity) {
        return null;
    }

    @Override
    public CommentPlaceEntity update(CommentPlaceEntity entity) {
        return null;
    }

    @Override
    public CommentPlaceEntity delete(CommentPlaceEntity entity) {
        return null;
    }

    @Override
    public CommentPlaceEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<CommentPlaceEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<CommentPlaceEntity> findAll(Specification<CommentPlaceEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<CommentPlaceDto> convertToDtos(List<CommentPlaceEntity> entities) {
        return null;
    }

    @Override
    public Page<CommentPlaceDto> convertToDtos(Page<CommentPlaceEntity> entities) {
        return null;
    }
}
