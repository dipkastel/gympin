package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.qrCodes.dto.QrCodeDto;
import com.notrika.gympin.persistence.entity.qrCode.QrCodeEntity;

public final class QrCodeConvertor {

    public static QrCodeDto toDto(QrCodeEntity entity) {
        QrCodeDto dto = QrCodeDto.builder()
                .id(entity.getId())
                .qrCode(entity.getCode())
                .type(entity.getQrCodeType())
                .description(entity.getDescription())
                .referenceId(entity.getReferenceId())
                .build();
        return dto;
    }
}
