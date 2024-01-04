package com.notrika.gympin.controller.impl.qrCode;

import com.notrika.gympin.common.qrCodes.api.QrCodeController;
import com.notrika.gympin.common.qrCodes.dto.QrCodeDto;
import com.notrika.gympin.common.qrCodes.param.QrCodeParam;
import com.notrika.gympin.common.qrCodes.service.QrCodeService;
import com.notrika.gympin.common.settings.base.api.ApplicationConfigController;
import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.param.*;
import com.notrika.gympin.common.settings.base.service.ApplicationConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/qrCode")
public class QrCodeControllerImpl implements QrCodeController {

    @Autowired
    private QrCodeService qrCodeService;

    @Override
    @PostMapping("/getCode")
    public ResponseEntity<QrCodeDto> getCode(@RequestBody QrCodeParam param) throws Exception {
        return ResponseEntity.ok(qrCodeService.getCode(param));
    }
}
