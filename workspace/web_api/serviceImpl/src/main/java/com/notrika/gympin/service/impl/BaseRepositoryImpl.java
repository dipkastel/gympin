package com.notrika.gympin.service.impl;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.repository.BaseRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;

public class BaseRepositoryImpl <T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID>  implements BaseRepository<T, ID> {

    private final EntityManager entityManager;

    public BaseRepositoryImpl(Class<T> domainClass, EntityManager entityManager) {
        super(domainClass, entityManager);
        this.entityManager = entityManager;
    }

    @Transactional
    @Override
    public void deleteById(ID id) {

        BaseEntity deleted = entityManager.find(BaseEntity.class, id);
        deleted.setDeleted(true);
        save((T) deleted);
        return;

    }
}
