package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.transaction.dto.*;
import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;

import java.math.BigDecimal;

public final class TransactionConvertor {


    public static CorporateTransactionDto toDto(FinanceCorporateTransactionEntity entity) {
        if(entity==null) return null;
        CorporateTransactionDto dto = new CorporateTransactionDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setFinanceCorporate(toDto(entity.getFinanceCorporate()));
        dto.setDescription(entity.getDescription());
        dto.setAmount(entity.getAmount());
        dto.setLatestBalance(entity.getLatestBalance());
        dto.setTransactionStatus(entity.getTransactionStatus());
        dto.setTransactionCorporateType(entity.getTransactionCorporateType());
        dto.setIsChecked(entity.getIsChecked());
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        return dto;
    }
    public static UserTransactionDto toDto(FinanceUserTransactionEntity entity) {
        if(entity==null) return null;
        UserTransactionDto dto = new UserTransactionDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setDescription(entity.getDescription());
        dto.setPlace(PlaceConvertor.toSimpleDto(entity.getPlace()));
        dto.setPurchased(PurchasedConvertor.ToDto(entity.getPurchased()));
        dto.setFinanceUser(FinanceUserConvertor.toFinanceDto(entity.getFinanceUser()));
        dto.setAmount(entity.getAmount());
        dto.setLatestBalance(entity.getLatestBalance());
        dto.setTransactionStatus(entity.getTransactionStatus());
        dto.setIsChecked(entity.getIsChecked());
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        return dto;
    }
    public static PersonnelCreditTransactionDto toDto(FinanceCorporatePersonnelCreditTransactionEntity entity) {
        if(entity==null) return null;
        PersonnelCreditTransactionDto dto = new PersonnelCreditTransactionDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setDescription(entity.getDescription());
        dto.setAmount(entity.getAmount());
        dto.setLatestBalance(entity.getLatestBalance());
        dto.setTransactionStatus(entity.getTransactionStatus());
        dto.setIsChecked(entity.getIsChecked());
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
        dto.setPersonnelCredit(CorporateConvertor.toCreditDto(entity.getPersonnelCredit()));
        try {
            dto.setCurrentTotalCredit(entity.getPersonnelCredit().getCorporatePersonnel().getCredits().stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}

        return dto;
    }
    public static TransactionAllDto toDto(BaseTransactionEntity entity) {
        if(entity==null) return null;
        TransactionAllDto dto = new TransactionAllDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setAmount(entity.getAmount());
        dto.setTransactionStatus(entity.getTransactionStatus());
        dto.setDescription(entity.getDescription());
        dto.setLatestBalance(entity.getLatestBalance());
        dto.setTransactionType(entity.getTransactionType());
        return dto;
    }
    public static FinanceCorporateDto toDto(FinanceCorporateEntity entity) {
        if(entity==null) return null;
        FinanceCorporateDto dto = new FinanceCorporateDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setCorporate(CorporateConvertor.toDto(entity.getCorporate()));
        dto.setTotalDeposit(entity.getTotalDeposit());
        dto.setTotalCredits(entity.getTotalCredits());
        return dto;
    }
    public static FinanceCorporateDto toSimpleDto(FinanceCorporateEntity entity) {
        if(entity==null) return null;
        FinanceCorporateDto dto = new FinanceCorporateDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setTotalDeposit(entity.getTotalDeposit());
        dto.setTotalCredits(entity.getTotalCredits());
        return dto;
    }
    private static FinanceUserDto toDto(FinanceUserEntity entity) {
        if(entity==null) return null;
        FinanceUserDto dto = new FinanceUserDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setTotalDeposit(entity.getTotalDeposit());
        return dto;
    }

    public static IncomeTransactionDto toDto(FinanceIncomeTransactionEntity entity) {
        if(entity==null) return null;
        IncomeTransactionDto dto = IncomeTransactionDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .amount(entity.getAmount())
                .latestBalance(entity.getLatestBalance())
                .purchased(PurchasedConvertor.ToDto(entity.getPurchased()))
                .isChecked(entity.getIsChecked())
                .description(entity.getDescription())
                .transactionStatus(entity.getTransactionStatus())
                .transactionType(entity.getTransactionType())
                .build();
        return dto;
    }


    public static DiscountTransactionDto toDto(FinanceDiscountTransactionEntity entity) {
        if(entity==null) return null;
        DiscountTransactionDto dto = DiscountTransactionDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .amount(entity.getAmount())
                .purchased(PurchasedConvertor.ToDto(entity.getPurchased()))
                .latestBalance(entity.getLatestBalance())
                .isChecked(entity.getIsChecked())
                .description(entity.getDescription())
                .build();
        return dto;
    }
}
