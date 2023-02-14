//package com.notrika.gympin.domain.accounting;
//
//import com.notrika.gympin.common._base.query.BaseQuery;
//import com.notrika.gympin.common.accounting.DebtorCreditor;
//import com.notrika.gympin.common.accounting.dto.AccountDto;
//import com.notrika.gympin.common.accounting.enums.AccountTopic;
//import com.notrika.gympin.common.accounting.param.AccountParam;
//import com.notrika.gympin.common.accounting.service.AccountingService;
//import com.notrika.gympin.domain.AbstractBaseService;
//import com.notrika.gympin.persistence.dao.repository.AccountRepository;
//import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
//import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
//import com.notrika.gympin.persistence.entity.gate.GateEntity;
//import com.notrika.gympin.persistence.entity.user.UserEntity;
//import lombok.NonNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.util.Date;
//import java.util.List;
//
//@Service
//public class AccountingServiceImpl extends AbstractBaseService<AccountParam, AccountDto, BaseQuery<?>, AccountEntity> implements AccountingService {
//
//    @Autowired
//    private AccountRepository accountRepository;
//
//    @Override
//    public AccountDto add(@NonNull AccountParam accountParam) {
//        return null;
//    }
//
//    @Override
//    public AccountDto update(@NonNull AccountParam accountParam) {
//        return null;
//    }
//
//    @Override
//    public AccountDto delete(@NonNull AccountParam accountParam) {
//        return null;
//    }
//
//    @Override
//    public AccountDto getById(long id) {
//        return null;
//    }
//
//    @Override
//    public AccountEntity add(AccountEntity entity) {
//        //        fillAccountNumber(entity);
//        return accountRepository.add(entity);
//    }
//
//    public <T> AccountEntity add(AuditableEntitiesEntity<T> auditableEntity, AccountTopic topic) {
//        AccountEntity accountEntity = new AccountEntity();
//        accountEntity.setAuditableEntity(auditableEntity);
//        accountEntity.setAccountCode(topic.getCode());
//        var account = accountRepository.findMaxOfSerial(auditableEntity);
//        accountEntity.setSerial(((account!=null)?account:0) + 1);
//        accountEntity.setOpenDate(new Date());
//        accountEntity.setAccountNature(extractAccountNature(topic));
//        accountEntity.setBalance(BigDecimal.ZERO);
//        accountEntity.setBalanceType(accountEntity.getAccountNature());
//        if (auditableEntity instanceof UserEntity) {
//            accountEntity.setDescription("حساب پیش دریافت کاربر " + ((UserEntity) auditableEntity).getFullName() + " با شماره تلفن " + ((UserEntity) auditableEntity).getPhoneNumber());
//        } else if (auditableEntity instanceof GateEntity) {
//            accountEntity.setDescription("حساب پیش پرداخت گیت " + ((GateEntity) auditableEntity).getName());
//        }
//        return add(accountEntity);
//    }
//
//    @Override
//    public AccountEntity update(AccountEntity entity) {
//        return null;
//    }
//
//    @Override
//    public AccountEntity delete(AccountEntity entity) {
//        return null;
//    }
//
//    @Override
//    public AccountEntity getEntityById(long id) {
//        return accountRepository.getById(id);
//    }
//
//    @Override
//    public List<AccountEntity> getAll(Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public Page<AccountEntity> findAll(Specification<AccountEntity> specification, Pageable pageable) {
//        return accountRepository.findAll(specification,pageable);
//    }
//
//    @Override
//    public List<AccountDto> convertToDtos(List<AccountEntity> entities) {
//        return null;
//    }
//
//    @Override
//    public Page<AccountDto> convertToDtos(Page<AccountEntity> entities) {
//        return null;
//    }
//
//
//    private void fillAccountNumber(AuditableEntitiesEntity account) {
//
//    }
//
//    private DebtorCreditor extractAccountNature(AccountTopic topic) {
//        switch (topic) {
//            case CASH:
//                return DebtorCreditor.DEBTOR;
//            case OPERATING_INCOME:
//            case PREPAYMENT:
//            case PISH_DARYAFT:
//                return DebtorCreditor.CREDITOR;
//            default:
//                throw new RuntimeException();
//        }
//    }
//
//    public AccountEntity getCashAccount() {
//        return null;
//    }
//
//    public AccountEntity getByAuditable(AuditableEntitiesEntity auditableEntity) {
//        return accountRepository.findByAuditableEntityAndDeletedIsFalse(auditableEntity);
//    }
//
//}
