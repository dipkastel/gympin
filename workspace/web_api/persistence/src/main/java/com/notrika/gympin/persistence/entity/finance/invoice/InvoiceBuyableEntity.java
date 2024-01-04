package com.notrika.gympin.persistence.entity.finance.invoice;

import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
public class InvoiceBuyableEntity extends BaseEntityWithCreateUpdate<InvoiceBuyableEntity> {


    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "discount", nullable = false,columnDefinition = "smallint default 0")
    private Short discount;

    @Column(name = "placePrice")
    private BigDecimal placePrice;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "buyableType", nullable = false)
    @Enumerated(EnumType.STRING)
    private BuyableType buyableType;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "buyablePlaceId")
    private PlaceEntity place;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "beneficiary")
    private PlacePersonnelEntity beneficiary;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "count")
    private Short count;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private InvoiceEntity invoice;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyableId")
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
