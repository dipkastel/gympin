package com.notrika.gympin.persistence.entity.finance.user.invoice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "invoice")
public class InvoiceEntity extends BaseEntityWithCreateUpdate<InvoiceEntity> {

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    @JsonIgnore
    @ToString.Exclude
    private FinanceSerialEntity serial;


    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    //user
    @Column(name = "fullName")
    private String fullName;

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "nationalCode")
    private String nationalCode;

    @Column(name = "totalPrice")
    private BigDecimal totalPrice;

    @Column(name = "priceToPay")
    private BigDecimal priceToPay;

    @ManyToOne
    @JoinColumn(name = "corporateId")
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceBuyableEntity<?>> invoiceBuyables = new ArrayList<>();

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceExtraItemEntity> invoiceExtraItems;

    public void addInvoiceBuyable(InvoiceBuyableEntity<?> buyable) {
        invoiceBuyables.add(buyable);
        buyable.setInvoice(this);
    }

    public void removeBuyable(InvoiceBuyableEntity<?> buyable) {
        invoiceBuyables.remove(buyable);
        buyable.setPlace(null);
    }

    public List<InvoiceFoodEntity> getInvoiceFoods() {
        if(getInvoiceBuyables()==null) return new ArrayList<>();
        return getInvoiceBuyables().stream()
                .filter(b -> !b.isDeleted())
                .filter(b -> b instanceof InvoiceFoodEntity)
                .map(b -> (InvoiceFoodEntity) b)
                .collect(Collectors.toList());
    }

    public List<InvoiceSubscribeEntity> getInvoiceSubscribes() {
        if(getInvoiceBuyables()==null) return new ArrayList<>();
        return getInvoiceBuyables().stream()
                .filter(b -> !b.isDeleted())
                .filter(b -> b instanceof InvoiceSubscribeEntity)
                .map(b -> (InvoiceSubscribeEntity) b)
                .collect(Collectors.toList());
    }

    //note
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<ManageNoteEntity> notes;


    //vocher

    ////shipping-details(price-address-..)
    ////delivery-package-details(size-weight)
    ////


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceEntity that = (InvoiceEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
