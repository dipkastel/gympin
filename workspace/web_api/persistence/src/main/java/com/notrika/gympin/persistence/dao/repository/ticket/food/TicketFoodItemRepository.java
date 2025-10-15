package com.notrika.gympin.persistence.dao.repository.ticket.food;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketFoodItemRepository extends BaseRepository<TicketFoodItemEntity, Long> {


    @Query("select tfi.category from TicketFoodItemEntity tfi where tfi.place.id=:cateringId group by tfi.category")
    List<String> getAllFoodCategoriesByCateringId(Long cateringId);
}
