package com.notrika.gympin.domain.place.rate;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.rate.dto.RatePlaceDto;
import com.notrika.gympin.common.place.rate.param.RatePlaceParam;
import com.notrika.gympin.common.place.rate.service.RatePlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.entity.place.rating.PlaceRateEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatePlaceServiceImpl extends AbstractBaseService<RatePlaceParam, RatePlaceDto, BaseQuery<?>, PlaceRateEntity> implements RatePlaceService {
    @Override
    public RatePlaceDto add(@NonNull RatePlaceParam ratePlaceParam) {
        return null;
    }

    @Override
    public RatePlaceDto update(@NonNull RatePlaceParam ratePlaceParam) {
        return null;
    }

    @Override
    public RatePlaceDto delete(@NonNull RatePlaceParam ratePlaceParam) {
        return null;
    }

    @Override
    public RatePlaceDto getById(long id) {
        return null;
    }

    @Override
    public PlaceRateEntity add(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity update(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity delete(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<PlaceRateEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<PlaceRateEntity> findAll(Specification<PlaceRateEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<RatePlaceDto> convertToDtos(List<PlaceRateEntity> entities) {
        return null;
    }

    @Override
    public Page<RatePlaceDto> convertToDtos(Page<PlaceRateEntity> entities) {
        return null;
    }
}
