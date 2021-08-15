package com.notrika.gympin.dao.administrator;

import com.notrika.gympin.common.user.enums.AdminRoles;
import com.notrika.gympin.dao.BaseEntity;
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
@Table(name = "administrator")
public class Administrator extends BaseEntity {

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private AdminRoles administratorRoles = AdminRoles.ADMIN;

    @Column(unique = true)
    private String administratorname;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Administrator that = (Administrator) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return 1785962647;
    }
}

