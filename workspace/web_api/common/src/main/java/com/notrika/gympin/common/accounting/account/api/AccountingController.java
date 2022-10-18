package com.notrika.gympin.common.accounting.account.api;

import com.notrika.gympin.common.accounting.account.dto.GatewayRequestDto;
import com.notrika.gympin.common.accounting.account.dto.OverallSportsTransactionDto;
import com.notrika.gympin.common.accounting.account.dto.SemiOverallTransactionDto;
import com.notrika.gympin.common.accounting.account.param.GatewayRequestParam;
import org.springframework.http.ResponseEntity;

public interface AccountingController {

    ResponseEntity<SemiOverallTransactionDto> getSemiOverallTransactions();

    ResponseEntity<OverallSportsTransactionDto> getSportsOverallTransaction();

    ResponseEntity<GatewayRequestDto> getGatewayRequestToken(GatewayRequestParam gatewayRequestParam);

}
