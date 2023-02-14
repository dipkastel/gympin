package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.note.NoteEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends BaseRepository<NoteEntity, Long> {

    List<NoteEntity> findAllByUserIdAndDeletedIsFalse(Long userId);
    List<NoteEntity> findAllByTicketIdAndDeletedIsFalse(Long ticketId);
    List<NoteEntity> findAllByPlaceIdAndDeletedIsFalse(Long PlaceId);
    List<NoteEntity> findAllByCorporateIdAndDeletedIsFalse(Long CorporateId);
}
