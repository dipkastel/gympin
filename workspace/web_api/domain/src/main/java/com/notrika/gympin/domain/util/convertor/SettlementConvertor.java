package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceSettlementUserDepositRequestEntity;

public final class SettlementConvertor {

    public static FinanceSettlementUserDepositDto ToDto(FinanceSettlementUserDepositRequestEntity entity) {
        if (entity == null) return null;
        FinanceSettlementUserDepositDto dto = new FinanceSettlementUserDepositDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setFinanceUser(FinanceUserConvertor.toFinanceDto(entity.getFinanceUser()));
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
