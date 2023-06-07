package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelGateAccessDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.domain.place.PlacePersonnelServiceImpl;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelGateAccessEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public final class PlaceConvertor {


    public static List<PlaceDto> toDto(Collection<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::toDtoSecure).collect(Collectors.toList());
    }

    public static Page<PlaceDto> toDto(Page<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.map(PlaceConvertor::toDtoSecure);
    }

    public static PlaceDto toDto(PlaceEntity entity) {
        if (entity == null) return null;
        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        placeDto.setName(entity.getName());
        placeDto.setLatitude(entity.getLatitude());
        placeDto.setLongitude(entity.getLongitude());
        placeDto.setAddress(entity.getAddress());
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setStatus(entity.getStatus());
        placeDto.setCommissionFee(entity.getCommissionFee());
        placeDto.setBalance(entity.getBalance());
        if (entity.getSportPlaces() != null)
            placeDto.setSports(SportConvertor.toDto(entity.getSportPlaces().stream().filter(p->!p.isDeleted()).map(SportPlaceEntity::getSport).collect(Collectors.toList())));
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        placeDto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        return placeDto;
    }
    public static PlaceDto toDtoSecure(PlaceEntity entity) {
        if (entity == null) return null;
        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        placeDto.setName(entity.getName());
        placeDto.setLatitude(entity.getLatitude());
        placeDto.setLongitude(entity.getLongitude());
        placeDto.setAddress(entity.getAddress());
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setStatus(entity.getStatus());
        if (entity.getSportPlaces() != null)
            placeDto.setSports(SportConvertor.toDto(entity.getSportPlaces().stream().filter(p->!p.isDeleted()).map(SportPlaceEntity::getSport).collect(Collectors.toList())));
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        placeDto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        return placeDto;
    }
    public static PlaceParam toParm(PlaceEntity entity) {
        if (entity == null) return null;
        PlaceParam placeParam = new PlaceParam();
        placeParam.setId(entity.getId());
        placeParam.setName(entity.getName());
        placeParam.setStatus(entity.getStatus());
        return placeParam;
    }

    public static PlaceAboutDto AboutToDto(PlaceAboutEntity entity) {
        if (entity == null) return null;
        return PlaceAboutDto
                .builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .updatedDate(entity.getUpdatedDate())
                .isDeleted(entity.isDeleted())
                .name(entity.getName())
                .description(entity.getDescription())
                .acceptable(entity.getAcceptable())
                .active(entity.getActive())
                .place(toDto(entity.getPlace()))
                .build();
    }

    public static PlacePersonnelDto personnelToDto(PlacePersonnelEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .placeDto(toDto(entity.getPlace()))
                .userDto(UserConvertor.toDtoComplete(entity.getUser()))
                .userRole(entity.getUserRole())
                .build();
    }

    public static PlacePersonnelAccessDto personnelAccessToDto(PlacePersonnelAccessEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelAccessDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .section(entity.getSection())
                .access(entity.getAccess())
                .build();
    }
    public static PlacePersonnelGateAccessDto personnelGateAccessToDto(PlacePersonnelGateAccessEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelGateAccessDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .gate(GateConvertor.convertToDto(entity.getGate()))
                .access(entity.getAccess())
                .build();
    }

    public static List<PlacePersonnelAccessDto> personnelAccessToDto(List<PlacePersonnelAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::personnelAccessToDto).collect(Collectors.toList());

    }

    public static List<PlacePersonnelGateAccessDto> personnelGateAccessToDto(List<PlacePersonnelGateAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::personnelGateAccessToDto).collect(Collectors.toList());

    }
}
