package com.notrika.gympin.persistence.entity.finance.invoice;

import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "invoice")
public class InvoiceEntity extends BaseEntityWithCreateUpdate<InvoiceEntity> {

    @ManyToOne
    @ToString.Exclude
    private UserEntity user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    //user
    @Column(name = "fullName")
    private String fullName;

    @Column(unique = true, name = "phoneNumber", nullable = false)
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


    //list-buyable
    @OneToMany(mappedBy = "invoice",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<InvoiceBuyableEntity> invoiceBuyables;

    //list-pay-details


    //note
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
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
