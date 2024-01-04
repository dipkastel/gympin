package com.notrika.gympin.controller.impl.finance.suggest;

import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.suggest.api.SuggestController;
import com.notrika.gympin.common.finance.suggest.dto.SuggestDto;
import com.notrika.gympin.common.finance.suggest.param.SuggestParam;
import com.notrika.gympin.common.finance.suggest.query.SuggestQuery;
import com.notrika.gympin.common.finance.suggest.service.SuggestService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suggest")
public class SuggestControllerImpl implements SuggestController {

    @Autowired
    SuggestService suggestService;

    @Override
    public ResponseEntity<SuggestDto> add(SuggestParam param) {
        return ResponseEntity.ok(suggestService.add(param));
    }

    @Override
    public ResponseEntity<SuggestDto> update(SuggestParam param) {
        return ResponseEntity.ok(suggestService.update(param));
    }

    @Override
    public ResponseEntity<SuggestDto> delete(SuggestParam param) {
        return ResponseEntity.ok(suggestService.delete(param));
    }

    @Override
    public ResponseEntity<List<SuggestDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(suggestService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<SuggestDto> getById(Long id) {
        return ResponseEntity.ok(suggestService.getById(id));
    }


    @Override
    public ResponseEntity<Page<SuggestDto>> query(SuggestQuery param) {
        return ResponseEntity.ok(suggestService.query(param));
    }

}
