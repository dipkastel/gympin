package com.notrika.gympin.domain.accounting;

import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.persistence.dao.repository.GlobalLegerRepository;
import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
import com.notrika.gympin.persistence.entity.accounting.DocumentItemsEntity;
import com.notrika.gympin.persistence.entity.accounting.GlobalLegerEntity;
import com.notrika.gympin.persistence.entity.accounting.GlobalLegerItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class GlobalLegerServiceImpl {

    @Autowired
    private GlobalLegerRepository globalLegerRepository;

    public GlobalLegerEntity addOrUpdate(GlobalLegerEntity globalLegerEntity) {
        BigDecimal totalAmount = globalLegerEntity.getTotalAmount();
        for (GlobalLegerItemEntity globalLegerItemEntity : globalLegerEntity.getGlobalLegerItems()) {
            for (DocumentItemsEntity documentItemsEntity : globalLegerItemEntity.getDocument().getDocumentsItems()) {
                DebtorCreditor transactionType = documentItemsEntity.getTransactionType();
                DebtorCreditor accountNature = documentItemsEntity.getAccount().getAccountNature();
                if (transactionType == accountNature) {
                    totalAmount = totalAmount.add(documentItemsEntity.getAmount());
                } else {
                    totalAmount = totalAmount.subtract(documentItemsEntity.getAmount());
                }
            }
        }
        if (totalAmount.compareTo(BigDecimal.ZERO) < 0) {
            if (globalLegerEntity.getAccount().getAccountNature() == DebtorCreditor.CREDITOR) globalLegerEntity.setTotalAmountNature(DebtorCreditor.DEBTOR);
            else globalLegerEntity.setTotalAmountNature(DebtorCreditor.CREDITOR);
        }else {
            globalLegerEntity.setTotalAmountNature(globalLegerEntity.getAccount().getAccountNature());
        }
        globalLegerEntity.setTotalAmount(totalAmount.abs());
        GlobalLegerEntity globalLegerEntityByAccount = globalLegerRepository.findGlobalLegerEntityByAccount(globalLegerEntity.getAccount());
        if (globalLegerEntityByAccount == null) {
            globalLegerRepository.add(globalLegerEntity);
        }else {
            globalLegerRepository.update(globalLegerEntity);
        }

        return null;
    }

    public GlobalLegerEntity getByAccount(AccountEntity account) {
        return globalLegerRepository.findGlobalLegerEntityByAccount(account);
    }
}
