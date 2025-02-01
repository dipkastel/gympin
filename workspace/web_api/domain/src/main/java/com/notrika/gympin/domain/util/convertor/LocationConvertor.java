package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.location.dto.*;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;

import java.util.stream.Collectors;

public final class LocationConvertor {


    public static LocationDto toDto(ManageLocationEntity entity) {
        if(entity==null) return null;
        LocationDto dto = new LocationDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLocationType(entity.getLocationType());
        dto.setCenterLat(entity.getCenterLat());
        dto.setCenterLng(entity.getCenterLng());
        dto.setMapPolygon(entity.getMapPolygon());
        try{
            dto.setParentName(entity.getParent().getName());
        }catch (Exception e){}
        try{
            dto.setParentName2(entity.getParent().getParent().getName());
        }catch (Exception e){}
        try{
            dto.setParentName3(entity.getParent().getParent().getParent().getName());
        }catch (Exception e){}
        return dto;
    }
    public static LocationDto toDtoWithChilds(ManageLocationEntity entity) {
        if(entity==null) return null;
        LocationDto dto = new LocationDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLocationType(entity.getLocationType());
        dto.setCenterLat(entity.getCenterLat());
        dto.setCenterLng(entity.getCenterLng());
        dto.setMapPolygon(entity.getMapPolygon());
        if(entity.getChildes()!=null)
            dto.setChildes(entity.getChildes().stream().filter(p-> !p.isDeleted()).map(LocationConvertor::toDto).collect(Collectors.toList()));
        return dto;
    }
    public static LocationDto toDtoWithParrent(ManageLocationEntity entity) {
        if(entity==null) return null;
        LocationDto dto = new LocationDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLocationType(entity.getLocationType());
        dto.setCenterLat(entity.getCenterLat());
        dto.setCenterLng(entity.getCenterLng());
        dto.setMapPolygon(entity.getMapPolygon());
        if(entity.getParent()!=null)
            dto.setParent(toDto(entity.getParent()));
        return dto;
    }
}
