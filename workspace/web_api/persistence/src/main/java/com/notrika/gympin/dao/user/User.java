package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.UserRoles;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.location.PlaceOwner;
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
@Table(name = "user")
public class User extends BaseEntity {

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserRoles userRoles = UserRoles.USER;

    @Column(unique = true)
    private String username;

    private String phoneNumber;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<PlaceOwner> placeOwners;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;

        return Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return 562048007;
    }
}

