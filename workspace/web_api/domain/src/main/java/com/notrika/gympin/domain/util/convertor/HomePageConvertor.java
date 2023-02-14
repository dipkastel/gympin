package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDeadendDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDestinationDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageItemDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageTypeDto;
import com.notrika.gympin.common.gympin.homePage.param.HomePageDestinationParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageItemParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageTypeParam;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.entity.homePage.HomePageDestionationEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageItemEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageTypeEntity;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public final class HomePageConvertor {

    public static HomePageItemDto toDtoWithChild(HomePageItemEntity entity) {
        HomePageItemDto dto = new HomePageItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getItems().size() > 0) {
            Set<HomePageItemDto> items = new HashSet<>();
            for (HomePageItemEntity item : entity.getItems()) {
                items.add(toDtoWithChild(item));
            }
            dto.setItems((items));
        }
        return dto;
    }

    public static HomePageItemEntity toEntityWithChild(HomePageItemParam param) {
        HomePageItemEntity entity = new HomePageItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setPriority(param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));
        if (entity.getItems().size() > 0) {
            Set<HomePageItemEntity> items = new HashSet<>();
            for (HomePageItemParam item : param.getItems()) {
                items.add(toEntityWithChild(item));
            }
            entity.setItems((items));
        }
        return entity;
    }


    public static HomePageItemDto toDtoWithParent(HomePageItemEntity entity) {
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        HomePageItemDto dto = new HomePageItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDtoWithParent(entity.getParent()));

        return dto;
    }

    public static HomePageItemEntity toEntityWithParent(HomePageItemParam param) {
        log.info("mainPageLayoutChildItemParamToEntity is going to execute with param {}", param);
        HomePageItemEntity entity = new HomePageItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setPriority(param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));
        if (param.getParent() != null)
            entity.setParent(toEntityWithParent(param.getParent()));

        return entity;
    }

    public static HomePageItemDto toTypeDto(HomePageItemEntity entity) {
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        HomePageItemDto dto = new HomePageItemDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDtoWithParent(entity.getParent()));

        if (entity.getItems().size() > 0) {
            Set<HomePageItemDto> items = new HashSet<>();
            for (HomePageItemEntity item : entity.getItems().stream().filter(o -> !o.isDeleted()).collect(Collectors.toList())) {
                items.add(toDtoWithChild(item));
            }
            dto.setItems((items));
        }
        return dto;
    }


    public static HomePageDeadendDto toDeadendDto(HomePageItemEntity entity) {
        log.info("mainPageLayoutChildItemEntityToDto add is going to execute with param {}", entity);
        HomePageDeadendDto dto = new HomePageDeadendDto();
        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setMultimedia(MultimediaConvertor.toDto(entity.getMultimedia()));
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setDestination(entity.getDestination());
        dto.setData(entity.getData());
        dto.setPriority(entity.getPriority());
        dto.setType(entity.getType());

        if (entity.getParent() != null)
            dto.setParent(toDeadendDto(entity.getParent()));


        return dto;
    }

    //type
    public static HomePageItemEntity toTypeEntity(HomePageItemParam param) {
        log.info("mainPageLayoutChildItemParamToEntity is going to execute with param {}", param);
        HomePageItemEntity entity = new HomePageItemEntity();
        entity.setId(param.getId());
        entity.setTitle(param.getTitle());
        entity.setDescription(param.getDescription());
        entity.setDestination(param.getDestination());
        entity.setData(param.getData());
        entity.setPriority(param.getPriority());
        entity.setType(param.getType());

        if (param.getImageId() != null)
            entity.setMultimedia(GympinContext.getBean(MultimediaRepository.class).getById(param.getImageId()));

        if (param.getParent() != null)
            entity.setParent(toEntityWithParent(param.getParent()));


        if (entity.getItems() != null && entity.getItems().size() > 0) {
            Set<HomePageItemEntity> items = new HashSet<>();
            for (HomePageItemParam item : param.getItems().stream().filter(o -> !o.isDeleted()).collect(Collectors.toList())) {
                items.add(toEntityWithChild(item));
            }
            entity.setItems((items));
        }

        return entity;
    }

    public static List<HomePageTypeDto> toTypeDto(List<HomePageTypeEntity> entityList) {
        return entityList.stream().map(HomePageConvertor::toTypeDto).collect(Collectors.toList());
    }

    public static HomePageTypeDto toTypeDto(HomePageTypeEntity entity) {
        HomePageTypeDto dto = new HomePageTypeDto();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        dto.setName(entity.getName());
        dto.setCanBeParent(entity.getCanBeParent());
        dto.setElements(new ArrayList<>(entity.getElements()));
        return dto;
    }

    public static HomePageTypeEntity toTypeEntity(HomePageTypeParam param) {
        HomePageTypeEntity entity = new HomePageTypeEntity();
        entity.setId(param.getId());
        entity.setDescription(param.getDescription());
        entity.setType(param.getType());
        entity.setName(param.getName());
        entity.setCanBeParent(param.getCanBeParent());
        entity.setElements(new ArrayList<>(param.getElements()));
        return entity;
    }
    //destination

    public static List<HomePageDestinationDto> toDestinationDto(List<HomePageDestionationEntity> entityList) {
        return entityList.stream().map(HomePageConvertor::toDestinationDto).collect(Collectors.toList());
    }

    public static HomePageDestinationDto toDestinationDto(HomePageDestionationEntity entity) {
        HomePageDestinationDto dto = new HomePageDestinationDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    public static HomePageDestionationEntity toDestinationEntity(HomePageDestinationParam param) {
        HomePageDestionationEntity entity = new HomePageDestionationEntity();
        entity.setId(param.getId());
        entity.setName(param.getName());
        entity.setDescription(param.getDescription());
        return entity;
    }
}
