package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.service.GateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.persistence.dao.repository.GateRepository;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GateServiceImpl extends AbstractBaseService<GateParam, GateDto, GateEntity> implements GateService {

    @Autowired
    private GateRepository gateRepository;

    @Override
    public GateDto add(@NonNull GateParam gateParam) {
        GateEntity gateEntity = GateConvertor.convertToEntity(gateParam);
        gateEntity= this.gateRepository.add(gateEntity);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateDto update(@NonNull GateParam gateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public GateDto delete(@NonNull GateParam gateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public GateDto getById(long id) {
        GateEntity gateEntity = this.getEntityById(id);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateEntity add(GateEntity entity) {
        return gateRepository.add(entity);
    }

    @Override
    public GateEntity update(GateEntity entity) {
        return gateRepository.update(entity);
    }

    @Override
    public GateEntity delete(GateEntity entity) {
        return gateRepository.deleteById2(entity);
    }

    @Override
    public GateEntity getEntityById(long id) {
        return gateRepository.getById(id);
    }

    @Override
    public List<GateEntity> getAll(Pageable pageable) {
        return gateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<GateDto> convertToDtos(List<GateEntity> entities) {
        return entities.stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }
}
