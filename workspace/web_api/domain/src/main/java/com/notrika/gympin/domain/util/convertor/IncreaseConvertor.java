package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseCorporateDepositEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;

public final class IncreaseConvertor {

    public static FinanceIncreaseUserDepositDto ToDto(FinanceIncreaseUserDepositEntity entity) {
        if (entity == null) return null;
        FinanceIncreaseUserDepositDto dto = new FinanceIncreaseUserDepositDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        dto.setAmount(entity.getAmount());
        dto.setGatewayType(entity.getGatewayType());
        dto.setDepositStatus(entity.getDepositStatus());
        dto.setRefrence(entity.getRefrence());
        dto.setDescription(entity.getDescription());
        try {
            dto.setSerialDescription(entity.getSerial().getUserTransactions().get(0).getDescription());
        } catch (Exception e) {
        }

        return dto;
    }

    public static FinanceIncreaseCorporateDepositDto ToDto(FinanceIncreaseCorporateDepositEntity entity) {
        if (entity == null) return null;
        FinanceIncreaseCorporateDepositDto dto = new FinanceIncreaseCorporateDepositDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setCorporate(CorporateConvertor.toDto(entity.getCorporate()));
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        dto.setGatewayType(entity.getGatewayType());
        dto.setAmount(entity.getAmount());
        dto.setDepositStatus(entity.getDepositStatus());
        dto.setRefrence(entity.getRefrence());
        dto.setDescription(entity.getDescription());
        try {
            dto.setSerialDescription(entity.getSerial().getCorporateTransactions().get(0).getDescription());
        } catch (Exception e) {
        }


        return dto;
    }
}
