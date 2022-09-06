package com.notrika.gympin.domain.accounting;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.common.accounting.account.dto.TransactionDto;
import com.notrika.gympin.common.accounting.account.param.TransactionParam;
import com.notrika.gympin.common.accounting.account.service.TransactionService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.persistence.dao.repository.DocumentRepository;
import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
import com.notrika.gympin.persistence.entity.accounting.DocumentEntity;
import com.notrika.gympin.persistence.entity.accounting.DocumentItemsEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TransactionServiceImpl extends AbstractBaseService<TransactionParam, TransactionDto, BaseFilter<?>, DocumentEntity> implements TransactionService {

    @Autowired
    private AccountingServiceImpl accountingService;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public TransactionDto add(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto update(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto delete(@NonNull TransactionParam transactionParam) {
        return null;
    }

    @Override
    public TransactionDto getById(long id) {
        return null;
    }

    @Override
    public DocumentEntity add(DocumentEntity entity) {
        documentRepository.add(entity);

        return null;
    }

    private DocumentEntity add(AccountEntity from,AccountEntity to, BigDecimal amount){
        return null;
    }

    @Override
    public DocumentEntity update(DocumentEntity entity) {
        return null;
    }

    @Override
    public DocumentEntity delete(DocumentEntity entity) {
        return null;
    }

    @Override
    public DocumentEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<DocumentEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<TransactionDto> convertToDtos(List<DocumentEntity> entities) {
        return null;
    }

    @Override
    public TransactionDto deposit(BigDecimal amount) {
        User user = (User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        AccountEntity to= accountingService.getByAuditable(user);
        AccountEntity cash= accountingService.getCashAccount();
        DocumentEntity documentEntity=new DocumentEntity();
        documentEntity.setDocumentNumber(documentRepository.findMaxDocNum()+1);
        documentEntity.setDocumentDate(new Date());
        documentEntity.setTotalAmount(amount);
        documentEntity.setDescription("واریز به حساب توسط کاربر " + user.getName() + " به شماره تلفن " + user.getPhoneNumber());

        List<DocumentItemsEntity> documentItemsEntities=new ArrayList<>();
        documentEntity.setDocumentsItems(documentItemsEntities);

        DocumentItemsEntity userAccountItem=new DocumentItemsEntity();
        userAccountItem.setAccount(to);
        userAccountItem.setAmount(amount);
        userAccountItem.setTransactionType(DebtorCreditor.CREDITOR);
        documentItemsEntities.add(userAccountItem);

        DocumentItemsEntity cashAccountItem=new DocumentItemsEntity();
        cashAccountItem.setAccount(cash);
        cashAccountItem.setAmount(amount);
        cashAccountItem.setTransactionType(DebtorCreditor.DEBTOR);
        documentItemsEntities.add(cashAccountItem);

        this.add(documentEntity);

        return null;
    }

    public TransactionDto withdrawal(AccountEntity account,BigDecimal amount){
        return null;
    }

}
