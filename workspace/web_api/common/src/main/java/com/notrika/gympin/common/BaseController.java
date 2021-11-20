package com.notrika.gympin.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

public interface BaseController<I extends BaseParam<?>, O extends BaseDto<?>> {

    @PostMapping("/add")
    ResponseEntity<O> add(I i);

    @PutMapping("/update")
    ResponseEntity<O> update(I i);

    @DeleteMapping("/delete")
    ResponseEntity<O> delete(I i);

    @GetMapping("/getall")
    ResponseEntity<List<O>> getAll(BaseParam pagingParam);

    @GetMapping("/getbyid")
    ResponseEntity<O> getById(long id);
}
