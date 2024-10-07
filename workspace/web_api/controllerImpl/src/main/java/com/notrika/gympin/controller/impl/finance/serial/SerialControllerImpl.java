package com.notrika.gympin.controller.impl.finance.serial;

import com.notrika.gympin.common.finance.serial.api.SerialController;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.serial.service.SerialService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/serial")
public class SerialControllerImpl implements SerialController {

    @Autowired
    SerialService serialService;

    @Override
    public ResponseEntity<SerialDto> add(SerialParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<SerialDto> update(SerialParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<SerialDto> delete(SerialParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<List<SerialDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(serialService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<SerialDto> getById(Long id) {
        return ResponseEntity.ok(serialService.getById(id));
    }

    @Override
    @GetMapping("getBySerial")
    public ResponseEntity<SerialDto> getBySerial(String serial) {
        return ResponseEntity.ok(serialService.getBySerial(serial));
    }

    @Override
    public ResponseEntity<Page<SerialDto>> query(SerialQuery param) {
        return ResponseEntity.ok(serialService.query(param));
    }

}
