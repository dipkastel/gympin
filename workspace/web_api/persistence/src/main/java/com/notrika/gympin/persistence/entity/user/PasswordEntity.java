package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.persistence.entity.BaseEntity;
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
@Table(name = "password")
public class PasswordEntity extends BaseEntity<PasswordEntity> {

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private UserEntity user;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "expired")
    private boolean expired;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PasswordEntity password = (PasswordEntity) o;
        return getId() != null && Objects.equals(getId(), password.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
