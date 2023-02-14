package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryMessageEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketEntryMessageRepository extends BaseRepository<TicketEntryMessageEntity, Long> {
}
