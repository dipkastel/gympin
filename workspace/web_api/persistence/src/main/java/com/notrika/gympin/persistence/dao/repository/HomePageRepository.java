package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.homePage.HomePageItemEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface HomePageRepository extends BaseRepository<HomePageItemEntity, Long> {

}