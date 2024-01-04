package com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe;

import com.notrika.gympin.common.place.hallEnter.enums.SubscribeEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "PurchasedSubscribeEntryRequstEntity")
public class PurchasedSubscribeEntryRequstEntity extends BaseEntityWithCreateUpdate<PurchasedSubscribeEntryRequstEntity> {

    @Column(name = "referenceId", nullable = false)
    private String referenceId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "EnterUserId")
    private UserEntity requester;


    @ManyToOne(optional = false)
    @JoinColumn(name = "hallId")
    private HallEntity hall;

    @Column(name = "requestDate", nullable = false)
    private Timestamp requestDate;

    @Column(name = "lastUpdateStatusDate", nullable = false)
    private Timestamp lastUpdateStatusDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscribeEntryStatus", nullable = false)
    private SubscribeEntryStatus subscribeEntryStatus;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedSubscribeEntryRequstEntity that = (PurchasedSubscribeEntryRequstEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
