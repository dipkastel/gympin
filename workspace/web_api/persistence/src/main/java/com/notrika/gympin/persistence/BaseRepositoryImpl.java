package com.notrika.gympin.persistence;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.persistence.repository.BaseRepository;
import com.notrika.gympin.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class BaseRepositoryImpl<T extends BaseEntity, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements BaseRepository<T, ID> {

    private final EntityManager entityManager;

//    @Autowired
//    private UserRepository userRepository;

    public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Transactional
    @Override
    public T deleteById2(T item) {
        //        BaseEntity deleted = entityManager.find(BaseEntity.class, item);
        //        deleted.setDeleted(true);
        ((BaseEntity) item).setDeleted(true);
        T update = update((T) item);
        return update;
    }

    @Override
    public List<T> findAll() {
        return super.findAll().stream().filter(t -> !((BaseEntity) t).isDeleted()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public <S extends T> S add(S entity) {
        GympinContext context = GympinContextHolder.getContext();
        if (context != null && context.getUserGroup() != null) {
            User user = User.builder().id(context.getUser().getId()).build();
            entity.setCreatorUser(user);
        }
        entity.setCreatedDate(new Date());
        return this.save(entity);
    }

    @Override
    @Transactional
    public <S extends T> S update(S entity) {
        GympinContext context = GympinContextHolder.getContext();
        if (context != null && context.getUserGroup() != null) {
            User user = User.builder().id(context.getUser().getId()).build();
            entity.setUpdaterUser(user);
        }
        entity.setUpdatedDate(new Date());
        return this.save(entity);
    }
}
