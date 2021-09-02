package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;


@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, ID extends Serializable> extends JpaRepository<T, ID> {

    void deleteById2(T item);

    @Override
    List<T> findAll();

    <S extends T> S add(S var1);

    <S extends T> S update(S var1);
}
