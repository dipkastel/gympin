package com.notrika.gympin.persistence.entity.ticket;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.mapping.Any;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticketSubscribeDiscountHistory")
public class BuyableDiscountHistoryEntity extends BaseEntityWithCreateUpdate<BuyableDiscountHistoryEntity> {

    @ManyToOne(optional = false)
    @JoinColumn(name = "buyableId")
    private BuyableEntity buyable;

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
        BuyableDiscountHistoryEntity that = (BuyableDiscountHistoryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
