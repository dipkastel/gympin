package com.notrika.gympin.persistence.dao.repository.finance.gateway;

import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceApplicationGatewayRepository extends BaseRepository<FinanceApplicationGatewayEntity, Long> {
    List<FinanceApplicationGatewayEntity> findAllByApplicationAndDeletedIsFalse(ApplicationEnum application);
}
