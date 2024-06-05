package com.notrika.gympin.controller.impl.settings.sms;

import com.notrika.gympin.common.settings.sms.api.SmsController;
import com.notrika.gympin.common.settings.sms.dto.PatternDto;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.param.SmsPatternParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sms")
public class SmsControllerImpl implements SmsController {

    @Autowired
    private SmsService smsService;

    @Override
    public ResponseEntity<SmsDto> add(SmsParam param) {
        return ResponseEntity.ok(smsService.add(param));
    }

    @Override
    public ResponseEntity<SmsDto> update(SmsParam param) {
        return ResponseEntity.ok(smsService.update(param));
    }

    @Override
    public ResponseEntity<SmsDto> delete(SmsParam param) {
        return ResponseEntity.ok(smsService.delete(param));
    }

    @Override
    public ResponseEntity<List<SmsDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(smsService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<SmsDto> getById(Long id) {
        return ResponseEntity.ok(smsService.getById(id));
    }

    @Override
    public ResponseEntity<Page<SmsDto>> query(SmsQuery filter) {
        return ResponseEntity.ok(smsService.query(filter));
    }

    @Override
    @PostMapping("changeSmsStatus")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Boolean> changeSmsStatus(SmsParam smsParam) throws Exception{
        return ResponseEntity.ok(smsService.changeSmsStatus(smsParam));
    }

    @Override
    @GetMapping("getAllPatterns")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<PatternDto>> getAllPaterns() throws Exception {
        return ResponseEntity.ok(smsService.getAllPatterns());
    }

    @Override
    @PostMapping("updatePattern")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PatternDto> updatePattern(SmsPatternParam smsPatternParam) throws Exception{
        return ResponseEntity.ok(smsService.updatePattern(smsPatternParam));
    }
    @Override
    @PostMapping("addPattern")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PatternDto> addPattern(SmsPatternParam smsPatternParam) throws Exception{
        return ResponseEntity.ok(smsService.addPattern(smsPatternParam));
    }
}
