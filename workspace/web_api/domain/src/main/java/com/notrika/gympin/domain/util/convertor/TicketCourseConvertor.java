package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;

import java.util.stream.Collectors;

public class TicketCourseConvertor {

    public static TicketCourseDto toDto(TicketCourseEntity entity) {
        TicketCourseDto dto = new TicketCourseDto();
        dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setEnable(entity.getEnable());
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        dto.setEntryTotalCount(entity.getEntryTotalCount());
        dto.setStatus(entity.getCourseStatus());
        dto.setTargetOfCourse(entity.getTargetOfCourse());
        dto.setAutoRenew(entity.getAutoRenew());
        dto.setClassCapacity(entity.getClassCapacity());
        dto.setAgeLimit(entity.getAgeLimit());
        dto.setTiming(entity.getTiming());
        dto.setCourseCapacity(entity.getCourseCapacity());
        dto.setCourseLevel(entity.getCourseLevel());
        dto.setStartDate(entity.getStartDate());
        dto.setExpireDuration(entity.getExpireDuration());
        dto.setDayBeforeRenew(entity.getDayBeforeRenew());
        dto.setDayBeforeStartSell(entity.getDayBeforeStartSell());
        dto.setDayAfterStartSell(entity.getDayAfterStartSell());
        if(entity.getCoaches()!=null)
            dto.setCoaches(entity.getCoaches().stream().map(UserConvertor::toCoachDto).collect(Collectors.toList()));


        return dto;
    }

}
