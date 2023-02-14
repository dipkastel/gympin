package com.notrika.gympin.persistence.entity.user.relation;

import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "changeFollowStatus")
public class FollowChangeStatusEntity extends BaseEntity<FollowChangeStatusEntity> {

    @ManyToOne
    private FollowEntity follow;

    @Column(name = "preStatus")
    @Enumerated(EnumType.STRING)
    private FollowingStatus preStatus;

    @Column(name = "newStatus")
    @Enumerated(EnumType.STRING)
    private FollowingStatus newStatus;

    @Column(name = "changeDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date changeDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FollowChangeStatusEntity that = (FollowChangeStatusEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
