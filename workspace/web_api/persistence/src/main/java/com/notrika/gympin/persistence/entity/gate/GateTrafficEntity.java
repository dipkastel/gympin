package com.notrika.gympin.persistence.entity.gate;

import com.notrika.gympin.common.gate.enums.DayOfWeek;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "gateTraffic")
public class GateTrafficEntity extends BaseEntityWithCreateUpdate<GateTrafficEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    private GateEntity gate;

    @Column(name = "traffic")
    private Short traffic;


}
