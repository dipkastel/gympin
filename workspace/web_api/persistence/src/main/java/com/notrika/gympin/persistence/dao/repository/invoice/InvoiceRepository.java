package com.notrika.gympin.persistence.dao.repository.invoice;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;

import java.util.List;

public interface InvoiceRepository extends BaseRepository<InvoiceEntity, Long> {


    List<InvoiceEntity> findByUserIdAndDeletedIsFalse(Long userId);

    List<InvoiceEntity> findByUserIdAndStatusAndDeletedIsFalse(Long userId, InvoiceStatus status);
}
