package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto;
import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseEntryDto;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntryEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PurchasedCourseConvertor {

    public static PurchasedCourseDto toDto(PurchasedCourseEntity entity) {
        if(entity==null) return null;
        PurchasedCourseDto dto = PurchasedCourseDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .ticketCourse(TicketCourseConvertor.toDto(entity.getTicketCourse()))
                .user(UserConvertor.toDtoSimple(entity.getCustomer()))
                .name(entity.getName())
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .price(entity.getSellPrice())
                .placePrice(entity.getPlacePrice())
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .classCapacity(entity.getClassCapacity())
                .targetOfCourse(entity.getTargetOfCourse())
                .ageLimit(entity.getAgeLimit())
                .entryList(toDto(entity.getEntryList()))
                .coaches(entity.getCoaches().stream().map(UserConvertor::toDtoSimple).collect(Collectors.toList()))
                .courseCapacity(entity.getCourseCapacity())
                .courseLevel(entity.getCourseLevel())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .startSellingDate(entity.getStartSellingDate())
                .endSellingDate(entity.getEndSellingDate())
                .build();
        return dto;
    }

    private static List<PurchasedCourseEntryDto> toDto(List<PurchasedCourseEntryEntity> entryList) {
        if (entryList == null) return null;
        return entryList.stream().map(PurchasedCourseConvertor::toDto).collect(Collectors.toList());
    }

    public static PurchasedCourseEntryDto toDto(PurchasedCourseEntryEntity entity) {
        PurchasedCourseEntryDto dto = PurchasedCourseEntryDto.builder()
                .id(entity.getId())
                .enterDate(entity.getEnterDate())
                .exitDate(entity.getExitDate())
                .courseEntryStatus(entity.getCourseEntryStatus())
                .build();
        return dto;
    }


}