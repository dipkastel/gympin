package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageNoteRepository extends BaseRepository<ManageNoteEntity, Long> {

    List<ManageNoteEntity> findAllByUserIdAndDeletedIsFalse(Long userId);
    List<ManageNoteEntity> findAllBySubscribeIdAndDeletedIsFalse(Long subscribeId);
    List<ManageNoteEntity> findAllByPlaceIdAndDeletedIsFalse(Long PlaceId);
    List<ManageNoteEntity> findAllByCorporateIdAndDeletedIsFalse(Long CorporateId);
    List<ManageNoteEntity> findAllByInvoiceIdAndDeletedIsFalse(Long invoiceId);
}
