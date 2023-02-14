package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketEntryRepository extends BaseRepository<TicketEntryEntity, Long> {

}
