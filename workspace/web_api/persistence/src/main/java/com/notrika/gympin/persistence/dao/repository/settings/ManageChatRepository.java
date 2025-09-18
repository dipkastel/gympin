package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.chat.ManageChatEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ManageChatRepository extends BaseRepository<ManageChatEntity, Long> {

    @Query("SELECT m FROM ManageChatEntity m WHERE m.id = (SELECT MAX(m2.id) FROM ManageChatEntity m2 WHERE m2.chatId = m.chatId ) ORDER BY m.createdDate DESC")
    List<ManageChatEntity> findLastMessageOfEachChat(Pageable pageable);

}
