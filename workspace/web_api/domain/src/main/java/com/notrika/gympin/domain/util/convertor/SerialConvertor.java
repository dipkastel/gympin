package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class SerialConvertor {

    public static SerialDto ToCompleteDto(FinanceSerialEntity entity) {
        if (entity == null) return null;
        SerialDto dto = new SerialDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setSerial(entity.getSerial());
        dto.setProcessType(entity.getProcessTypeEnum());
        dto.setUserTransactions(entity.getUserTransactions().stream().map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setCorporateTransactions(entity.getCorporateTransactions().stream().map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setPersonnelCreditTransactions(entity.getPersonnelCreditTransactions().stream().map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setIncomeTransactions(entity.getIncomeTransactions().stream().map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setUserIncreaseRequest(entity.getUserIncreases().stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList()));
        dto.setCorporateIncreaseRequest(entity.getCorporateIncreases().stream().map(IncreaseConvertor::ToDto).collect(Collectors.toList()));
        dto.setDiscountTransactions(entity.getDiscount().stream().map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setInvoices(entity.getInvoices().stream().map(InvoiceConvertor::toDto).collect(Collectors.toList()));
        dto.setPurchasedBases(entity.getPurchasedBases().stream().map(PurchasedConvertor::ToDto).collect(Collectors.toList()));
        return dto;
    }
    public static SerialDto ToDto(FinanceSerialEntity entity) {
        if (entity == null) return null;
        SerialDto dto = new SerialDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setSerial(entity.getSerial());
        dto.setProcessType(entity.getProcessTypeEnum());
        return dto;
    }
}
