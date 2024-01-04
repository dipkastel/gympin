package com.notrika.gympin.common.qrCodes.service;

import com.notrika.gympin.common.qrCodes.dto.QrCodeDto;
import com.notrika.gympin.common.qrCodes.param.QrCodeParam;
import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.param.*;
import org.springframework.http.ResponseEntity;

public interface QrCodeService {

     QrCodeDto getCode(QrCodeParam param) throws Exception;

}
