package com.notrika.gympin.domain.finance.gateways;


import com.notrika.gympin.common.finance.gateway.dto.GatewayApplicationDto;
import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.param.GatewayApplicationParam;
import com.notrika.gympin.common.finance.gateway.param.GatewayApplicationParam;
import com.notrika.gympin.common.finance.gateway.query.GatewayApplicationQuery;
import com.notrika.gympin.common.finance.gateway.query.GatewayQuery;
import com.notrika.gympin.common.finance.gateway.service.GatewayApplicationService;
import com.notrika.gympin.common.finance.gateway.service.GatewayService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GatewayConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceApplicationGatewayRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceGatewayRepository;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceGatewayEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GatewayApplicationServiceImpl extends AbstractBaseService<GatewayApplicationParam, GatewayApplicationDto, GatewayApplicationQuery, FinanceApplicationGatewayEntity> implements GatewayApplicationService {

    @Autowired
    FinanceApplicationGatewayRepository financeApplicationGatewayRepository;

    @Autowired
    FinanceGatewayRepository financeGatewayRepository;


    @Override
    public GatewayApplicationDto add(@NonNull GatewayApplicationParam param) {
        FinanceGatewayEntity gateway = financeGatewayRepository.getById(param.getGateway().getId());
        FinanceApplicationGatewayEntity entity = FinanceApplicationGatewayEntity.builder()
                .application(param.getApplication())
                .isDefault(param.getIsDefault())
                .gateway(gateway)
                .build();
        return GatewayConvertor.toDto(add(entity));
    }

    @Override
    public GatewayApplicationDto update(@NonNull GatewayApplicationParam param) {
        FinanceApplicationGatewayEntity entity = financeApplicationGatewayRepository.getById(param.getId());
        FinanceGatewayEntity gateway = financeGatewayRepository.getById(param.getGateway().getId());
        entity.setApplication(param.getApplication());
        entity.setGateway(gateway);
        entity.setIsDefault(param.getIsDefault());
        return GatewayConvertor.toDto(update(entity));
    }

    @Override
    public GatewayApplicationDto delete(@NonNull GatewayApplicationParam param) {
        FinanceApplicationGatewayEntity entity = financeApplicationGatewayRepository.getById(param.getId());
        return GatewayConvertor.toDto(delete(entity));
    }

    @Override
    public FinanceApplicationGatewayEntity add(FinanceApplicationGatewayEntity entity) {
        return financeApplicationGatewayRepository.add(entity);
    }

    @Override
    public FinanceApplicationGatewayEntity update(FinanceApplicationGatewayEntity entity) {
        return financeApplicationGatewayRepository.update(entity);
    }

    @Override
    public FinanceApplicationGatewayEntity delete(FinanceApplicationGatewayEntity entity) {
        return financeApplicationGatewayRepository.deleteById2(entity);
    }

    @Override
    public FinanceApplicationGatewayEntity getEntityById(long id) {
        return financeApplicationGatewayRepository.findById(id).get();
    }


    @Override
    public List<FinanceApplicationGatewayEntity> getAll(Pageable pageable) {
        return financeApplicationGatewayRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceApplicationGatewayEntity> findAll(Specification<FinanceApplicationGatewayEntity> specification, Pageable pageable) {
        return financeApplicationGatewayRepository.findAll(specification,pageable);
    }

    @Override
    public List<GatewayApplicationDto> convertToDtos(List<FinanceApplicationGatewayEntity> entities) {
        return entities.stream().map(GatewayConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<GatewayApplicationDto> convertToDtos(Page<FinanceApplicationGatewayEntity> entities) {
        return entities.map(GatewayConvertor::toDto);
    }

    @Override
    public GatewayApplicationDto getById(long id) {
        return  GatewayConvertor.toDto(getEntityById(id));
    }


}
