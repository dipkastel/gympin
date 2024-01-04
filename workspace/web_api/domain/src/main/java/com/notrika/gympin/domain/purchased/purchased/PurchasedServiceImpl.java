package com.notrika.gympin.domain.purchased.purchased;

import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.purchased.purchased.query.PurchasedQuery;
import com.notrika.gympin.common.purchased.purchased.service.PurchasedService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.domain.util.convertor.PurchasedConvertor;
import com.notrika.gympin.persistence.dao.repository.purchased.PurchasedRepository;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchasedServiceImpl extends AbstractBaseService<PurchasedParam, PurchasedDto, PurchasedQuery, PurchasedBaseEntity> implements PurchasedService {

    @Autowired
    private PurchasedRepository purchasedRepository;



    @Override
    public PurchasedDto add(@NonNull PurchasedParam param) {
        return null;
    }

    @Override
    public PurchasedDto update(@NonNull PurchasedParam param) {
        return null;
    }

    @Override
    public PurchasedDto delete(@NonNull PurchasedParam param) {
        return null;
    }

    @Override
    public PurchasedDto getById(long id) {
        return PurchasedConvertor.ToDto(this.getEntityById(id));
    }

    @Override
    public PurchasedBaseEntity add(PurchasedBaseEntity entity) {
        return null;
    }

    @Override
    public PurchasedBaseEntity update(PurchasedBaseEntity entity) {
        return null;
    }

    @Override
    public PurchasedBaseEntity delete(PurchasedBaseEntity entity) {
        return null;
    }

    @Override
    public PurchasedBaseEntity getEntityById(long id) {
        return purchasedRepository.getById(id);
    }

    @Override
    public List<PurchasedBaseEntity> getAll(Pageable pageable) {
        return purchasedRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PurchasedBaseEntity> findAll(Specification<PurchasedBaseEntity> specification, Pageable pageable) {
        return purchasedRepository.findAll(specification, pageable);
    }

    @Override
    public List<PurchasedDto> convertToDtos(List<PurchasedBaseEntity> entities) {
        return entities.stream().map(PurchasedConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedDto> convertToDtos(Page<PurchasedBaseEntity> entities) {
        return entities.map(PurchasedConvertor::ToDto);
    }

}
