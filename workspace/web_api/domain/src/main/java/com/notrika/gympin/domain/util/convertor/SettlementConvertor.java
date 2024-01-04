package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseCorporateDepositEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.settlement.FinanceSettlementUserDepositEntity;

public final class SettlementConvertor {

    public static FinanceSettlementUserDepositDto ToDto(FinanceSettlementUserDepositEntity entity) {
        if (entity == null) return null;
        FinanceSettlementUserDepositDto dto = new FinanceSettlementUserDepositDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setUserDto(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        dto.setAmount(entity.getAmount());
        dto.setSettlementStatus(entity.getSettlementStatus());
        try {
            dto.setDescription(entity.getSerial().getUserTransactions().get(0).getDescription());
        } catch (Exception e) {
        }

        return dto;
    }
}
