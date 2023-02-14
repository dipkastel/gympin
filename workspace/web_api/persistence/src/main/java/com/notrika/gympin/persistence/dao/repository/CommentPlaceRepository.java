package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.comment.CommentPlaceEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentPlaceRepository extends BaseRepository<CommentPlaceEntity, Long> {
}
