package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.comment.PlaceCommentEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceCommentRepository extends BaseRepository<PlaceCommentEntity, Long> {
}
