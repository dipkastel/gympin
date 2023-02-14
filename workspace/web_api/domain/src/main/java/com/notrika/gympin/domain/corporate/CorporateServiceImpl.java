package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporate.service.CorporateService;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.multimedia.MultimediaServiceImpl;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporateServiceImpl extends AbstractBaseService<CorporateParam, CorporateDto, CorporateQuery, CorporateEntity> implements CorporateService {

    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CorporateDto add(@NonNull CorporateParam corporateParam) {
        CorporateEntity corporateEntity = CorporateEntity.builder()
                .name(corporateParam.getName())
                .address(corporateParam.getAddress())
                .status(CorporateStatusEnum.INACTIVE)
                .Balance(BigDecimal.ZERO)
                .build();
        return CorporateConvertor.toDto(corporateRepository.add(corporateEntity));
    }

    @Override
    public CorporateDto update(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        entity.setName(corporateParam.getName());
        entity.setAddress(corporateParam.getAddress());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateStatus(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        entity.setStatus(corporateParam.getStatus());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateLogo(CorporateLogoParam param) {
        CorporateEntity entity = corporateRepository.getById(param.getCorporateId());
        MultimediaEntity logo = multimediaRepository.getById(param.getMultimediaId());
        entity.setLogo(logo);
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto delete(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        return CorporateConvertor.toDto(corporateRepository.deleteById2(entity));
    }

    @Override
    public CorporateDto getById(long id) {
        return CorporateConvertor.toDto(corporateRepository.getById(id));
    }

    @Override
    public CorporateEntity add(CorporateEntity entity) {
        return corporateRepository.add(entity);
    }

    @Override
    public CorporateEntity update(CorporateEntity entity) {
        return corporateRepository.update(entity);
    }

    @Override
    public CorporateEntity delete(CorporateEntity entity) {
        return corporateRepository.deleteById2(entity);
    }

    @Override
    public CorporateEntity getEntityById(long id) {
        return corporateRepository.getById(id);
    }

    @Override
    public List<CorporateEntity> getAll(Pageable pageable) {
        return corporateRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CorporateEntity> findAll(Specification<CorporateEntity> specification, Pageable pageable) {
        return corporateRepository.findAll(specification,pageable);
    }

    @Override
    public List<CorporateDto> convertToDtos(List<CorporateEntity> entities) {
        return entities.stream().map(CorporateConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporateDto> convertToDtos(Page<CorporateEntity> entities) {
        return entities.map(CorporateConvertor::toDto);
    }

    @Override
    public List<CorporateDto> getByUser(UserParam userParam) {
        return convertToDtos(corporateRepository.findByUserId(userParam.getId()));
    }
}
