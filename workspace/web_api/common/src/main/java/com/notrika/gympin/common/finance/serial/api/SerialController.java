package com.notrika.gympin.common.finance.serial.api;

import com.notrika.gympin.common.finance.serial.dto.CompleteSerialDto;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.CorporateTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;


public interface SerialController extends BaseController<SerialParam, SerialDto, SerialQuery> {

    ResponseEntity<CompleteSerialDto> getBySerial(String serial);
}
