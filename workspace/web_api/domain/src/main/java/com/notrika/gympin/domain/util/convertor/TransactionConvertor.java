package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;

public final class TransactionConvertor {


    public static TransactionDto toDto(TransactionEntity entity) {
        TransactionDto dto = new TransactionDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setCorporate(CorporateConvertor.toDto(entity.getCorporate()));
        dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setCorporatePersonnel(CorporateConvertor.toSecurePersonnelDto(entity.getCorporatePersonnel()));
        dto.setDescription(entity.getDescription());
        dto.setAmount(entity.getAmount());
        dto.setBalance(entity.getBalance());
        dto.setTransactionType(entity.getTransactionType());
        dto.setTransactionStatus(entity.getTransactionStatus());
        dto.setIsChecked(entity.getIsChecked());
        dto.setSerial(entity.getSerial());
        return dto;
    }
}
