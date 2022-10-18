package com.notrika.gympin.domain.rate.place;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.rate.place.dto.RatePlaceDto;
import com.notrika.gympin.common.rate.place.param.RatePlaceParam;
import com.notrika.gympin.common.rate.place.service.RatePlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.entity.rating.RatePlaceEntity;
import lombok.NonNull;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatePlaceServiceImpl extends AbstractBaseService<RatePlaceParam, RatePlaceDto, BaseFilter<?>, RatePlaceEntity> implements RatePlaceService {
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
    public RatePlaceEntity add(RatePlaceEntity entity) {
        return null;
    }

    @Override
    public RatePlaceEntity update(RatePlaceEntity entity) {
        return null;
    }

    @Override
    public RatePlaceEntity delete(RatePlaceEntity entity) {
        return null;
    }

    @Override
    public RatePlaceEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<RatePlaceEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<RatePlaceDto> convertToDtos(List<RatePlaceEntity> entities) {
        return null;
    }
}
