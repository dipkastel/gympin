package com.notrika.gympin.persistence.entity.user;

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
@Table(name = "userPassword")
public class UserPasswordEntity extends BaseEntityWithCreateUpdate<UserPasswordEntity> {

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "passwordUserId")
    private UserEntity user;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "expired")
    private boolean expired;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserPasswordEntity password = (UserPasswordEntity) o;
        return getId() != null && Objects.equals(getId(), password.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
