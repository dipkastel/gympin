package com.notrika.gympin.persistence.dao.repository.invoice;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;

import java.util.List;

public interface InvoiceBuyableRepository extends BaseRepository<InvoiceBuyableEntity, Long> {


    List<InvoiceBuyableEntity> findAllByInvoiceIdAndDeletedIsFalse(Long invoiceId);


}
