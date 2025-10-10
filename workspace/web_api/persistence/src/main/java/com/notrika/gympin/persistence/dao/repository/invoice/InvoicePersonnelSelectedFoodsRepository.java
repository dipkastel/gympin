package com.notrika.gympin.persistence.dao.repository.invoice;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoicePersonnelSelectedFoodEntity;

public interface InvoicePersonnelSelectedFoodsRepository extends BaseRepository<InvoicePersonnelSelectedFoodEntity, Long> {


    InvoicePersonnelSelectedFoodEntity findByPersonnelIdAndFoodMenuIdAndDeletedIsFalse(Long personnelId,Long FoodMenuId);

}
