package com.notrika.gympin.persistence.dao.repository.purchased.course;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedCourseEntryRepository extends BaseRepository<PurchasedCourseEntryEntity, Long> {

}
