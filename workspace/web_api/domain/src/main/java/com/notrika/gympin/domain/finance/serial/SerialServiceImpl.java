package com.notrika.gympin.domain.finance.serial;

import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.serial.service.SerialService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SerialConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SerialServiceImpl extends AbstractBaseService<SerialParam, SerialDto, SerialQuery, FinanceSerialEntity> implements SerialService {


    @Autowired
    FinanceSerialRepository financeSerialRepository;


    @Override
    public SerialDto add(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto update(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto delete(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto getById(long id) {
        return SerialConvertor.ToCompleteDto(financeSerialRepository.getById(id));
    }

    @Override
    public FinanceSerialEntity add(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity update(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity delete(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity getEntityById(long id) {
        return financeSerialRepository.getById(id);
    }

    @Override
    public List<FinanceSerialEntity> getAll(Pageable pageable) {
        return financeSerialRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceSerialEntity> findAll(Specification<FinanceSerialEntity> specification, Pageable pageable) {
        return financeSerialRepository.findAll(specification, pageable);
    }

    @Override
    public List<SerialDto> convertToDtos(List<FinanceSerialEntity> entities) {
        return entities.stream().map(SerialConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<SerialDto> convertToDtos(Page<FinanceSerialEntity> entities) {
        return entities.map(SerialConvertor::ToDto);
    }

    @Override
    public SerialDto getBySerial(String serial) {
        return SerialConvertor.ToCompleteDto(financeSerialRepository.findBySerialAndDeletedIsFalse(serial));
    }
}
