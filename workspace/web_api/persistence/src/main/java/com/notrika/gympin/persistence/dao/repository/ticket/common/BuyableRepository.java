package com.notrika.gympin.persistence.dao.repository.ticket.common;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyableRepository extends BaseRepository<BuyableEntity, Long> {

    List<BuyableEntity> findAllByBeneficiaryNullAndDeletedFalse();

}
