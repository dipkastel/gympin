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

import java.util.stream.Collectors;

public final class GympinAppConvertor {

    public static MainPageLayoutItemEntity mainPageLayoutItemParamToEntity(MainPageLayoutItemParam param) {
        if (param.getItems() != null)
            return MainPageLayoutItemEntity.builder().id(param.getId()).type(param.getType()).priority(param.getPriority()).items(param.getItems().stream().map(GympinAppConvertor::mainPageLayoutChildItemParamToEntity).collect(Collectors.toList())).build();
        return MainPageLayoutItemEntity.builder().id(param.getId()).type(param.getType()).priority(param.getPriority()).build();

    }

    public static MainPageLayoutChildItemEntity mainPageLayoutChildItemParamToEntity(MainPageLayoutChildItemParam param) {
        return MainPageLayoutChildItemEntity.builder().id(param.getId()).imageUrl(param.getImageUrl()).title(param.getTitle()).description(param.getDescription()).data(param.getData()).priority(param.getPriority()).build();
    }

    public static MainPageLayoutItemDto mainPageLayoutItemDtoEntityToDto(MainPageLayoutItemEntity entity) {
        if (entity.getItems() != null)
            return MainPageLayoutItemDto.builder().type(entity.getType()).priority(entity.getPriority()).items(entity.getItems().stream().map(GympinAppConvertor::mainPageLayoutChildItemEntityToDto).collect(Collectors.toList())).build();
        return MainPageLayoutItemDto.builder().type(entity.getType()).priority(entity.getPriority()).build();
    }

    public static MainPageLayoutChildItemDto mainPageLayoutChildItemEntityToDto(MainPageLayoutChildItemEntity entity) {
        return MainPageLayoutChildItemDto.builder().id(entity.getId()).isDeleted(entity.isDeleted()).imageUrl(entity.getImageUrl()).title(entity.getTitle()).description(entity.getDescription()).destination(entity.getDestination()).data(entity.getData()).priority(entity.getPriority()).build();
    }

    public static MainPageLayoutCollectionEntity mainPageLayoutCollectionParamToEntity(MainPageLayoutCollectionParam param) {
        if (param.getLayoutItems() != null)
            return MainPageLayoutCollectionEntity.builder().id(param.getId()).name(param.getCollectionName()).items(param.getLayoutItems().stream().map(GympinAppConvertor::mainPageLayoutItemParamToEntity).collect(Collectors.toList())).build();
        return MainPageLayoutCollectionEntity.builder().id(param.getId()).name(param.getCollectionName()).build();
    }

    public static MainPageLayoutCollectionDto mainPageLayoutCollectionEntityToDto(MainPageLayoutCollectionEntity entity) {
        if (entity.getItems() != null)
            return MainPageLayoutCollectionDto.builder().id(entity.getId()).collectionName(entity.getName()).layoutItems(entity.getItems().stream().map(GympinAppConvertor::mainPageLayoutItemDtoEntityToDto).collect(Collectors.toList())).build();
        return MainPageLayoutCollectionDto.builder().id(entity.getId()).collectionName(entity.getName()).build();
    }
}
