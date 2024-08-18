package com.notrika.gympin.domain.corporate;

import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.corporate.LowCreditException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelGroupRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
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
    FinanceCorporateRepository financeCorporateRepository;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;
    @Autowired
    CorporatePersonnelGroupRepository corporatePersonnelGroupRepository;

    @Override
    @Transactional
    public CorporatePersonnelCreditDto add(@NonNull CorporatePersonnelCreditParam param) {
        //get personel
        CorporatePersonnelEntity personnelEntity = corporatePersonnelRepository.getById(param.getPersonnel().getId());
        //TODO FIX THIS
        if (personnelEntity.getCorporate().getContractType()== CorporateContractTypeEnum.NEO &&
                personnelEntity.getCorporate().getPersonnel().stream().map(p -> p.getCredits().stream().map(cpc -> cpc.getCreditAmount()).reduce(BigDecimal.ZERO, (f, q) -> f.add(q))).reduce(BigDecimal.ZERO, (p, q) -> p.add(q)).add(param.getCreditAmount()).compareTo(personnelEntity.getCorporate().getFinanceCorporate().getTotalDeposit()) > 0)
            throw new LowCreditException();

        var serial = financeSerialRepository.add(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build());

        //corporate Transaction
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(personnelEntity.getCorporate().getFinanceCorporate())
                .latestBalance(personnelEntity.getCorporate().getFinanceCorporate().getTotalCredits())
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .amount(param.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build());
        //create new credit and set to personel entity
        BigDecimal newCorporateCreditBalance = personnelEntity.getCorporate().getFinanceCorporate().getTotalCredits().add(param.getCreditAmount());
        BigDecimal newPersonnelCreditBalance = personnelEntity.getCreditBalance().add(param.getCreditAmount());
        personnelEntity.setCreditBalance(newPersonnelCreditBalance);
        personnelEntity.getCorporate().getFinanceCorporate().setTotalCredits(newCorporateCreditBalance);
        corporatePersonnelRepository.update(personnelEntity);


        CorporatePersonnelCreditEntity entity = new CorporatePersonnelCreditEntity();
        entity.setCorporatePersonnel(personnelEntity);
        entity.setCreditAmount(param.getCreditAmount());
        corporatePersonnelCreditRepository.add(entity);
        //add transactions
        //personel transaction
        financeCorporateTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(personnelEntity.getCorporate().getFinanceCorporate())
                .corporatePersonnel(personnelEntity)
                .latestBalance(personnelEntity.getCreditBalance())
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.PERSONNEL)
                .amount(param.getCreditAmount())
                .isChecked(false)
                .serial(serial)
                .build());


        corporateService.update(personnelEntity.getCorporate());
        return CorporateConvertor.toCreditDto(entity);
    }


    @Override
    @Transactional
    public List<CorporatePersonnelCreditDto> addToAll(@NonNull CorporatePersonnelCreditParam param) {
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        List<CorporatePersonnelEntity> getPersonnelsForProcess = corporatePersonnelRepository.findByCorporateAndDeletedIsFalse(corporate);
        List<CorporatePersonnelEntity> personnelsToAddCredit = new ArrayList<>();
        List<CorporatePersonnelCreditEntity> corporatePersonnelCredit = new ArrayList<>();
        List<FinanceCorporateTransactionEntity> corporateTransactions = new ArrayList<>();
        CorporatePersonnelGroupEntity group = null;
        String description = "";
        var serial = financeSerialRepository.add(FinanceSerialEntity.builder().serial(java.util.UUID.randomUUID().toString()).build());

        if (param.getGroupId() != null) {
            getPersonnelsForProcess = getPersonnelsForProcess.stream().filter(p->p.getPersonnelGroup().getId()==param.getGroupId()).collect(Collectors.toList());
        }

        BigDecimal totalAddAmount = param.getCreditAmount().multiply(BigDecimal.valueOf(getPersonnelsForProcess.size()));
        //TODO FIX THIS
        if (corporate.getContractType()==CorporateContractTypeEnum.NEO && corporate.getFinanceCorporate().getTotalCredits().add(totalAddAmount).compareTo(corporate.getFinanceCorporate().getTotalDeposit()) > 0)
            throw new LowCreditException();


        for (CorporatePersonnelEntity person : getPersonnelsForProcess) {

            //add corporate Transaction
            corporateTransactions.add(FinanceCorporateTransactionEntity.builder()
                    .financeCorporate(corporate.getFinanceCorporate())
                    .corporatePersonnel(person)
                    .latestBalance(person.getCreditBalance())
                    .transactionCorporateType(TransactionCorporateType.CREDIT)
                    .transactionStatus(TransactionStatus.COMPLETE)
                    .transactionType(TransactionBaseType.PERSONNEL)
                    .amount(param.getCreditAmount())
                    .isChecked(false)
                    .serial(serial)
                    .build());

            //add personel credit
            BigDecimal newCreditBalance = person.getCreditBalance().add(param.getCreditAmount());
            person.setCreditBalance(newCreditBalance);
            personnelsToAddCredit.add(person);

            corporatePersonnelCredit.add(CorporatePersonnelCreditEntity.builder()
                    .corporatePersonnel(person)
                    .creditAmount(param.getCreditAmount())
                    .build());


        }

        if(param.getGroupId()!=null){
            group = corporatePersonnelGroupRepository.getById(param.getGroupId());
            description ="افزودن اعتبار به گروه "+group.getName()+" به تعداد "+personnelsToAddCredit.size()+" نفر هر کاربر مبلغ "+param.getCreditAmount()+" تومان در مجموع "+totalAddAmount + " تومان ";
        }else{
            description ="افزودن اعتبار به همه پرسنل "+personnelsToAddCredit.size()+" نفر هر کاربر مبلغ "+param.getCreditAmount()+" تومان در مجموع "+totalAddAmount + " تومان ";
        }
        corporateTransactions.add(FinanceCorporateTransactionEntity.builder()
                .financeCorporate(corporate.getFinanceCorporate())
                .latestBalance(corporate.getFinanceCorporate().getTotalCredits())
                .transactionCorporateType(TransactionCorporateType.CREDIT)
                .transactionStatus(TransactionStatus.COMPLETE)
                .transactionType(TransactionBaseType.CORPORATE)
                .amount(totalAddAmount)
                .description(description)
                .isChecked(false)
                .serial(serial)
                .build());

        corporatePersonnelRepository.updateAll(personnelsToAddCredit);
        corporatePersonnelCreditRepository.addAll(corporatePersonnelCredit);
        financeCorporateTransactionRepository.addAll(corporateTransactions);

        //change corporate
        var financeCorpote = corporate.getFinanceCorporate();
        financeCorpote.setTotalCredits(financeCorpote.getTotalCredits().add(totalAddAmount));
        financeCorporateRepository.update(financeCorpote);

        return convertToDtos(corporatePersonnelCredit);
    }


    @Override
    public BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param) {
        CorporateEntity corporate = corporateService.getEntityById(param.getCorporateId());
        BigDecimal totalCredit = BigDecimal.ZERO;
        for (var person : corporate.getPersonnel().stream().filter(p -> !p.isDeleted()).collect(Collectors.toList())) {
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
//        CorporatePersonnelEntity corporatePersonnel = entity.getCorporatePersonnel();
//        BigDecimal newCreditBalance = entity.getCorporatePersonnel().getCreditBalance().add(entity.getCreditAmount());
//        corporatePersonnel.setCreditBalance(newCreditBalance);
//        corporatePersonnelRepository.update(corporatePersonnel);
//
//        financeCorporateRepository.add(TransactionEntity.builder()
//                .corporate(corporatePersonnel.getCorporate())
//                .balance(corporatePersonnel.getCreditBalance())
//                .amount(entity.getCreditAmount())
//                .transactionStatus(TransactionStatus.COMPLETE)
//                .transactionType(TransactionType.CORPORATE_PERSONNEL_ADD_CREDIT)
//                .isChecked(false)
//                .bankPend(false)
//                .serial(java.util.UUID.randomUUID().toString())
//                .build());
//        corporateService.update(corporatePersonnel.getCorporate());
//        return corporatePersonnelCreditRepository.add(entity);
        return null;
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
        return corporatePersonnelCreditRepository.findAll(specification, pageable);
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
