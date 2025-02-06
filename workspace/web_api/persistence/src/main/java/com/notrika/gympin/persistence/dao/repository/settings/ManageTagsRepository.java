package com.notrika.gympin.persistence.dao.repository.settings;

import org.springframework.stereotype.Repository;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;

import java.util.List;

@Repository
public interface ManageTagsRepository extends BaseRepository<ManageTagsEntity, Long> {

}
