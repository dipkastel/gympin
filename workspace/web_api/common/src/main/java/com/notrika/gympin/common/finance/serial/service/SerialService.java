package com.notrika.gympin.common.finance.serial.service;

import com.notrika.gympin.common.finance.serial.dto.CompleteSerialDto;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.IncomeTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.IncomeTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import lombok.NonNull;

public interface SerialService extends BaseService<SerialParam, SerialDto, SerialQuery> {

    CompleteSerialDto getBySerial(String serial);
}
