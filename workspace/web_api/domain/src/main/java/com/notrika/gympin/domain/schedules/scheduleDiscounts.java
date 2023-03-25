package com.notrika.gympin.domain.schedules;

import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.PlanDiscountHistoryRepository;
import com.notrika.gympin.persistence.dao.repository.PlanRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class scheduleDiscounts {

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private PlanDiscountHistoryRepository planDiscountHistoryRepository;


    @Transactional
    public void UpdateAutoPlansDiscount() {
      List<PlaceEntity> places =  placeRepository.findAllByDeletedIsFalseAndAutoDiscountIsTrue();
      List<PlanDiscountHistoryEntity> planDiscountHistoryEntityListToAdd = new ArrayList<>();
      List<PlanEntity> planEntityListToUpdate = new ArrayList<>();
        for (PlaceEntity place : places) {
            for (PlanEntity plan : place.getPlans()) {
                BigDecimal beforPrice = plan.getPrice();
                Short newDiscount = (short) Math.round(place.getCommissionFee()*Math.random());
                if(newDiscount>1){
                    plan.setDiscount(newDiscount);
                    BigDecimal newPrice = plan.getPlacePrice().multiply(BigDecimal.valueOf(1-(newDiscount*0.01))).setScale(-3, RoundingMode.HALF_UP);
                    plan.setPrice(newPrice);
                    planEntityListToUpdate.add(plan);

                    planDiscountHistoryEntityListToAdd.add(
                            PlanDiscountHistoryEntity.builder()
                                    .plan(plan)
                                    .discount(newDiscount)
                                    .beforPrice(beforPrice)
                                    .afterPrice(newPrice)
                                    .build());
                }


            }
        }
        planRepository.updateAll(planEntityListToUpdate);
        planDiscountHistoryRepository.addAll(planDiscountHistoryEntityListToAdd);

    }
}
