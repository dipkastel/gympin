package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutChildItemDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutChildItemParam;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutChildItemEntity;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutCollectionEntity;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutItemEntity;
import lombok.extern.slf4j.Slf4j;

import java.util.stream.Collectors;

@Slf4j
public final class GympinAppConvertor {

    public static MainPageLayoutItemEntity mainPageLayoutItemParamToEntity(MainPageLayoutItemParam param) {
        log.info("MainPageLayoutItemEntity mainPageLayoutItemParamToEntity is going to execute with param {}",param);
        if(param==null) return null;
        MainPageLayoutItemEntity entity=new MainPageLayoutItemEntity();
        entity.setId(param.getId());
        entity.setType(param.getType());
        entity.setPriority(param.getPriority());
        if (param.getItems() != null) {
            entity.setItems(param.getItems().stream().map(GympinAppConvertor::mainPageLayoutChildItemParamToEntity).collect(Collectors.toList()));
        }
        return entity;
    }

    public static MainPageLayoutChildItemEntity mainPageLayoutChildItemParamToEntity(MainPageLayoutChildItemParam param) {
        log.info("mainPageLayoutChildItemParamToEntity is going to execute with param {}", param);
        MainPageLayoutChildItemEntity entity=new MainPageLayoutChildItemEntity();
        entity.setId(param.getId());
        entity.setImageUrl(param.getImageUrl());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setPriority(param.getPriority());
        return entity;
    }

    public static MainPageLayoutItemDto mainPageLayoutItemDtoEntityToDto(MainPageLayoutItemEntity entity) {
        log.info("MainPageLayoutItemDto mainPageLayoutItemDtoEntityToDto is going to execute with param {}",entity);
        if(entity==null) return null;
        MainPageLayoutItemDto dto=new MainPageLayoutItemDto();
        dto.setId(entity.getId());
        dto.setType(entity.getType());
        dto.setPriority(entity.getPriority());
        if (entity.getItems() != null) {
            dto.setItems(entity.getItems().stream().map(GympinAppConvertor::mainPageLayoutChildItemEntityToDto).collect(Collectors.toList()));
        }
        return dto;
    }

    public static MainPageLayoutChildItemDto mainPageLayoutChildItemEntityToDto(MainPageLayoutChildItemEntity entity) {
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        MainPageLayoutChildItemDto dto=new MainPageLayoutChildItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setImageUrl(entity.getImageUrl());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setPriority(entity.getPriority());
        return dto;
    }

    public static MainPageLayoutCollectionEntity mainPageLayoutCollectionParamToEntity(MainPageLayoutCollectionParam param) {
        log.info("MainPageLayoutCollectionEntity mainPageLayoutCollectionParamToEntity is going to execute with param {}", param);
        if (param == null) return null;
        MainPageLayoutCollectionEntity entity = new MainPageLayoutCollectionEntity();
        entity.setId(param.getId());
        entity.setName(param.getCollectionName());
        entity.setDescription(param.getDescription());
        if (param.getLayoutItems() != null) {
            entity.setItems(param.getLayoutItems().stream().map(GympinAppConvertor::mainPageLayoutItemParamToEntity).collect(Collectors.toList()));
        }
        return entity;
    }

    public static MainPageLayoutCollectionDto mainPageLayoutCollectionEntityToDto(MainPageLayoutCollectionEntity entity) {
        log.info("MainPageLayoutCollectionDto mainPageLayoutCollectionEntityToDto is going to execute with param {}", entity);
        if (entity == null) return null;
        MainPageLayoutCollectionDto dto = new MainPageLayoutCollectionDto();
        dto.setId(entity.getId());
        dto.setCollectionName(entity.getName());
        dto.setDescription(entity.getDescription());
        if (entity.getItems() != null) {
            dto.setLayoutItems(entity.getItems().stream().map(GympinAppConvertor::mainPageLayoutItemDtoEntityToDto).collect(Collectors.toList()));
        }
        return dto;
    }
}
