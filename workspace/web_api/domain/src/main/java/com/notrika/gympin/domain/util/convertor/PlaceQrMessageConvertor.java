package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PlaceQrMessageConvertor {

    public static PlaceQrMessageEntity ToEntity(PlaceQrMessageParam param, PlaceGymEntity place) {
        PlaceQrMessageEntity entity = new PlaceQrMessageEntity();
        entity.setText(param.getText());
        entity.setReplaceText(param.getReplaceText());
        entity.setPlace(place);
        entity.setDeleted(param.isDeleted());
        return entity;
    }

    public static PlaceQrMessageDto ToDto(PlaceQrMessageEntity entity) {
        PlaceQrMessageDto dto = new PlaceQrMessageDto();
        dto.setId(entity.getId());
        dto.setText(entity.getText());
        dto.setReplace_text(entity.getReplaceText());
        dto.setPlace(PlaceConvertor.ToGymDto(entity.getPlace()));
        return dto;
    }


    public static List<PlaceQrMessageDto> ToDto(List<PlaceQrMessageEntity> placeQrMessageEntities) {
        return placeQrMessageEntities.stream().filter(o->!o.isDeleted()).map(PlaceQrMessageConvertor::ToDto).collect(Collectors.toList());
    }
}
