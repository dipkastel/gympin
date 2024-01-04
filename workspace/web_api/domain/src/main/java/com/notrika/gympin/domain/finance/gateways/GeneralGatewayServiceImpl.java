package com.notrika.gympin.domain.finance.gateways;


import com.notrika.gympin.common.finance.gateway.service.GeneralGatewayService;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceApplicationGatewayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneralGatewayServiceImpl implements GeneralGatewayService {


//    @Autowired
//    FinanceApplicationGatewayRepository financeApplicationGatewayRepository;
//
//
//    public List<GatewaysDto> getPaymentGateways(GatewaysParam param) {
//        List<FinanceApplicationGatewayEntity> gatewayes = financeApplicationGatewayRepository.findAllByApplicationAndDeletedIsFalse(param.getApplication());
//        return gatewayes.stream().map(GatewayConvertor::toDto).collect(Collectors.toList());
//    }
}
