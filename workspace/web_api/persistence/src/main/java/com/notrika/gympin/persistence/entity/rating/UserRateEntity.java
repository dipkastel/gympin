package com.notrika.gympin.persistence.entity.rating;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "userRate")
public class UserRateEntity extends BaseEntity<UserRateEntity> {

    @ManyToOne
    private UserEntity judgerUser;

    @ManyToOne
    private UserEntity judgingUser;

    @Column(name = "rate")
    private Float rate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserRateEntity userRate = (UserRateEntity) o;
        return getId() != null && Objects.equals(getId(), userRate.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
