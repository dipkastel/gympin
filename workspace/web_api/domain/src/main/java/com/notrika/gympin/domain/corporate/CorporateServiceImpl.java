package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporate.param.*;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporate.service.CorporateService;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.domain.util.convertor.TransactionConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporateServiceImpl extends AbstractBaseService<CorporateParam, CorporateDto, CorporateQuery, CorporateEntity> implements CorporateService {

    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;
    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FinanceCorporateRepository financeCorporateRepository;

    @Override
    public CorporateDto add(@NonNull CorporateParam corporateParam) {
        CorporateEntity corporateEntity = corporateRepository.add(CorporateEntity.builder()
                .name(corporateParam.getName())
                .address(corporateParam.getAddress())
                .status(CorporateStatusEnum.INACTIVE)
                .stepsPay(false)
                .contractType(CorporateContractTypeEnum.LONG_TIME)
                .build());

        financeCorporateRepository.add(FinanceCorporateEntity.builder()
                .corporate(corporateEntity)
                .totalCredits(BigDecimal.ZERO)
                .totalDeposit(BigDecimal.ZERO)
                .build());
        return CorporateConvertor.toDto(corporateEntity);
    }

    @Override
    public CorporateDto update(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        entity.setName(corporateParam.getName());
        entity.setAddress(corporateParam.getAddress());
        entity.setStatus(CalculateStatus(entity));
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateStatus(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        entity.setStatus(corporateParam.getStatus());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateStepPayment(@NonNull CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        entity.setStepsPay(corporateParam.getStepPeyment());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateContractType(@NonNull CorporateContractTypeParam param) {
        CorporateEntity entity = corporateRepository.getById(param.getId());
        entity.setContractType(param.getContractType());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }
    @Override
    public CorporateDto updateContractDate(@NonNull CorporateContractDateParam param) {
        CorporateEntity entity = corporateRepository.getById(param.getId());
        entity.setContractDate(param.getContractDate());
        return CorporateConvertor.toDto(corporateRepository.update(entity));
    }

    @Override
    public CorporateDto updateDed(@NonNull CorporateDedParam param) {
        CorporateEntity entity = corporateRepository.getById(param.getId());
        entity.setDed(param.getDefaultExpireDuration());
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
    public List<CorporatePersonnelGroupDto> getCorporateGroups(CorporateParam corporateParam) {
        CorporateEntity entity = corporateRepository.getById(corporateParam.getId());
        return entity.getCategory().stream().filter(c->!c.isDeleted()).map(CorporateConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public CorporatePersonnelGroupDto addGroup(CorporatePersonnelGroupParam Param) {
        CorporateEntity corporate = corporateRepository.getById(Param.getCorporateId());
        var category = corporatePersonnelGroupRepository.add(CorporatePersonnelGroupEntity.builder().corporate(corporate).name(Param.getName()).build());
        return CorporateConvertor.toDto(category);
    }

    @Override
    public CorporatePersonnelGroupDto deleteGroup(CorporatePersonnelGroupParam Param) {
        var category = corporatePersonnelGroupRepository.getById(Param.getId());

        return CorporateConvertor.toDto(corporatePersonnelGroupRepository.deleteById2(category));
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
        entity.setStatus(CalculateStatus(entity));
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
    public FinanceCorporateDto getFinanceCorporate(FinanceCorporateParam param) {
        CorporateEntity corporateEntity = getEntityById(param.getId());
        return TransactionConvertor.toDto(corporateEntity.getFinanceCorporate());
    }


    public CorporateStatusEnum CalculateStatus(CorporateEntity entity){
        if(entity.getStatus().equals(CorporateStatusEnum.INACTIVE)) return entity.getStatus();
        if(entity.getStatus().equals(CorporateStatusEnum.PREREGISTER)) return entity.getStatus();
        if(entity.getPersonnel().size()<1){
            //corporate has not any personel
            return CorporateStatusEnum.ACTIVE;
        }else{
            BigDecimal MaxUserCredit = entity.getPersonnel().stream().sorted(Comparator.comparing(CorporatePersonnelEntity::getCreditBalance)).findFirst().get().getCreditBalance();
            BigDecimal sumUserCredits = entity.getPersonnel().stream().map(CorporatePersonnelEntity::getCreditBalance).reduce(BigDecimal.ZERO, BigDecimal::add);
            if(MaxUserCredit.compareTo(BigDecimal.ZERO) > 0){
                //corporate personel has creadit
                Double zarib = 0.15;
                BigDecimal result = new BigDecimal("100")
                        .subtract(new BigDecimal("100").subtract(new BigDecimal("10"))
                                .multiply(new BigDecimal("1").subtract(BigDecimal.valueOf(Math.exp(BigDecimal.valueOf(-1)
                                        .multiply(BigDecimal.valueOf(zarib)
                                                .multiply(sumUserCredits))
                                        .doubleValue())))))
                        .setScale(2, RoundingMode.HALF_UP);
                if(result.compareTo(MaxUserCredit)<0){
                    result = MaxUserCredit;
                }
                if(entity.getFinanceCorporate().getTotalDeposit().compareTo(result)<0){
                    return CorporateStatusEnum.LOW_BUDGET;
                }else {
                    return CorporateStatusEnum.ACTIVE;
                }


            }else{
                //corporate personel has not any creadit
                return CorporateStatusEnum.ACTIVE;
            }
        }
    }
}
