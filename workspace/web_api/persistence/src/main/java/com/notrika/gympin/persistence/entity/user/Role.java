package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.BaseEntity;
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
@Table(name = "role")
public class Role extends BaseEntity {

    @Column(updatable = false,name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @ToString.Exclude
    //@ManyToMany//(cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id",nullable = false)
    @ManyToMany(mappedBy = "userRole")
    private List<User> users;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Role role = (Role) o;
        return getId() != null && Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
