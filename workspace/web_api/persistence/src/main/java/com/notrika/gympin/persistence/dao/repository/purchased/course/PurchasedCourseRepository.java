package com.notrika.gympin.persistence.dao.repository.purchased.course;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasedCourseRepository extends BaseRepository<PurchasedCourseEntity, Long> {


    List<PurchasedCourseEntity> findAllByCustomerIdAndDeletedFalse(Long userId);

    @Query("SELECT T FROM PurchasedCourseEntity T WHERE T.customer.id = :#{#userId} AND T.ticketCourse.place.id = :#{#placeId} AND T.status NOT LIKE 'PAYMENT_WAIT' AND T.status NOT LIKE 'CANCEL'  ORDER BY T.id DESC ")
    List<PurchasedCourseEntity> getUserPlaceCourse(Long userId, Long placeId);

    @Query("SELECT T FROM PurchasedCourseEntity T LEFT JOIN PurchasedCourseEntryEntity E ON T.id = E.purchasedCourse.id LEFT JOIN TicketCourseEntity P ON T.ticketCourse.id = P.id WHERE E.CourseEntryStatus LIKE 'REQUESTED' AND P.place.id = :#{#placeId}")
    List<PurchasedCourseEntity> findRequestedSubescribeByPlaceId(Long placeId);

    @Query("SELECT T FROM PurchasedCourseEntity T LEFT JOIN PurchasedCourseEntryEntity E ON T.id = E.purchasedCourse.id LEFT JOIN TicketCourseEntity P ON T.ticketCourse.id = P.id WHERE P.place.id = :#{#placeId} AND E.CourseEntryStatus LIKE 'ACCEPTED' AND E.exitDate = null")
    List<PurchasedCourseEntity> findCoursesHasOpenEnterByPlaceId(Long placeId);

    @Query("SELECT T FROM PurchasedCourseEntity T WHERE T.ticketCourse.place.id = :#{#placeId} AND T.status LIKE 'ACTIVE' ")
    List<PurchasedCourseEntity> getActiveCourseOfPlace(Long placeId);

}
