package com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "purchasedSubscribeEntryMessage")
public class PurchasedSubscribeMessageEntity extends BaseEntityWithCreateUpdate<PurchasedSubscribeMessageEntity> {

    @ManyToOne
    @JoinColumn(name = "pSubscribeEntryId")
    private PurchasedSubscribeEntryEntity subscribeEntry;

    @Column(name = "message")
    private String message;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedSubscribeMessageEntity that = (PurchasedSubscribeMessageEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
