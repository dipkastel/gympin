package com.notrika.gympin.persistence.dao;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.notrika.gympin.common.util._base.query.QueryCriteria;
import com.notrika.gympin.common.util._base.query.Query;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreate;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.provider.PersistenceProvider;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.notrika.gympin.common.util._base.query.Enums.QueryOperationsEnum.EQUAL_TO;

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
        BaseEntity<T> baseEntity = new BaseEntity<T>();
        Query query = new Query();
        query.setCriteriaList(List.of(QueryCriteria.builder().key("deleted").value(false).operation(EQUAL_TO).build()));
        baseEntity.setQuery(query);
        Specification<T> specification = Specification.where(baseEntity);
        return super.findAll(specification,pageable).getContent();
    }

    @Override
    @Transactional
    public <S extends T> S add(S entity) {
        SetUserAndDatesCreate(entity);
        return this.save(entity);
    }

    @Override
    @Transactional
    public <S extends T> List<S> addAll(List<S> entities) {
        for (S entity:entities) SetUserAndDatesCreate(entity);
        return this.saveAll(entities);
    }

    @Override
    @Transactional
    public <S extends T> S update(S entity) {
        SetUserAndDatesUpdate(entity);
        return this.save(entity);
    }

    @Override
    @Transactional
    public <S extends T> List<S> updateAll(List<S> entities) {
        for (S entity :entities) SetUserAndDatesUpdate(entity);

        return this.saveAll(entities);
    }

    public <S extends T> void SetUserAndDatesUpdate(S entity){
        if (entity instanceof BaseEntityWithCreateUpdate) {
            GympinContext context = GympinContextHolder.getContext();
            if (context != null) {
                UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
                if (user != null&&!(entity instanceof UserEntity&&Objects.equals(user.getId(), entity.getId()))&&containUserCheck(entity)) {
                    ((BaseEntityWithCreateUpdate) entity).setUpdaterUser(user);
                }else {
                    ((BaseEntityWithCreateUpdate) entity).setUpdaterUser(null);
                }
            }
            ((BaseEntityWithCreateUpdate) entity).setUpdatedDate(new Date());
        }
    }

    public static com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();

    public static String asJsonString(final Object obj) {
        try {
            objectMapper.registerModule(new JSR310Module());
            objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,false);
            final String jsonContent = objectMapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private <S extends T> boolean containUserCheck(S entity) {
        //Todo write better method for it
        try {
            String Json = asJsonString(entity);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public <S extends T> void SetUserAndDatesCreate(S entity){
        if (entity instanceof BaseEntityWithCreate) {
            GympinContext context = GympinContextHolder.getContext();
            if (context != null) {
                UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
                if (user != null&&!(entity instanceof UserEntity&&Objects.equals(user.getId(), entity.getId()))&&containUserCheck(entity)) {
                    ((BaseEntityWithCreate) entity).setCreatorUser(user);
                }else {
                    ((BaseEntityWithCreate) entity).setCreatorUser(null);
                }
            }
            ((BaseEntityWithCreate) entity).setCreatedDate(new Date());
        }
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
