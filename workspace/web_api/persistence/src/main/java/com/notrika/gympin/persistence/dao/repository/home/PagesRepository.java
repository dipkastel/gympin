package com.notrika.gympin.persistence.dao.repository.home;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.pages.PagesItemEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagesRepository extends BaseRepository<PagesItemEntity, Long> {

    List<PagesItemEntity> getByParentIdAndDeletedIsFalseOrderByPriorityAsc(Long ParentId);

    PagesItemEntity findFirstByData(String data);

}
