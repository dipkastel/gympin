package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.stream.Collectors;

public final class CorporateConvertor {


    public static CorporateDto toDto(CorporateEntity entity) {
        if (entity == null) return null;
        CorporateDto dto = new CorporateDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        if (entity.getFinanceCorporate() != null)
            dto.setFinanceCorporate(TransactionConvertor.toSimpleDto(entity.getFinanceCorporate()));
        dto.setStatus(entity.getStatus());
        dto.setContractType(entity.getContractType());
        dto.setLogo(MultimediaConvertor.toDto(entity.getLogo()));
        dto.setDefaultExpireDuration(entity.getDed());
        try{
            dto.setContractDate(entity.getContractDate());
            Calendar expireDate = Calendar.getInstance();
            expireDate.setTime(entity.getContractDate());
            expireDate.add(Calendar.YEAR, 1);
            dto.setContractExpireDate(expireDate.getTime());
        }catch (Exception e){}
        return dto;
    }

    public static CorporatePersonnelGroupDto toDto(CorporatePersonnelGroupEntity entity) {
        if (entity == null) return null;
        CorporatePersonnelGroupDto dto = new CorporatePersonnelGroupDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

    public static CorporatePersonnelDto toPersonnelDto(CorporatePersonnelEntity entity) {
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setPersonnelGroup(toDto(entity.getPersonnelGroup()));
        if (entity.getCredits() != null)
            dto.setCreditList(entity.getCredits().stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        return dto;
    }

    public static CorporatePersonnelDto toSimplePersonnelDto(CorporatePersonnelEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        return dto;
    }

    public static CorporatePersonnelDto toSecurePersonnelDto(CorporatePersonnelEntity entity) {
        if (entity == null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setPersonnelGroup(toDto(entity.getPersonnelGroup()));
        dto.setUser(UserConvertor.toDtoLessDetails(entity.getUser()));
        dto.setPersonnelGroup(toDto(entity.getPersonnelGroup()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        if (entity.getCredits() != null)
            dto.setCreditList(entity.getCredits().stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        return dto;
    }

    public static CorporatePersonnelCreditDto toCreditDto(FinanceCorporatePersonnelCreditEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelCreditDto dto = CorporatePersonnelCreditDto.builder()
                .id(entity.getId())
                .creditAmount(entity.getCreditAmount())
                .personnel(CorporateConvertor.toSimplePersonnelDto(entity.getCorporatePersonnel()))
                .expireDate(entity.getExpireDate())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }
}
