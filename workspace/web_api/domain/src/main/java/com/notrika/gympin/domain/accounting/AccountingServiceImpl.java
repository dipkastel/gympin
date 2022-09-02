package com.notrika.gympin.domain.accounting;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.common.accounting.account.dto.AccountDto;
import com.notrika.gympin.common.accounting.account.enums.AccountTopic;
import com.notrika.gympin.common.accounting.account.param.AccountParam;
import com.notrika.gympin.common.accounting.account.service.AccountingService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.dao.repository.AccountRepository;
import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class AccountingServiceImpl extends AbstractBaseService<AccountParam, AccountDto, BaseFilter<?>, AccountEntity> implements AccountingService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public AccountDto add(@NonNull AccountParam accountParam) {
        return null;
    }

    @Override
    public AccountDto update(@NonNull AccountParam accountParam) {
        return null;
    }

    @Override
    public AccountDto delete(@NonNull AccountParam accountParam) {
        return null;
    }

    @Override
    public AccountDto getById(long id) {
        return null;
    }

    @Override
    public AccountEntity add(AccountEntity entity) {
//        fillAccountNumber(entity);
        return accountRepository.add(entity);
    }

    public <T> AccountEntity add(AuditableEntitiesEntity<T> auditableEntity, AccountTopic topic){
        AccountEntity accountEntity = new AccountEntity();
        accountEntity.setAuditableEntity(auditableEntity);
        accountEntity.setAccountCode(topic.getCode());
        accountEntity.setSerial(accountRepository.findMaxOfSerial(auditableEntity) + 1 );
        accountEntity.setOpenDate(new Date());
        accountEntity.setAccountNature(extractAccountNature(topic));
        accountEntity.setBalance(BigDecimal.ZERO);
        accountEntity.setBalanceType(accountEntity.getAccountNature());
        if(auditableEntity instanceof User){
            accountEntity.setDescription("حساب پیش دریافت کاربر " + ((User)auditableEntity).getName() +" با شماره تلفن "+ ((User)auditableEntity).getPhoneNumber());
        }else if(auditableEntity instanceof GateEntity){
            accountEntity.setDescription("حساب پیش پرداخت گیت " + ((GateEntity)auditableEntity).getName());
        }
        return add(accountEntity);
    }

    @Override
    public AccountEntity update(AccountEntity entity) {
        return null;
    }

    @Override
    public AccountEntity delete(AccountEntity entity) {
        return null;
    }

    @Override
    public AccountEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<AccountEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<AccountDto> convertToDtos(List<AccountEntity> entities) {
        return null;
    }

    private void fillAccountNumber(AuditableEntitiesEntity account){

    }

    private DebtorCreditor extractAccountNature(AccountTopic topic){
        switch (topic){
            case CASH:
                return DebtorCreditor.DEBTOR;
            case OPERATING_INCOME:
            case PREPAYMENT:
            case PISH_DARYAFT:
                return DebtorCreditor.CREDITOR;
            default:
                throw new RuntimeException();
        }
    }

    public AccountEntity getCashAccount(){
        return null;
    }

    public AccountEntity getByAuditable(AuditableEntitiesEntity auditableEntity){
        return accountRepository.findByAuditableEntityAndDeletedIsFalse(auditableEntity);
    }

}
