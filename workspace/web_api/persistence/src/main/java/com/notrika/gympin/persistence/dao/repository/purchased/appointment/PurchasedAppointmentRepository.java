package com.notrika.gympin.persistence.dao.repository.purchased.appointment;

import com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedAppointment.PurchasedAppointmentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasedAppointmentRepository extends BaseRepository<PurchasedAppointmentEntity, Long> {


    List<PurchasedAppointmentEntity> findAllByCustomerIdAndDeletedFalse(Long userId);

    PurchasedAppointmentEntity findByKey(String key);

    List<PurchasedAppointmentEntity> findAllByPlaceIdAndDeletedFalse(Long id);

    List<PurchasedAppointmentEntity> findAllByDeletedIsFalseAndStatus(AppointmentPurchasedStatus status);

    @Query("SELECT T FROM PurchasedAppointmentEntity T WHERE T.customer.id = :#{#userId} AND T.ticketAppointment.place.id = :#{#placeId} AND T.status NOT LIKE 'PAYMENT_WAIT' AND T.status NOT LIKE 'CANCEL'  ORDER BY T.id DESC ")
    List<PurchasedAppointmentEntity> getUserPlaceAppointment(Long userId, Long placeId);

    @Query("SELECT T FROM PurchasedAppointmentEntity T WHERE T.ticketAppointment.place.id = :#{#placeId} AND T.status LIKE 'ACTIVE' ")
    List<PurchasedAppointmentEntity> getActiveAppointmentOfPlace(Long placeId);

    @Query("SELECT T FROM PurchasedAppointmentEntity T WHERE T.ticketAppointment.place.id = :#{#placeId} AND T.status NOT LIKE 'READY_TO_ACTIVE' ")
    List<PurchasedAppointmentEntity> getPlaceAppointments(Long placeId);

}
