package com.notrika.gympin.domain.purchased.purchasedCourse;

import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRole;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CourseEntryStatus;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus.COMPLETE;
import static com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus.EXPIRE;

@Service
public class PurchasedCourseServiceHelper {

    @Autowired
    PurchasedCourseRepository purchasedCourseRepository;

    @Autowired
    PurchasedCourseEntryRepository purchasedCourseEntryRepository;

    public boolean checkForAccess(PurchasedCourseEntity purchesedCourse, Long placeId) {

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        var userHallAccess = userRequester.getPlacePersonnel().stream().filter(p -> p.getPlace().getId() == placeId).findFirst().get();
        var halls = purchesedCourse.getTicketCourse().getActiveTimes().stream().map(TicketHallActiveTimeEntity::getHall).collect(Collectors.toSet());
        for (var hall : halls) {
            if (userHallAccess.getUserRole() == PlacePersonnelRole.PLACE_OWNER) return true;
            if (userHallAccess.getPlacePersonnelBuyableAccess().size() < 1) return false;
            var hallAccess = userHallAccess.getPlacePersonnelBuyableAccess().stream().filter(c -> Objects.equals(c.getBuyable().getId(), hall.getId())).findFirst().get();
            if (!hallAccess.getAccess())
                return false;
        }
        return true;
    }

    public PurchasedCourseEntity checkForExpire(PurchasedCourseEntity course) {
        switch (course.getStatus()) {
            case EXPIRE:
            case COMPLETE:
            case PROCESSING:
            case CANCEL: {
                return course;
            }
            case ACTIVE:
            case READY_TO_ACTIVE: {
                if (course.getEndDate().before(new Date())) {
                    course.setStatus(EXPIRE);
                    purchasedCourseRepository.update(course);
                }
                if (course.getEntryList().stream().filter(te -> te.getExitDate() != null).count() >= Long.valueOf(course.getEntryTotalCount())) {
                    course.setStatus(COMPLETE);
                    purchasedCourseRepository.update(course);
                }
                if (course.getEndDate().before(new Date())) {
                    course.setStatus(EXPIRE);
                    purchasedCourseRepository.update(course);
                }
                for (var entry : course.getEntryList()) {
                    if (entry.getExitDate() == null && entry.getCourseEntryStatus() == CourseEntryStatus.ACCEPTED) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getEnterDate());
                        c.add(Calendar.HOUR, 4);
                        if (c.getTime().before(new Date())) {
                            entry.setExitDate(c.getTime());
                            purchasedCourseEntryRepository.update(entry);
                        }
                    }
                    if (entry.getCourseEntryStatus() == CourseEntryStatus.REQUESTED) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getCreatedDate());
                        c.add(Calendar.HOUR, 3);
                        if (c.getTime().before(new Date())) {
                            entry.setEnterDate(entry.getCreatedDate());
                            entry.setExitDate(c.getTime());
                            entry.setCourseEntryStatus(CourseEntryStatus.REJECTED);
                            purchasedCourseEntryRepository.update(entry);
                        }
                    }
                }
                return course;
            }
            default:
                return course;

        }
    }

    public void enterUser(PurchasedCourseEntity courseEntity, UserEntity controllingUser) {
        PurchasedCourseEntryEntity pcourseEntryEntity = PurchasedCourseEntryEntity.builder()
                .CourseEntryStatus(CourseEntryStatus.ACCEPTED)
                .purchasedCourse(courseEntity)
                .enterDate(new Date())
                .acceptedBy(controllingUser)
                .build();
        purchasedCourseEntryRepository.add(pcourseEntryEntity);
    }

    public void exitUserFromPlace(PurchasedCourseEntryEntity courseEntry) {
        courseEntry.setExitDate(new Date());
        purchasedCourseEntryRepository.update(courseEntry);
    }
}
