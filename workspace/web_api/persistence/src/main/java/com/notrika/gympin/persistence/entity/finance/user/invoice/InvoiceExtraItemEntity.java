package com.notrika.gympin.persistence.entity.finance.user.invoice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "invoiceExtraItem")
public class InvoiceExtraItemEntity extends BaseEntityWithCreateUpdate<InvoiceExtraItemEntity> {

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    @JsonIgnore
    @ToString.Exclude
    private InvoiceEntity invoice;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "buyablePlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceEntity place;

    @Column(name = "placePrice")
    private BigDecimal placePrice;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "beneficiary")
    @JsonIgnore
    @ToString.Exclude
    private PlacePersonnelEntity beneficiary;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "count")
    private Short count;


    @Column(name = "description")
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceExtraItemEntity that = (InvoiceExtraItemEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
