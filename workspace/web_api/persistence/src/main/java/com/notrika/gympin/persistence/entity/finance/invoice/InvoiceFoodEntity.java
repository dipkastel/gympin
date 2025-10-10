package com.notrika.gympin.persistence.entity.finance.invoice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "invoiceFood")
public class InvoiceFoodEntity extends InvoiceBuyableEntity<InvoiceFoodEntity> {

    @Column(name = "date")
    private Date date;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyableFoodId")
    @JsonIgnore
    @ToString.Exclude
    private TicketFoodMenuEntity foodMenus;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceFoodEntity that = (InvoiceFoodEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
