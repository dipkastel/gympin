package com.notrika.gympin.persistence.dao.repository.finance.gateway;

import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceGatewayEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceGatewayRepository extends BaseRepository<FinanceGatewayEntity, Long> {

    FinanceGatewayEntity findByGatewayType(GatewayType gatewayType);

}
