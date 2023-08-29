package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.exception.corporate.LowCreditException;
import com.notrika.gympin.common.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.transaction.enums.TransactionType;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.TransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporatePersonnelCreditServiceImpl extends AbstractBaseService<CorporatePersonnelCreditParam, CorporatePersonnelCreditDto, BaseQuery<?>, CorporatePersonnelCreditEntity> implements CorporatePersonnelCreditService {

    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    TransactionRepository transactionRepository;

    @Override
    @Transactional
    public CorporatePersonnelCreditDto add(@NonNull CorporatePersonnelCreditParam param) {
        CorporatePersonnelEntity personnelEntity = corporatePersonnelRepository.getById(param.getPersonnel().getId());
        if(!personnelEntity.getCorporate().getStepspay()&&personnelEntity.getCorporate().getPersonnel().stream().map(p-> p.getCredits().stream().map(cpc->cpc.getCreditAmount()).reduce(BigDecimal.ZERO, (f, q) -> f.add(q))).reduce(BigDecimal.ZERO, (p, q) -> p.add(q)).add(param.getCreditAmount()).compareTo(personnelEntity.getCorporate().getBalance())>0)
            throw new LowCreditException();
        BigDecimal newCreditBalance = personnelEntity.getCreditBalance().add(param.getCreditAmount());
        personnelEntity.setCreditBalance(newCreditBalance);
        corporatePersonnelRepository.update(personnelEntity);
        CorporatePersonnelCreditEntity entity = new CorporatePersonnelCreditEntity();
        entity.setCorporatePersonnel(personnelEntity);
        entity.setCreditAmount(param.getCreditAmount());

        transactionRepository.add(TransactionEntity.builder()
                .corporate(personnelEntity.getCorporate())
                .balance(personnelEntity.getCreditBalance())
                .amount(param.getCreditAmount())
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionType.CORPORATE_PERSONNEL_ADD_CREDIT)
                .isChecked(false)
                .serial(java.util.UUID.randomUUID().toString())
                .build());

        corporateService.update(personnelEntity.getCorporate());
        return CorporateConvertor.toCreditDto(corporatePersonnelCreditRepository.add(entity));
    }


    @Override
    @Transactional
    public List<CorporatePersonnelCreditDto> addToAll(@NonNull CorporatePersonnelCreditParam param) {
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        List<CorporatePersonnelEntity> personnels = new ArrayList<>();
        List<CorporatePersonnelCreditEntity> credits = new ArrayList<>();

        BigDecimal totalAddBalance = param.getCreditAmount().multiply(BigDecimal.valueOf(corporate.getPersonnel().size()));
        if(!corporate.getStepspay()&&corporate.getPersonnel().stream().map(p-> p.getCredits().stream().map(cpc->cpc.getCreditAmount()).reduce(BigDecimal.ZERO, (f, q) -> f.add(q))).reduce(BigDecimal.ZERO, (p, q) -> p.add(q)).add(totalAddBalance).compareTo(corporate.getBalance())>0)
            throw new LowCreditException();
        for (CorporatePersonnelEntity person :corporate.getPersonnel()) {
            BigDecimal newCreditBalance = person.getCreditBalance().add(param.getCreditAmount());
            CorporatePersonnelEntity per = person;
            per.setCreditBalance(newCreditBalance);
            personnels.add(per);

            credits.add(CorporatePersonnelCreditEntity.builder()
                    .corporatePersonnel(person)
                    .creditAmount(param.getCreditAmount())
                    .build());

            transactionRepository.add(TransactionEntity.builder()
                    .corporate(per.getCorporate())
                    .balance(per.getCreditBalance())
                    .amount(param.getCreditAmount())
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .transactionType(TransactionType.CORPORATE_PERSONNEL_ADD_CREDIT)
                    .isChecked(false)
                    .serial(java.util.UUID.randomUUID().toString())
                    .build());
        }
        corporatePersonnelRepository.updateAll(personnels);

        corporateService.update(corporate);
        return convertToDtos(corporatePersonnelCreditRepository.addAll(credits));
    }

    @Override
    public BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param) {
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        BigDecimal totalCredit = BigDecimal.ZERO;
        for (var person : corporate.getPersonnel().stream().filter(p->!p.isDeleted()).collect(Collectors.toList())) {
            totalCredit = totalCredit.add(person.getCreditBalance());
        }
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
    public CorporatePersonnelCreditEntity add(CorporatePersonnelCreditEntity entity) {
        CorporatePersonnelEntity corporatePersonnel = entity.getCorporatePersonnel();
        BigDecimal newCreditBalance = entity.getCorporatePersonnel().getCreditBalance().add(entity.getCreditAmount());
        corporatePersonnel.setCreditBalance(newCreditBalance);
        corporatePersonnelRepository.update(corporatePersonnel);

        transactionRepository.add(TransactionEntity.builder()
                .corporate(corporatePersonnel.getCorporate())
                .balance(corporatePersonnel.getCreditBalance())
                .amount(entity.getCreditAmount())
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionType.CORPORATE_PERSONNEL_ADD_CREDIT)
                .isChecked(false)
                .serial(java.util.UUID.randomUUID().toString())
                .build());
        corporateService.update(corporatePersonnel.getCorporate());
        return corporatePersonnelCreditRepository.add(entity);
    }

    @Override
    public CorporatePersonnelCreditEntity update(CorporatePersonnelCreditEntity entity) {
        return null;
    }

    @Override
    public CorporatePersonnelCreditEntity delete(CorporatePersonnelCreditEntity entity) {
        return null;
    }

    @Override
    public CorporatePersonnelCreditEntity getEntityById(long id) {
        return corporatePersonnelCreditRepository.getById(id);
    }

    @Override
    public List<CorporatePersonnelCreditEntity> getAll(Pageable pageable) {
        return corporatePersonnelCreditRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CorporatePersonnelCreditEntity> findAll(Specification<CorporatePersonnelCreditEntity> specification, Pageable pageable) {
        return corporatePersonnelCreditRepository.findAll(specification,pageable);
    }

    @Override
    public List<CorporatePersonnelCreditDto> convertToDtos(List<CorporatePersonnelCreditEntity> entities) {
        return entities.stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList());
    }

    @Override
    public Page<CorporatePersonnelCreditDto> convertToDtos(Page<CorporatePersonnelCreditEntity> entities) {
        return entities.map(CorporateConvertor::toCreditDto);
    }
}
