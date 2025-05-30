package com.notrika.gympin.persistence.entity.purchased;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
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
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "purchasedBase")
public class PurchasedBaseEntity<P> extends BaseEntityWithCreateUpdate<P> {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "discount")
    private Short discount;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "sellPrice")
    private BigDecimal sellPrice;

    @Column(name = "placePrice")
    private BigDecimal placePrice;

    @Column(name = "pKey",unique = true)
    private String key;



    @ManyToOne
    @JoinColumn(name = "PlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceGymEntity place;

    @ManyToOne
    @JoinColumn(name = "customerUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity customer;

    @Column(name = "purchasedType", nullable = false)
    @Enumerated(EnumType.STRING)
    private PurchasedType purchasedType;

    @ManyToMany
    @JoinTable(name = "financePurchasedSerial", joinColumns = @JoinColumn(name = "SerialId"), inverseJoinColumns = @JoinColumn(name = "PurchasedId"))
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceSerialEntity> Serials;


    @Column(name = "voucher")
    private String voucher;


    @OneToMany(mappedBy = "purchased")
    @JsonIgnore
    @ToString.Exclude
    private List<ManageNoteEntity> notes;

    @OneToMany(mappedBy = "purchased")
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceIncomeTransactionEntity> incomeTransactions;

    @OneToMany(mappedBy = "purchased")
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> userTransactions;

    @OneToMany(mappedBy = "purchased")
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceDiscountTransactionEntity> discountTransactions;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedBaseEntity that = (PurchasedBaseEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
