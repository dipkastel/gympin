package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.persistence.entity.finance.affiliate.FinanceAffiliatorEntity;

public final class AffiliateConvertor {


    public static AffiliateDto toDto(FinanceAffiliatorEntity entity) {
        if (entity == null) return null;
        AffiliateDto dto = new AffiliateDto();
        dto.setId(entity.getId());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setCommissionFee(entity.getCommissionFee());
        dto.setUsername(entity.getUsername());
        dto.setIncome(entity.getIncome());
        try {
            dto.setCorporateCount(entity.getCorporates().size());
        }catch (Exception e){}
        try {
            dto.setPlaceCount(entity.getPlaces().size());
        }catch (Exception e){}
        dto.setAffiliatorStatus(entity.getAffiliatorStatus());
        return dto;
    }

}
