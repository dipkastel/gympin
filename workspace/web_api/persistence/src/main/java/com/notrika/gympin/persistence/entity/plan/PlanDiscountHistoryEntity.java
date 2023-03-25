package com.notrika.gympin.persistence.entity.plan;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "planDiscountHistory")
public class PlanDiscountHistoryEntity extends BaseEntityWithCreateUpdate<PlanDiscountHistoryEntity> {

    @ManyToOne(optional = false)
    private PlanEntity plan;

    @Column(name = "discount", nullable = false,columnDefinition = "smallint default 0")
    private Short discount;

    @Column(name = "afterPrice")
    private BigDecimal afterPrice;

    @Column(name = "beforPrice")
    private BigDecimal beforPrice;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanDiscountHistoryEntity that = (PlanDiscountHistoryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
