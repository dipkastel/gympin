package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;


@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, ID extends Serializable> extends JpaRepository<T, ID> , JpaSpecificationExecutor<T> {

    T deleteById2(T item);

    List<T> findAllUndeleted(Pageable pageable);

    <S extends T> S add(S var1);

    <S extends T> S update(S var1);

    @Override
    Page<T> findAll(Pageable pageable);

//    Long countAllByDeletedIsFalse();

}
