package com.notrika.gympin.persistence.entity.finance.user;

import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "financeUserTransaction")
public class FinanceUserTransactionEntity extends BaseTransactionEntity<FinanceUserTransactionEntity> {


    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financeUserId")
    private FinanceUserEntity financeUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private PlaceEntity place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchasedId")
    private PurchasedBaseEntity purchased;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceUserTransactionEntity that = (FinanceUserTransactionEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
