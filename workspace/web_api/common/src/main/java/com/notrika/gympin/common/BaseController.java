package com.notrika.gympin.common;

import org.springframework.http.ResponseEntity;

import java.util.Collection;
import java.util.List;

public interface BaseController <I extends BaseParam<?>,O extends BaseDto<?>> {

    ResponseEntity<O> add(I i);

    ResponseEntity<O> update(I i);

    void delete(I i);

    ResponseEntity<List<O>> getAll();

    ResponseEntity<O> getById(long id);
}
