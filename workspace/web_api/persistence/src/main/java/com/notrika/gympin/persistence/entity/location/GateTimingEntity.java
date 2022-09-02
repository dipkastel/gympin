package com.notrika.gympin.persistence.entity.location;

import com.notrika.gympin.common.location.enums.DayOfWeek;
import com.notrika.gympin.common.user.enums.Sex;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Time;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "gate_timing")
public class GateTimingEntity extends BaseEntityWithCreateUpdate<GateTimingEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    private GateEntity gate;

    private DayOfWeek dayOfWeek;

    private Time openingTime;

    private Time closingTime;

    private BigDecimal price;

    private Sex sex;

    @ManyToOne
    private PlanGateEntity planGate;

}
