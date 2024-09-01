package com.notrika.gympin.persistence.entity.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "ticketBuyable")
public class BuyableEntity<P> extends BaseEntityWithCreateUpdate<P> {


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyablePlaceId")
    private PlaceEntity place;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "enable",nullable = false)
    private Boolean enable;

    @Column(name = "discount", nullable = false,columnDefinition = "smallint default 0")
    private Short discount;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "valuePrice")
    private BigDecimal valuePrice;

    @Column(name = "placePrice")
    private BigDecimal placePrice;

    @Column(name = "buyableType", nullable = false)
    @Enumerated(EnumType.STRING)
    private BuyableType buyableType;

    @OneToMany(mappedBy = "buyable")
   @JsonIgnore
@ToString.Exclude
    private List<BuyableDiscountHistoryEntity> discountHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prerequisiteId")
    @Getter
    @Setter
    private BuyableEntity prerequisite;

    @OneToMany(mappedBy = "prerequisite",fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private List<BuyableEntity> prerequisites;

    @OneToMany(mappedBy = "buyable")
   @JsonIgnore
@ToString.Exclude
    private List<PlacePersonelBuyableAccessEntity> placePersonnelBuyableAccess;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "beneficiary")
    private PlacePersonnelEntity beneficiary;

    @OneToMany(mappedBy = "buyable", fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private List<InvoiceBuyableEntity> inInvoices;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BuyableEntity that = (BuyableEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
