package com.notrika.gympin.common._base.base;

import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

// FIXME: 4/14/2022 edit to standard rest resource convention
public interface BaseController<I extends BaseParam<?>, O extends BaseDto<?>, F extends BaseQuery<?>> {

    @PostMapping("/add")
    ResponseEntity<O> add(@RequestBody I i);

    @PutMapping("/update")
    ResponseEntity<O> update(@RequestBody I i);

    @PutMapping("/delete")
    ResponseEntity<O> delete(I i);

    // FIXME: 4/14/2022
    @GetMapping("/getAll")
    ResponseEntity<List<O>> getAll(BasePagedParam pagingParam);

    // FIXME: 4/14/2022
    @GetMapping("/getById")
    ResponseEntity<O> getById(Long id);

    @PostMapping("/query")
    ResponseEntity<Page<O>> query(@RequestBody F param);


}
