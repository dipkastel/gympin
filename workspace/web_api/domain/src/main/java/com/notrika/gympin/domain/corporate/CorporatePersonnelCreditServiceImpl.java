package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.corporate.LowCreditException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporatePersonnelCreditServiceImpl extends AbstractBaseService<CorporatePersonnelCreditParam, CorporatePersonnelCreditDto, BaseQuery<?>, FinanceCorporatePersonnelCreditEntity> implements CorporatePersonnelCreditService {

    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;
    @Autowired
    CorporatePersonelCreditHelper helper;

    @Override
    @Transactional
    public CorporatePersonnelCreditDto add(@NonNull CorporatePersonnelCreditParam param) {
        //inits
        CorporatePersonnelEntity personnelEntity = corporatePersonnelRepository.getById(param.getPersonnel().getId());
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_INCREASE_PERSONNEL_CREDIT_SINGLE)
                .build());

        //checks
        if (helper.checkLowBudjetByContract(personnelEntity.getCorporate(), param.getCreditAmount()))
            throw new LowCreditException();

        //add finance corporate personnel credit
        FinanceCorporatePersonnelCreditEntity corporatePersonnelCredit = helper.addCorporatePersonnelCredit(personnelEntity, param, serial);
        //update corporate finance total credit
        FinanceCorporateEntity financeCorporate = helper.UpdateAddCorporateFinance(personnelEntity.getCorporate(), param.getCreditAmount(), serial,null);

        return CorporateConvertor.toCreditDto(corporatePersonnelCredit);
    }


    @Override
    @Transactional
    public List<CorporatePersonnelCreditDto> addToAll(@NonNull CorporatePersonnelCreditParam param) {
        //init
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        List<CorporatePersonnelEntity> personnelsToAddCredit = helper.getPeronelForAddCredits(param);
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_INCREASE_PERSONNEL_CREDIT_MULTIPLE)
                .build());
        BigDecimal totalAddAmount = param.getCreditAmount().multiply(BigDecimal.valueOf(personnelsToAddCredit.size()));
        //checks
        if (helper.checkLowBudjetByContract(corporate, totalAddAmount))
            throw new LowCreditException();

        //add finance corporate personnel credits
        List<FinanceCorporatePersonnelCreditEntity> credits = helper.addCorporatePersonnelCredits(personnelsToAddCredit, param, serial);
        //update corporate finance total credit
        FinanceCorporateEntity financeCorporate = helper.UpdateAddCorporateFinance(corporate, totalAddAmount, serial, helper.getTransactionDiscription(param,personnelsToAddCredit,totalAddAmount));

        return convertToDtos(credits);
    }

    @Override
    @Transactional
    public CorporatePersonnelCreditDto decreasePersonnelCredit(CorporatePersonnelCreditParam param) {
        //inits
        FinanceCorporatePersonnelCreditEntity credit = corporatePersonnelCreditRepository.getById(param.getId());
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_DECREASE_PERSONNEL_CREDIT_SINGLE)
                .build());

        //decrease finance corporate personnel credit
        FinanceCorporatePersonnelCreditEntity corporatePersonnelCredit = helper.DecreaseCorporatePersonnelCredit(credit, param, serial);
        //update corporate finance totalcredit
        FinanceCorporateEntity financeCorporate = helper.UpdateDecreaseCorporateFinance(credit.getCorporatePersonnel().getCorporate(), param.getCreditAmount(), serial,null);

        return CorporateConvertor.toCreditDto(corporatePersonnelCredit);
    }

    @Override
    @Transactional
    public CorporatePersonnelCreditDto ExpirePersonnelCredit(CorporatePersonnelCreditParam param) {
        //inits
        FinanceCorporatePersonnelCreditEntity credit = corporatePersonnelCreditRepository.getById(param.getId());
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                .serial(java.util.UUID.randomUUID().toString())
                .processTypeEnum(ProcessTypeEnum.TRA_EXPIRE_PERSONNEL_CREDIT_MANUAL)
                .build());

        //decrease finance corporate personnel credit
        credit.setExpireDate(new Date());
        param.setCreditAmount(credit.getCreditAmount());
        credit.setStatus(CorporatePersonnelCreditStatusEnum.EXPIRE);
        FinanceCorporatePersonnelCreditEntity corporatePersonnelCredit = helper.DecreaseCorporatePersonnelCredit(credit, param, serial);
        //update corporate finance totalcredit
        FinanceCorporateEntity financeCorporate = helper.UpdateDecreaseCorporateFinance(credit.getCorporatePersonnel().getCorporate(), param.getCreditAmount(), serial,null);

        return CorporateConvertor.toCreditDto(corporatePersonnelCredit);
    }


    @Override
    public BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param) {
        BigDecimal totalCredit = financeCorporateRepository.getById(param.getCorporateId()).getTotalCredits();
        return totalCredit;
    }

    @Override
    public CorporatePersonnelCreditDto update(@NonNull CorporatePersonnelCreditParam corporatePersonnelCreditParam) {
        return null;
    }

    @Override
    public CorporatePersonnelCreditDto delete(@NonNull CorporatePersonnelCreditParam corporatePersonnelCreditParam) {
        return null;
    }

    @Override
    public CorporatePersonnelCreditDto getById(long id) {
        return CorporateConvertor.toCreditDto(corporatePersonnelCreditRepository.getById(id));
    }

    @Override
    @Transactional
    public FinanceCorporatePersonnelCreditEntity add(FinanceCorporatePersonnelCreditEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditEntity update(FinanceCorporatePersonnelCreditEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditEntity delete(FinanceCorporatePersonnelCreditEntity entity) {
        return null;
    }

    @Override
    public FinanceCorporatePersonnelCreditEntity getEntityById(long id) {
        return corporatePersonnelCreditRepository.getById(id);
    }

    @Override
    public List<FinanceCorporatePersonnelCreditEntity> getAll(Pageable pageable) {
        return corporatePersonnelCreditRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceCorporatePersonnelCreditEntity> findAll(Specification<FinanceCorporatePersonnelCreditEntity> specification, Pageable pageable) {
        return corporatePersonnelCreditRepository.findAll(specification, pageable);
    }

    @Override
    public List<CorporatePersonnelCreditDto> convertToDtos(List<FinanceCorporatePersonnelCreditEntity> entities) {
        return entities.stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporatePersonnelCreditDto> convertToDtos(Page<FinanceCorporatePersonnelCreditEntity> entities) {
        return entities.map(CorporateConvertor::toCreditDto);
    }
}
