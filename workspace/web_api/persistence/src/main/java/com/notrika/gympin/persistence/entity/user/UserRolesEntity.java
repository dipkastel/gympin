package com.notrika.gympin.persistence.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
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
@Table(name = "userRoles")
public class UserRolesEntity extends BaseEntityWithCreateUpdate<UserRolesEntity> {


    @Column(name = "userRole", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @ManyToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserRolesEntity role = (UserRolesEntity) o;
        return getId() != null && Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
