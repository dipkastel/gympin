package com.notrika.gympin.domain.rate.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.rate.gate.dto.RateGateDto;
import com.notrika.gympin.common.rate.gate.param.RateGateParam;
import com.notrika.gympin.common.rate.gate.service.RateGateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.entity.rating.RateGateEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateGateServiceImpl extends AbstractBaseService<RateGateParam, RateGateDto, BaseQuery<?>, RateGateEntity> implements RateGateService {
    @Override
    public RateGateDto add(@NonNull RateGateParam rateGateParam) {
        return null;
    }

    @Override
    public RateGateDto update(@NonNull RateGateParam rateGateParam) {
        return null;
    }

    @Override
    public RateGateDto delete(@NonNull RateGateParam rateGateParam) {
        return null;
    }

    @Override
    public RateGateDto getById(long id) {
        return null;
    }

    @Override
    public RateGateEntity add(RateGateEntity entity) {
        return null;
    }

    @Override
    public RateGateEntity update(RateGateEntity entity) {
        return null;
    }

    @Override
    public RateGateEntity delete(RateGateEntity entity) {
        return null;
    }

    @Override
    public RateGateEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<RateGateEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<RateGateEntity> findAll(Specification<RateGateEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<RateGateDto> convertToDtos(List<RateGateEntity> entities) {
        return null;
    }

    @Override
    public Page<RateGateDto> convertToDtos(Page<RateGateEntity> entities) {
        return null;
    }
}
