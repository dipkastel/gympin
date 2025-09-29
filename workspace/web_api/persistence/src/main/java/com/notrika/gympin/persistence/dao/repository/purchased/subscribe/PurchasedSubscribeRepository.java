package com.notrika.gympin.persistence.dao.repository.purchased.subscribe;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasedSubscribeRepository extends BaseRepository<PurchasedSubscribeEntity, Long> {


    List<PurchasedSubscribeEntity> findAllByCustomerIdAndDeletedFalse(Long userId);

    PurchasedSubscribeEntity findByKey(String key);

    List<PurchasedSubscribeEntity> findAllByPlaceIdAndDeletedFalse(Long id);

    List<PurchasedSubscribeEntity> findAllByDeletedIsFalseAndStatus(SubscribePurchasedStatus status);

    @Query("SELECT T FROM PurchasedSubscribeEntity T WHERE T.customer.id = :#{#userId} AND T.ticketSubscribe.place.id = :#{#placeId} AND T.status NOT LIKE 'PAYMENT_WAIT' AND T.status NOT LIKE 'CANCEL'  ORDER BY T.id DESC ")
    List<PurchasedSubscribeEntity> getUserPlaceSubscribe(Long userId, Long placeId);

    @Query("SELECT T FROM PurchasedSubscribeEntity T LEFT JOIN PurchasedSubscribeEntryEntity E ON T.id = E.purchasedSubscribe.id LEFT JOIN TicketSubscribeEntity P ON T.ticketSubscribe.id = P.id WHERE E.subscribeEntryStatus LIKE 'REQUESTED' AND P.place.id = :#{#placeId}")
    List<PurchasedSubscribeEntity> findRequestedSubescribeByPlaceId(Long placeId);

    @Query("SELECT T FROM PurchasedSubscribeEntity T LEFT JOIN PurchasedSubscribeEntryEntity E ON T.id = E.purchasedSubscribe.id LEFT JOIN TicketSubscribeEntity P ON T.ticketSubscribe.id = P.id WHERE P.place.id = :#{#placeId} AND E.subscribeEntryStatus LIKE 'ACCEPTED' AND E.exitDate = null")
    List<PurchasedSubscribeEntity> findSubscribesHasOpenEnterByPlaceId(Long placeId);

    @Query("SELECT T FROM PurchasedSubscribeEntity T WHERE T.ticketSubscribe.place.id = :#{#placeId} AND T.status LIKE 'ACTIVE' ")
    List<PurchasedSubscribeEntity> getActiveSubscribeOfPlace(Long placeId);

    @Query("SELECT T FROM PurchasedSubscribeEntity T WHERE T.ticketSubscribe.place.id = :#{#placeId} AND T.status NOT LIKE 'READY_TO_ACTIVE' ")
    List<PurchasedSubscribeEntity> getPlaceSubscribes(Long placeId);

}
