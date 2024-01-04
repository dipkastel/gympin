package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceBuyableDto;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;

import java.util.stream.Collectors;

public final class InvoiceConvertor {

    public static InvoiceDto toDto(InvoiceEntity entity) {
        if(entity==null) return null;
        InvoiceDto dto = InvoiceDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .user(UserConvertor.toDtoLessDetails(entity.getUser()))
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .status(entity.getStatus())
                .userFullName(entity.getFullName())
                .userPhonNumber(entity.getPhoneNumber())
                .gender(entity.getGender())
                .nationalCode(entity.getNationalCode())
                .totalPrice(entity.getTotalPrice())
                .priceToPay(entity.getPriceToPay())
                .invoiceBuyables(entity.getInvoiceBuyables()==null?null:entity.getInvoiceBuyables().stream().filter(i->!i.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()))
                .build();
        return dto;
    }
    public static InvoiceBuyableDto toDto(InvoiceBuyableEntity entity) {
        if(entity==null) return null;
        InvoiceBuyableDto dto = InvoiceBuyableDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .name(entity.getName())
                .description(entity.getDescription())
                .discount(entity.getDiscount())
                .placePrice(entity.getPlacePrice())
                .gender(entity.getGender())
                .buyableType(entity.getBuyableType())
                .place(PlaceConvertor.toDto(entity.getPlace()))
                .beneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()))
                .unitPrice(entity.getUnitPrice())
                .count(entity.getCount())
                .buyableDto(BuyableConvertor.ToDto(entity.getBuyable()))
                .build();
        return dto;
    }

}
