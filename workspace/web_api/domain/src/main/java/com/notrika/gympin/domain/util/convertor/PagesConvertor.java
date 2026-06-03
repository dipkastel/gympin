package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.pages.dto.PagesDeadendDto;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.entity.pages.PagesItemEntity;
import com.notrika.gympin.persistence.entity.pages.PagesTypeEntity;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
public final class PagesConvertor {

    public static PagesItemDto toDtoWithChild(PagesItemEntity entity) {
        if(entity==null)return null;
        PagesItemDto dto = new PagesItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setUrl(entity.getUrl());
        dto.setViewType(entity.getViewType());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getItems()!=null&&entity.getItems().size() > 0) {
            Set<PagesItemDto> items = new HashSet<>();
            for (PagesItemEntity item : entity.getItems().stream()
                    .filter(o -> !o.isDeleted())
                    .sorted((a,b)->a.getPriority().compareTo(b.getPriority()))
                    .collect(Collectors.toList())) {
                items.add(toDtoWithChild(item));
            }
            dto.setItems((items));
        }
        return dto;
    }

    public static PagesItemEntity toEntityWithChild(PagesItemParam param) {
        if(param==null)return null;
        PagesItemEntity entity = new PagesItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setUrl(param.getUrl());
        entity.setViewType(param.getViewType());
        entity.setPriority(param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));
        if (entity.getItems().size() > 0) {
            Set<PagesItemEntity> items = new HashSet<>();
            for (PagesItemParam item : param.getItems()) {
                items.add(toEntityWithChild(item));
            }
            entity.setItems((items));
        }
        return entity;
    }


    public static PagesItemDto toDtoWithParent(PagesItemEntity entity) {
        if(entity==null)return null;
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        PagesItemDto dto = new PagesItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setUrl(entity.getUrl());
        dto.setViewType(entity.getViewType());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDtoWithParent(entity.getParent()));

        return dto;
    }

    public static PagesItemEntity toEntityWithParent(PagesItemParam param) {
        if(param==null)return null;
        log.info("mainPageLayoutChildItemParamToEntity is going to execute with param {}", param);
        PagesItemEntity entity = new PagesItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setUrl(param.getUrl());
        entity.setViewType(param.getViewType());
        entity.setPriority(param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));
        if (param.getParent() != null)
            entity.setParent(toEntityWithParent(param.getParent()));

        return entity;
    }

    public static PagesItemDto toTypeDto(PagesItemEntity entity) {
        if(entity==null)return null;
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        PagesItemDto dto = new PagesItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setUrl(entity.getUrl());
        dto.setViewType(entity.getViewType());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDtoWithParent(entity.getParent()));

        if (entity.getItems().size() > 0) {
            Set<PagesItemDto> items = new HashSet<>();
            for (PagesItemEntity item : entity.getItems().stream().filter(o -> !o.isDeleted()).collect(Collectors.toList())) {
                items.add(toDtoWithChild(item));
            }
            dto.setItems((items));
        }
        return dto;
    }


    public static PagesDeadendDto toDeadendDto(PagesItemEntity entity) {
        if(entity==null)return null;
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        PagesDeadendDto dto = new PagesDeadendDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setUrl(entity.getUrl());
        dto.setViewType(entity.getViewType());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDeadendDto(entity.getParent()));


        return dto;
    }

    //type
    public static PagesItemEntity toTypeEntity(PagesItemParam param) {
        if(param==null)return null;
        log.info("mainPageLayoutChildItemParamToEntity is going to execute with param {}", param);
        PagesItemEntity entity = new PagesItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setUrl(param.getUrl());
        entity.setViewType(param.getViewType());
        entity.setPriority(param.getPriority()==null?0:param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));

        if (param.getParent() != null)
            entity.setParent(toEntityWithParent(param.getParent()));


        if (entity.getItems() != null && entity.getItems().size() > 0) {
            Set<PagesItemEntity> items = new HashSet<>();
            for (PagesItemParam item : param.getItems().stream().filter(o -> !o.isDeleted()).collect(Collectors.toList())) {
                items.add(toEntityWithChild(item));
            }
            entity.setItems((items));
        }

        return entity;
    }

    public static List<PagesTypeDto> toTypeDto(List<PagesTypeEntity> entityList) {
        if(entityList==null)return null;
        return entityList.stream().filter(o->!o.isDeleted()).map(PagesConvertor::toTypeDto).collect(Collectors.toList());
    }

    public static PagesTypeDto toTypeDto(PagesTypeEntity entity) {
        if(entity==null)return null;
        PagesTypeDto dto = new PagesTypeDto();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        dto.setName(entity.getName());
        dto.setParent(entity.getParent());
        dto.setElements(new ArrayList<>(entity.getElements()));
        return dto;
    }

    public static PagesTypeEntity toTypeEntity(PagesTypeParam param) {
        if(param==null)return null;
        PagesTypeEntity entity = new PagesTypeEntity();
        entity.setId(param.getId());
        entity.setDescription(param.getDescription());
        entity.setType(param.getType());
        entity.setName(param.getName());
        entity.setParent(param.getParent());
        entity.setElements(new ArrayList<>(param.getElements()));
        return entity;
    }
}
