package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;

import java.util.stream.Collectors;

public final class CorporateConvertor {


    public static CorporateDto toDto(CorporateEntity entity) {
        if(entity==null) return null;
        CorporateDto dto = new CorporateDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setBalance(entity.getBalance());
        dto.setStatus(entity.getStatus());
        dto.setLogo(MultimediaConvertor.toDto(entity.getLogo()));
        return dto;
    }

    public static CorporatePersonnelDto toPersonnelDto(CorporatePersonnelEntity entity) {
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setCreditBalance(entity.getCreditBalance());
        if(entity.getCredits()!=null)
            dto.setCreditList(entity.getCredits().stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        return dto;
    }
    public static CorporatePersonnelDto toSimplePersonnelDto(CorporatePersonnelEntity entity) {
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setCreditBalance(entity.getCreditBalance());
        return dto;
    }

    public static CorporatePersonnelDto toSecurePersonnelDto(CorporatePersonnelEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoLessDetails(entity.getUser()));
        dto.setCreditBalance(entity.getCreditBalance());
        if(entity.getCredits()!=null)
            dto.setCreditList(entity.getCredits().stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        return dto;
    }

    public static CorporatePersonnelCreditDto toCreditDto(CorporatePersonnelCreditEntity entity) {
        CorporatePersonnelCreditDto dto = CorporatePersonnelCreditDto.builder()
                .id(entity.getId())
                .creditAmount(entity.getCreditAmount())
                .personnel(CorporateConvertor.toSimplePersonnelDto(entity.getCorporatePersonnel()))
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }
}
