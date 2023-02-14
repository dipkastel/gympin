package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserTokenEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends BaseRepository<TicketEntity, Long> {


    List<TicketEntity> findAllByUserIdAndDeletedIsFalse(Long userId);

    @Query("SELECT T FROM TicketEntity T WHERE T.user.id = :#{#userId} AND T.plan.place.id = :#{#placeId} AND T.status NOT LIKE 'PAYMENT_WAIT' AND T.status NOT LIKE 'CANCEL'  ORDER BY T.id DESC ")
    List<TicketEntity> getUserPlaceTicket(Long userId,Long placeId);

    @Query("SELECT T FROM TicketEntity T LEFT JOIN TicketEntryEntity E ON T.id = E.ticket.id LEFT JOIN PlanEntity P ON T.plan.id = P.id WHERE E.ticketEntryStatus LIKE 'REQUESTED' AND P.place.id = :#{#placeId}")
    List<TicketEntity> findRequestedTicketsByPlaceId(Long placeId);

    @Query("SELECT T FROM TicketEntity T LEFT JOIN TicketEntryEntity E ON T.id = E.ticket.id LEFT JOIN PlanEntity P ON T.plan.id = P.id WHERE P.place.id = :#{#placeId} AND E.ticketEntryStatus LIKE 'ACCEPTED' AND E.exitDate = null")
    List<TicketEntity> findTicketsHasOpenEnterByPlaceId(Long placeId);

    @Query("SELECT T FROM TicketEntity T WHERE T.plan.place.id = :#{#placeId} AND T.status LIKE 'ACTIVE' ")
    List<TicketEntity> getActiveTicketsOfPlace(Long placeId);

}
