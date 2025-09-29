package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import lombok.ToString;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FinanceSerialRepository extends BaseRepository<FinanceSerialEntity, Long> {

    FinanceSerialEntity findBySerialAndDeletedIsFalse(String serial);

    @Query("select fse from FinanceSerialEntity fse " +
            "join fse.userIncreases ui " +
            "where ui.gatewayType is :gatewayType " +
            "and ui.depositStatus is :depositStatus")
    List<FinanceSerialEntity> findAllUserPendingPayments(GatewayType gatewayType, DepositStatus depositStatus);

    @Query("select fse from FinanceSerialEntity fse " +
            "join fse.corporateIncreases ci " +
            "where ci.gatewayType is :gatewayType " +
            "and ci.depositStatus is :depositStatus")
    List<FinanceSerialEntity> findAllCorporatePendingPayments(GatewayType gatewayType, DepositStatus depositStatus);
}
