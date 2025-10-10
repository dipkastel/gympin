package com.notrika.gympin.persistence.dao.repository.invoice;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface InvoiceRepository extends BaseRepository<InvoiceEntity, Long> {


    List<InvoiceEntity> findByUserIdAndDeletedIsFalse(Long userId);

    List<InvoiceEntity> findByUserIdAndStatusAndDeletedIsFalse(Long userId, InvoiceStatus status);

    List<InvoiceEntity> findByCorporateIdAndDateAndStatusAndDeletedIsFalse(Long CorporateId, Date date, InvoiceStatus status);

    List<InvoiceEntity> findByStatusAndTypeAndDeletedIsFalse(InvoiceStatus status, InvoiceType type);

    @Query("SELECT ib.invoice FROM InvoiceBuyableEntity ib where ib.place.id =:#{#cateringId} and ib.invoice.status like 'NEED_REVIEW' and ib.invoice.deleted = false and  ib.deleted = false  GROUP by ib.invoice.id")
    List<InvoiceEntity> findPreOrderByCateringId(Long cateringId);
}
