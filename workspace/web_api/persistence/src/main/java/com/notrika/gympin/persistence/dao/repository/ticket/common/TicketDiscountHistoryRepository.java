package com.notrika.gympin.persistence.dao.repository.ticket.common;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketDiscountHistoryRepository extends BaseRepository<BuyableDiscountHistoryEntity, Long> {
}
