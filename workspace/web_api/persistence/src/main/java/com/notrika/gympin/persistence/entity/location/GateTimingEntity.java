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
import java.time.LocalTime;

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

    private LocalTime openingTime;

    private LocalTime closingTime;

    private BigDecimal price;

    private Sex sex;

    @ManyToOne
    private PlanGateEntity planGate;

}
