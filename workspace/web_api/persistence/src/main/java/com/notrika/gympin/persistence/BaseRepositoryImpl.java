package com.notrika.gympin.persistence;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextEntry;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.persistence.repository.BaseRepository;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class BaseRepositoryImpl<T extends BaseEntity, ID extends Serializable>
        extends SimpleJpaRepository<T, ID> implements BaseRepository<T, ID> {

    private final EntityManager entityManager;

    public BaseRepositoryImpl(JpaEntityInformation<T, ?>
                                      entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Transactional
    @Override
    public void deleteById2(T item) {
//        BaseEntity deleted = entityManager.find(BaseEntity.class, item);
//        deleted.setDeleted(true);
        ((BaseEntity) item).setDeleted(true);
        save((T) item);

    }

    @Override
    public List<T> findAll() {
        return super.findAll().stream().filter(t -> !((BaseEntity) t).isDeleted()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public <S extends T> S add(S entity) {
        GympinContextEntry context = GympinContext.getContext();
        if (context!=null && context.getBaseParam()!=null && context.getBaseParam().getUser().getId() != null && context.getBaseParam().getUser().getId() > 0)
            entity.setUpdaterUser(User.builder().id(context.getBaseParam().getUser().getId()).build());
        entity.setCreatedDate(new Date());
        return this.save(entity);
    }

    @Override
    @Transactional
    public <S extends T> S update(S entity) {
        GympinContextEntry context = GympinContext.getContext();
        if (context!=null && context.getBaseParam()!=null && context.getBaseParam().getUser().getId() != null && context.getBaseParam().getUser().getId() > 0)
            entity.setUpdaterUser(User.builder().id(context.getBaseParam().getUser().getId()).build());
        entity.setUpdatedDate(new Date());
        return this.save(entity);
    }
}
