package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.serial.dto.CompleteSerialDto;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.suggest.dto.SuggestDto;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinancePaymentSuggestEntity;

import java.util.stream.Collectors;

public final class SuggestConvertor {

    public static SuggestDto ToDto(FinancePaymentSuggestEntity entity) {
        if (entity == null) return null;
        SuggestDto dto = new SuggestDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setAmount(entity.getAmount());
        dto.setApplication(entity.getApplication());
        dto.setPriority(entity.getPriority());
        return dto;
    }
}
