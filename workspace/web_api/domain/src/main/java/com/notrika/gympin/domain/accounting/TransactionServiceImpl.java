//package com.notrika.gympin.domain.accounting;
//
//import com.notrika.gympin.common._base.query.BaseQuery;
//import com.notrika.gympin.common.accounting.DebtorCreditor;
//import com.notrika.gympin.common.accounting.enums.TransactionType;
//import com.notrika.gympin.common.accounting.param.TransactionParam;
//import com.notrika.gympin.common.accounting.service.TransactionService;
//import com.notrika.gympin.common.context.GympinContext;
//import com.notrika.gympin.common.context.GympinContextHolder;
//import com.notrika.gympin.common.exception.ExceptionBase;
//import com.notrika.gympin.domain.AbstractBaseService;
//import com.notrika.gympin.domain.gate.GateServiceImpl;
//import com.notrika.gympin.domain.sport.SportServiceImpl;
//import com.notrika.gympin.domain.util.convertor.SportConvertor;
//import com.notrika.gympin.persistence.dao.repository.DocumentItemsRepository;
//import com.notrika.gympin.persistence.dao.repository.DocumentRepository;
//import com.notrika.gympin.persistence.entity.accounting.*;
//import com.notrika.gympin.persistence.entity.gate.GateEntity;
//import com.notrika.gympin.persistence.entity.sport.SportEntity;
//import com.notrika.gympin.persistence.entity.user.UserEntity;
//import lombok.NonNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.util.*;
//
//@Service
//public class TransactionServiceImpl extends AbstractBaseService<TransactionParam, TransactionDto, BaseQuery<?>, DocumentEntity> implements TransactionService {
//
//    @Autowired
//    private AccountingServiceImpl accountingService;
//
//    @Autowired
//    private DocumentRepository documentRepository;
//
//    @Autowired
//    private GlobalLegerServiceImpl globalLegerService;
//
//    @Autowired
//    private DocumentItemsRepository documentItemsRepository;
//
//    @Autowired
//    private SportServiceImpl sportService;
//
//    @Autowired
//    private GateServiceImpl gateService;
//
//    @Override
//    public TransactionDto add(@NonNull TransactionParam transactionParam) {
//        TransactionDto transactionDto = new TransactionDto();
//        validateTransaction(transactionParam);
//        if (transactionParam.getTransactionType() == TransactionType.SETTLEMENT) {
//            this.settlement(transactionParam);
//        } else if (transactionParam.getTransactionType() == TransactionType.WITHDRAWAL) {
//            this.withdrawal(transactionParam);
//        } else if (transactionParam.getTransactionType() == TransactionType.TRANSFER) {
//            this.transfer(transactionParam);
//        }
//        return transactionDto;
//    }
//
//    private void validateTransaction(TransactionParam transactionParam) {
//        if (transactionParam.getTransactionType() == null) {
//            throw new ExceptionBase();
//        }
//        if (transactionParam.getAmount() == null || transactionParam.getAmount().equals(BigDecimal.ZERO) || transactionParam.getAmount().compareTo(BigDecimal.ZERO) < 0) {
//            throw new ExceptionBase();
//        }
//        if (transactionParam.getTransactionType() == TransactionType.SETTLEMENT && (transactionParam.getToAccount() == null)) {
//            throw new ExceptionBase();
//        }
//        if (transactionParam.getTransactionType() == TransactionType.WITHDRAWAL && (transactionParam.getFromAccount() == null)) {
//            throw new ExceptionBase();
//        }
//        if (transactionParam.getTransactionType() == TransactionType.TRANSFER && (transactionParam.getFromAccount() == null || transactionParam.getToAccount() == null)) {
//            throw new ExceptionBase();
//        }
//    }
//
//    @Override
//    public TransactionDto update(@NonNull TransactionParam transactionParam) {
//        return null;
//    }
//
//    @Override
//    public TransactionDto delete(@NonNull TransactionParam transactionParam) {
//        return null;
//    }
//
//    @Override
//    public TransactionDto getById(long id) {
//        return null;
//    }
//
//    @Override
//    public DocumentEntity add(DocumentEntity entity) {
//        documentRepository.add(entity);
//
//        return null;
//    }
//
//    private DocumentEntity add(AccountEntity from, AccountEntity to, BigDecimal amount) {
//        return null;
//    }
//
//    @Override
//    public DocumentEntity update(DocumentEntity entity) {
//        return null;
//    }
//
//    @Override
//    public DocumentEntity delete(DocumentEntity entity) {
//        return null;
//    }
//
//    @Override
//    public DocumentEntity getEntityById(long id) {
//        return null;
//    }
//
//    @Override
//    public List<DocumentEntity> getAll(Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public Page<DocumentEntity> findAll(Specification<DocumentEntity> specification, Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public List<TransactionDto> convertToDtos(List<DocumentEntity> entities) {
//        return null;
//    }
//
//    @Override
//    public Page<TransactionDto> convertToDtos(Page<DocumentEntity> entities) {
//        return null;
//    }
//
//
//    public void settlement(TransactionParam transactionParam) {
//        AccountEntity account = accountingService.getEntityById(transactionParam.getToAccount().getAuditableId());
//        AccountEntity cashAccount = accountingService.getCashAccount();
//        DebtorCreditor accountNature = account.getAccountNature();
//        DebtorCreditor transactionNature = null;
//        if (accountNature == DebtorCreditor.CREDITOR) {
//            transactionNature = DebtorCreditor.CREDITOR;
//        } else {
//            transactionNature = DebtorCreditor.DEBTOR;
//        }
//        DocumentEntity documentEntity = new DocumentEntity();
//        documentEntity.setDocumentNumber(documentRepository.findMaxDocNum() + 1);
//        documentEntity.setDocumentDate(new Date());
//        documentEntity.setTotalAmount(transactionParam.getAmount());
//        documentEntity.setDescription(transactionParam.getDescription());
//
//        List<DocumentItemsEntity> documentItemsEntities = new ArrayList<>();
//        documentEntity.setDocumentsItems(documentItemsEntities);
//
//        DocumentItemsEntity userAccountItem = new DocumentItemsEntity();
//        userAccountItem.setAccount(account);
//        userAccountItem.setAmount(transactionParam.getAmount());
//        userAccountItem.setTransactionType(DebtorCreditor.CREDITOR);
//        documentItemsEntities.add(userAccountItem);
//
//        DocumentItemsEntity cashAccountItem = new DocumentItemsEntity();
//        cashAccountItem.setAccount(cashAccount);
//        cashAccountItem.setAmount(transactionParam.getAmount());
//        cashAccountItem.setTransactionType(DebtorCreditor.DEBTOR);
//        documentItemsEntities.add(cashAccountItem);
//
//        this.add(documentEntity);
//
//        GlobalLegerEntity globalLegerEntity = globalLegerService.getByAccount(account);
//        List<GlobalLegerItemEntity> globalLegerItemEntity;
//        if (globalLegerEntity == null) {
//            globalLegerEntity = new GlobalLegerEntity();
//            globalLegerEntity.setAccount(account);
//            globalLegerItemEntity = new ArrayList<>();
//            globalLegerEntity.setGlobalLegerItems(globalLegerItemEntity);
//        }
//        globalLegerItemEntity = globalLegerEntity.getGlobalLegerItems();
//
//        globalLegerItemEntity.add(GlobalLegerItemEntity.builder().document(documentEntity).build());
//
//        globalLegerEntity = globalLegerService.addOrUpdate(globalLegerEntity);
//
//
//        GlobalLegerEntity globalLegerForCash = globalLegerService.getByAccount(cashAccount);
//        List<GlobalLegerItemEntity> globalLegerItemForCash = null;
//        if (globalLegerForCash == null) {
//            globalLegerForCash = new GlobalLegerEntity();
//            globalLegerForCash.setAccount(cashAccount);
//            globalLegerItemForCash = new ArrayList<>();
//            globalLegerForCash.setGlobalLegerItems(globalLegerItemForCash);
//        }
//        globalLegerItemForCash = globalLegerForCash.getGlobalLegerItems();
//
//        globalLegerItemForCash.add(GlobalLegerItemEntity.builder().document(documentEntity).build());
//
//
//    }
//
//    public void withdrawal(TransactionParam transactionParam) {
//        AccountEntity account = accountingService.getEntityById(transactionParam.getFromAccount().getAuditableId());
//        AccountEntity cashAccount = accountingService.getCashAccount();
//        DebtorCreditor accountNature = account.getAccountNature();
//        DebtorCreditor transactionNature = null;
//        if (accountNature == DebtorCreditor.CREDITOR) {
//            transactionNature = DebtorCreditor.DEBTOR;
//        } else {
//            transactionNature = DebtorCreditor.CREDITOR;
//        }
//        DocumentEntity documentEntity = new DocumentEntity();
//        documentEntity.setDocumentNumber(documentRepository.findMaxDocNum() + 1);
//        documentEntity.setDocumentDate(new Date());
//        documentEntity.setTotalAmount(transactionParam.getAmount());
//        documentEntity.setDescription(transactionParam.getDescription());
//
//        List<DocumentItemsEntity> documentItemsEntities = new ArrayList<>();
//        documentEntity.setDocumentsItems(documentItemsEntities);
//
//        DocumentItemsEntity userAccountItem = new DocumentItemsEntity();
//        userAccountItem.setAccount(account);
//        userAccountItem.setAmount(transactionParam.getAmount());
//        userAccountItem.setTransactionType(DebtorCreditor.DEBTOR);
//        documentItemsEntities.add(userAccountItem);
//
//        DocumentItemsEntity cashAccountItem = new DocumentItemsEntity();
//        cashAccountItem.setAccount(cashAccount);
//        cashAccountItem.setAmount(transactionParam.getAmount());
//        cashAccountItem.setTransactionType(DebtorCreditor.CREDITOR);
//        documentItemsEntities.add(cashAccountItem);
//
//        this.add(documentEntity);
//    }
//
//    //TODO:Needs work
//    public void transfer(TransactionParam transactionParam) {
//        AccountEntity account = accountingService.getEntityById(transactionParam.getFromAccount().getAuditableId());
//        AccountEntity cashAccount = accountingService.getEntityById(transactionParam.getFromAccount().getAuditableId());
//        DebtorCreditor accountNature = account.getAccountNature();
//        DebtorCreditor transactionNature = null;
//        if (accountNature == DebtorCreditor.CREDITOR) {
//            transactionNature = DebtorCreditor.DEBTOR;
//        } else {
//            transactionNature = DebtorCreditor.CREDITOR;
//        }
//        DocumentEntity documentEntity = new DocumentEntity();
//        documentEntity.setDocumentNumber(documentRepository.findMaxDocNum() + 1);
//        documentEntity.setDocumentDate(new Date());
//        documentEntity.setTotalAmount(transactionParam.getAmount());
//        documentEntity.setDescription(transactionParam.getDescription());
//
//        List<DocumentItemsEntity> documentItemsEntities = new ArrayList<>();
//        documentEntity.setDocumentsItems(documentItemsEntities);
//
//        DocumentItemsEntity userAccountItem = new DocumentItemsEntity();
//        userAccountItem.setAccount(account);
//        userAccountItem.setAmount(transactionParam.getAmount());
//        userAccountItem.setTransactionType(DebtorCreditor.DEBTOR);
//        documentItemsEntities.add(userAccountItem);
//
//        DocumentItemsEntity cashAccountItem = new DocumentItemsEntity();
//        cashAccountItem.setAccount(cashAccount);
//        cashAccountItem.setAmount(transactionParam.getAmount());
//        cashAccountItem.setTransactionType(DebtorCreditor.CREDITOR);
//        documentItemsEntities.add(cashAccountItem);
//
//        this.add(documentEntity);
//    }
//
//
//    @Override
//    public TransactionDto deposit(BigDecimal amount) {
//        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//        AccountEntity to = accountingService.getByAuditable(user);
//        AccountEntity cash = accountingService.getCashAccount();
//        DocumentEntity documentEntity = new DocumentEntity();
//        documentEntity.setDocumentNumber(documentRepository.findMaxDocNum() + 1);
//        documentEntity.setDocumentDate(new Date());
//        documentEntity.setTotalAmount(amount);
//        documentEntity.setDescription("واریز به حساب توسط کاربر " + user.getFullName() + " به شماره تلفن " + user.getPhoneNumber());
//
//        List<DocumentItemsEntity> documentItemsEntities = new ArrayList<>();
//        documentEntity.setDocumentsItems(documentItemsEntities);
//
//        DocumentItemsEntity userAccountItem = new DocumentItemsEntity();
//        userAccountItem.setAccount(to);
//        userAccountItem.setAmount(amount);
//        userAccountItem.setTransactionType(DebtorCreditor.CREDITOR);
//        documentItemsEntities.add(userAccountItem);
//
//        DocumentItemsEntity cashAccountItem = new DocumentItemsEntity();
//        cashAccountItem.setAccount(cash);
//        cashAccountItem.setAmount(amount);
//        cashAccountItem.setTransactionType(DebtorCreditor.DEBTOR);
//        documentItemsEntities.add(cashAccountItem);
//
//        this.add(documentEntity);
//
//        return null;
//    }
//
//    @Override
//    public OverallSportsTransactionDto getSportsOverallTransaction() {
//        OverallSportsTransactionDto overallSportsTransactionDto=new OverallSportsTransactionDto();
//        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//        List<GateEntity> gates = gateService.getGatesByOwner(user);
//        Map<SportEntity,List<DocumentItemsEntity>> map=new HashMap<>();
//        for (GateEntity gate : gates) {
//            List<DocumentItemsEntity> docItems = documentItemsRepository.findDocumentItemsEntitiesByAccount_AuditableEntityAndDeletedIsFalse(gate);
//            map.computeIfAbsent(gate.getSport(), k -> docItems);
//        }
//        for (Map.Entry<SportEntity, List<DocumentItemsEntity>> entry:map.entrySet()){
//            OverallSportsTransactionItemDto itemDto=new OverallSportsTransactionItemDto();
//            itemDto.setSport(SportConvertor.toDto(entry.getKey()));
//            BigDecimal total=BigDecimal.ZERO;
//            for (DocumentItemsEntity entity : entry.getValue()) {
//                if (entity.getTransactionType() == DebtorCreditor.CREDITOR)
//                    total=total.add(entity.getAmount());
//            }
//        }
//
//        return overallSportsTransactionDto;
//    }
//
//    @Override
//    public SemiOverallTransactionDto getSemiOverallTransactions() {
//        Map<AccountEntity, List<DocumentItemsEntity>> map = new HashMap<>();
//        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//        AccountEntity account=accountingService.getByAuditable(user);
//        List<DocumentItemsEntity> documentItemsEntities = documentItemsRepository.findDocumentItemsEntitiesByAccount_AuditableEntityAndDeletedIsFalse(user);
//        for (DocumentItemsEntity die : documentItemsEntities) {
//            DocumentEntity document = die.getDocument();
//            List<DocumentItemsEntity> documentsItems = document.getDocumentsItems();
//            for (DocumentItemsEntity adie : documentsItems) {
//                if(adie.getAccount().equals(die.getAccount()))
//                    continue;
//                List<DocumentItemsEntity> tmpAccount = map.computeIfAbsent(adie.getAccount(), k -> new ArrayList<>());
//                tmpAccount.add(adie);
//            }
//        }
//
//        SemiOverallTransactionDto semiOverallTransactionDto=new SemiOverallTransactionDto();
//        List<SemiOverallTransactionItemDto> items=new ArrayList<>();
//        semiOverallTransactionDto.setItems(items);
//        for (Map.Entry<AccountEntity, List<DocumentItemsEntity>> entry : map.entrySet()) {
//            AccountEntity k = entry.getKey();
//            List<DocumentItemsEntity> v = entry.getValue();
//            SemiOverallTransactionItemDto semiOverallTransactionItemDto = new SemiOverallTransactionItemDto();
//            semiOverallTransactionItemDto.setTitle(k.getDescription());
//            BigDecimal amount = BigDecimal.ZERO;
//            for (DocumentItemsEntity lv : v) {
//                if (lv.getTransactionType() == account.getAccountNature()) amount = amount.add(lv.getAmount());
//                else amount = amount.subtract(lv.getAmount());
//            }
//            semiOverallTransactionItemDto.setAmount(amount);
//            items.add(semiOverallTransactionItemDto);
//        }
//        return semiOverallTransactionDto;
//    }
//
//    public TransactionDto withdrawal(AccountEntity account, BigDecimal amount) {
//        return null;
//    }
//
//}
