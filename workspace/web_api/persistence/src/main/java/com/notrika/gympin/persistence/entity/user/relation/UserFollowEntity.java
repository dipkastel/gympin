package com.notrika.gympin.persistence.entity.user.relation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.user.relation.enums.FollowingStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "userFollow")
public class UserFollowEntity extends BaseEntityWithCreateUpdate<UserFollowEntity> {

    @ManyToOne
    @JoinColumn(name = "requesterUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity requesterUser;

    @ManyToOne
    @JoinColumn(name = "requestedUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity requestedUser;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private FollowingStatus status;

    @OneToMany(mappedBy = "follow", fetch = FetchType.LAZY)
    @Column(name = "changeFollowStatus")
    @JsonIgnore
    @ToString.Exclude
    private List<UserFollowChangeStatusEntity> followChangeStatus;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserFollowEntity that = (UserFollowEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
