package com.notrika.gympin.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

// FIXME: 4/14/2022 edit to standard rest resource convention
public interface BaseController<I extends BaseParam<?>, O extends BaseDto<?>> {

    @PostMapping("/add")
    ResponseEntity<O> add(I i);

    @PutMapping("/update")
    ResponseEntity<O> update(I i);

    @PutMapping("/delete")
    ResponseEntity<O> delete(I i);

    // FIXME: 4/14/2022
    @GetMapping("/getAll")
    ResponseEntity<List<O>> getAll(BasePagedParam pagingParam);

    // FIXME: 4/14/2022
    @GetMapping("/getById")
    ResponseEntity<O> getById(Long id);
}
