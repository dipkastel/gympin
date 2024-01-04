package com.notrika.gympin.common.qrCodes.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.qrCodes.enums.QrCodeType;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class QrCodeDto extends BaseDto<QrCodeDto> {

    @JsonProperty("QrCode")
    private String qrCode;

    @JsonProperty("Type")
    private QrCodeType type;


    @JsonProperty("ReferenceId")
    private Long referenceId;

    @JsonProperty("Description")
    private String description;

}
