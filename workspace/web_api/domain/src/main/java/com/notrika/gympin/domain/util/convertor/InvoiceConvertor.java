package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.invoice.dto.*;
import com.notrika.gympin.persistence.entity.finance.user.invoice.*;

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
                .corporate(CorporateConvertor.toDto(entity.getCorporate()))
                .invoiceFoods(entity.getInvoiceFoods()==null?null:entity.getInvoiceFoods().stream().filter(i->!i.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()))
                .invoiceSubscribes(entity.getInvoiceSubscribes()==null?null:entity.getInvoiceSubscribes().stream().filter(i->!i.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()))
                .invoiceBuyables(entity.getInvoiceBuyables()==null?null:entity.getInvoiceBuyables().stream().filter(i->!i.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()))
                .invoiceExtras(entity.getInvoiceExtraItems()==null?null:entity.getInvoiceExtraItems().stream().filter(i->!i.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()))
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
                .buyableType(entity.getBuyableType())
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .beneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()))
                .unitPrice(entity.getUnitPrice())
                .count(entity.getCount())
                .buyableDto(BuyableConvertor.ToDto(entity.getBuyable()))
                .build();
        return dto;
    }
    public static InvoiceExtraDto toDto(InvoiceExtraItemEntity entity) {
        if(entity==null) return null;
        InvoiceExtraDto dto = InvoiceExtraDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .name(entity.getName())
                .description(entity.getDescription())
                .placePrice(entity.getPlacePrice())
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .beneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()))
                .unitPrice(entity.getUnitPrice())
                .count(entity.getCount())
                .build();
        return dto;
    }
    public static InvoiceFoodsDto toDto(InvoiceFoodEntity entity) {
        if(entity==null) return null;
        InvoiceFoodsDto dto = InvoiceFoodsDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .name(entity.getName())
                .description(entity.getDescription())
                .date(entity.getDate())
                .discount(entity.getDiscount())
                .placePrice(entity.getPlacePrice())
                .buyableType(entity.getBuyableType())
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .beneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()))
                .unitPrice(entity.getUnitPrice())
                .count(entity.getCount())
                .isCount(entity.getFoodMenus().getFoodItem().getIsCount())
                .buyableDto(BuyableConvertor.ToDto(entity.getBuyable()))
                .build();
        return dto;
    }
    public static InvoiceSubscribesDto toDto(InvoiceSubscribeEntity entity) {
        if(entity==null) return null;
        InvoiceSubscribesDto dto = InvoiceSubscribesDto.builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .name(entity.getName())
                .gender(entity.getGender())
                .description(entity.getDescription())
                .discount(entity.getDiscount())
                .placePrice(entity.getPlacePrice())
                .buyableType(entity.getBuyableType())
                .place(PlaceConvertor.ToDto(entity.getPlace()))
                .beneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()))
                .unitPrice(entity.getUnitPrice())
                .count(entity.getCount())
                .buyableDto(BuyableConvertor.ToDto(entity.getBuyable()))
                .build();
        return dto;
    }

}
