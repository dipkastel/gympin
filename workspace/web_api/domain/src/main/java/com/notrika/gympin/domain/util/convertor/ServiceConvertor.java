package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.settings.service.dto.MapViewsDto;
import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.management.service.reportDto.ManageServiceExecutionSimpleDto;
import org.apache.tomcat.util.json.JSONParser;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static com.notrika.gympin.persistence.dao.BaseRepositoryImpl.objectMapper;

public final class ServiceConvertor {

    public static ServiceDto ToDto(ManageServiceExecutionEntity entity) {
        if (entity == null) return null;
        ServiceDto dto = new ServiceDto();
        dto.setId(entity.getId());
        dto.setService(entity.getService());
        dto.setDto(entity.getDto());
        dto.setExecutionDate(entity.getExecutionDate());
        dto.setParam(entity.getParam());
        dto.setExecutorUser(UserConvertor.toDtoSimple(entity.getExecutorUser()));
        return dto;
    }

    public static MapViewsDto ToDto(Object entity) {
        if (entity == null) return null;
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = null;
        try {
            root = mapper.readTree(entity.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        JsonNode item = root.get(0);

        Double maxLatitude = item.path("max_latitude").isNull() ? 0.0 : item.get("max_latitude").asDouble();
        Double minLatitude = item.path("min_latitude").isNull() ? 0.0 : item.get("min_latitude").asDouble();
        Double maxLongitude = item.path("max_longitude").isNull() ? 0.0 : item.get("max_longitude").asDouble();
        Double minLongitude = item.path("min_longitude").isNull() ? 0.0 : item.get("min_longitude").asDouble();
        return MapViewsDto.builder()
                .latitude ((minLatitude+maxLatitude)/2)
                .longitude ((minLongitude+maxLongitude)/2)
                .build();
    }

    public static List<ServiceDto> ToDtos(List<ManageServiceExecutionSimpleDto> entities) {
       return entities.stream().map(e->ToDto(e)).collect(Collectors.toList());
    }

    private static ServiceDto ToDto(ManageServiceExecutionSimpleDto entity) {
        if (entity == null) return null;
        ServiceDto dto = new ServiceDto();
        dto.setId(entity.getId());
        dto.setExecutionDate(entity.getExecutionDate());
        dto.setExecutorUser(UserConvertor.toDtoSimple(entity.getExecutorUser()));
        return dto;
    }
}
