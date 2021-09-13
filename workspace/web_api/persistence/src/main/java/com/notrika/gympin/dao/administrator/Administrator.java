package com.notrika.gympin.dao.administrator;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;
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

    @OneToOne
    private User baseUser;

    @Column(unique = true)
    private String administratorName;

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

