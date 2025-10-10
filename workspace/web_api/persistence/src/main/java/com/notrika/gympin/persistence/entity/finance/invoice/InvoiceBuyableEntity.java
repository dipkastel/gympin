package com.notrika.gympin.persistence.entity.finance.invoice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "invoiceBuyable")
public class InvoiceBuyableEntity<b> extends BaseEntityWithCreateUpdate<b> {


    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "discount", nullable = false,columnDefinition = "smallint default 0")
    private Short discount;

    @Column(name = "placePrice")
    private BigDecimal placePrice;

    @Column(name = "buyableType", nullable = false)
    @Enumerated(EnumType.STRING)
    private BuyableType buyableType;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "buyablePlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceEntity place;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "beneficiary")
    @JsonIgnore
    @ToString.Exclude
    private PlacePersonnelEntity beneficiary;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "count")
    private Short count;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    @JsonIgnore
    @ToString.Exclude
    private InvoiceEntity invoice;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyableId")
    @JsonIgnore
    @ToString.Exclude
    private BuyableEntity buyable;




    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceBuyableEntity that = (InvoiceBuyableEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
