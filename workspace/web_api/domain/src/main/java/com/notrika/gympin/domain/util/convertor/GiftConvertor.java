package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;

public final class GiftConvertor {

    public static GiftCreditDto toDto(ManageGiftCreditEntity entity) {
        if(entity==null) return null;
        GiftCreditDto dto = GiftCreditDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .code(entity.getCode())
                .amount(entity.getAmount())
                .registerCode(entity.getRegisterCode())
                .canRegister(entity.getCanRegister())
                .expireDate(entity.getExpireDate())
                .creditExpireDate(entity.getCreditExpireDate())
                .status(entity.getStatus())
                .build();
        try {
            dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        }catch (Exception e){}
        try {
            dto.setCorporate(CorporateConvertor.toDto(entity.getCorporate()));
        }catch (Exception e){}
        return dto;
    }
}
