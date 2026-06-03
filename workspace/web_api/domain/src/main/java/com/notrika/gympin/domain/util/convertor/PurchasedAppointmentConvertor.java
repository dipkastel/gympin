package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.purchased.purchasedAppointment.dto.PurchasedAppointmentDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.persistence.entity.purchased.purchasedAppointment.PurchasedAppointmentEntity;

import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

public final class PurchasedAppointmentConvertor {
    public static PurchasedAppointmentDto toDto(PurchasedAppointmentEntity entity, SettingsService settingsService) {
        if (entity == null) return null;
        Boolean useExpire = null;
        Calendar c = Calendar.getInstance();
        c.setTime(entity.getCreatedDate());
        c.add(Calendar.HOUR, getTicketUsageThreshold(settingsService));
        useExpire = (c.getTime().before(new Date()));
        PurchasedAppointmentDto dto = PurchasedAppointmentDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .ticketAppointment(TicketAppointmentConvertor.toDto(entity.getTicketAppointment()))
                .user(UserConvertor.toDtoSimple(entity.getCustomer()))
                .name(entity.getName())
                .price(entity.getSellPrice())
                .placePrice(entity.getPlacePrice())
                .key(entity.getKey())
                .serial(entity.getSerials().stream().map(SerialConvertor::ToDto).collect(Collectors.toList()))
                .description(entity.getDescription())
                .timing(entity.getTiming())
                .AppointmentDate(entity.getAppointmentDate())
                .expireDate(entity.getExpireDate())
                .useExpire(useExpire)
                .useExpireDate(c.getTime())
                .build();
        return dto;
    }

    public static Integer getTicketUsageThreshold(SettingsService settingsService) {
        try {
            return Integer.parseInt(settingsService.getByKey("TICKET_USAGE_THRESHOLD").getValue());
        } catch (Exception e) {
            return 72;
        }
    }


}
