package com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "purchasedSubscribeEntry")
public class PurchasedSubscribeEntryEntity extends BaseEntityWithCreateUpdate<PurchasedSubscribeEntryEntity> {

    @ManyToOne(optional = false)
    @JoinColumn(name = "purchasedSubscribeId")
    private PurchasedSubscribeEntity purchasedSubscribe;

    @ManyToOne
    @JoinColumn(name = "acceptUserId")
    private UserEntity acceptedBy;

    @Column(name = "enterDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date enterDate;

    @Column(name = "exitDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date exitDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscribeEntryStatus", nullable = false)
    private SubscribeEntryStatus subscribeEntryStatus;

    @OneToMany(mappedBy = "subscribeEntry", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<PurchasedSubscribeMessageEntity> messages;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedSubscribeEntryEntity that = (PurchasedSubscribeEntryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
