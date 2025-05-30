package com.notrika.gympin.persistence.dao.repository.ticket.food;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TicketFoodMenuRepository extends BaseRepository<TicketFoodMenuEntity, Long> {

    @Query(value = "SELECT tfm.date FROM TicketFoodMenuEntity tfm JOIN TicketFoodItemEntity  tfi on tfm.foodItem.id = tfi.id WHERE tfi.place.id = :#{#cateringId} GROUP BY tfm.date")
    List<Date> getActiveDatesByCateringId(Long cateringId);

}
