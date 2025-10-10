package com.notrika.gympin.persistence.entity.finance.invoice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "invoicePersonnelSelectedFood")
public class InvoicePersonnelSelectedFoodEntity extends BaseEntityWithCreateUpdate<InvoicePersonnelSelectedFoodEntity> {

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private CorporatePersonnelEntity personnel;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private TicketFoodMenuEntity foodMenu;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;

    @Column(name = "ordered", nullable = false , columnDefinition = "boolean default false")
    private Boolean ordered;

    @Column(name = "count")
    private Short count;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private Date date;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoicePersonnelSelectedFoodEntity that = (InvoicePersonnelSelectedFoodEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
