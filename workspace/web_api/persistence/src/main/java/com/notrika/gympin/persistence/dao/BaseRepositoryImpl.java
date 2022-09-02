package com.notrika.gympin.persistence.dao;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreate;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.provider.PersistenceProvider;
import org.springframework.data.jpa.repository.query.QueryUtils;
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
    private final PersistenceProvider provider;
    private final JpaEntityInformation<T, ?> entityInformation;

    //    @Autowired
    //    private UserRepository userRepository;

    public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityInformation = entityInformation;
        this.entityManager = entityManager;
        this.provider = PersistenceProvider.fromEntityManager(entityManager);
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
    public List<T> findAllUndeleted(Pageable pageable) {
        return super.findAll(pageable).stream().filter(t -> !((BaseEntity) t).isDeleted()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public <S extends T> S add(S entity) {
        if (entity instanceof BaseEntityWithCreate) {
            GympinContext context = GympinContextHolder.getContext();
            if (context != null) {
                User user = (User) context.getEntry().get(GympinContext.USER_KEY);
                if (user != null) {
                    ((BaseEntityWithCreate) entity).setCreatorUser(user);
                }
            }
            ((BaseEntityWithCreate) entity).setCreatedDate(new Date());
        }
        return this.save(entity);
    }

    @Override
    @Transactional
    public <S extends T> S update(S entity) {
        if (entity instanceof BaseEntityWithCreateUpdate) {
            GympinContext context = GympinContextHolder.getContext();
            if (context != null) {
                User user = (User) context.getEntry().get(GympinContext.USER_KEY);
                if (user != null) {
                    ((BaseEntityWithCreateUpdate) entity).setUpdaterUser(user);
                }
            }
            ((BaseEntityWithCreateUpdate) entity).setUpdatedDate(new Date());
        }
        return this.save(entity);
    }

//    @Override
//    public Long countAllByDeletedIsFalse() {
//        String countQuery = String.format("select count(%s) from %s x where x.is_deleted=0", this.provider.getCountQueryPlaceholder(), "%s");
//        String queryString = QueryUtils.getQueryString(countQuery, this.entityInformation.getEntityName());
////        this.findAll(Specification.where());
////        this.count()
//        return this.entityManager.createQuery(queryString, Long.class).getSingleResult();
//    }
}
