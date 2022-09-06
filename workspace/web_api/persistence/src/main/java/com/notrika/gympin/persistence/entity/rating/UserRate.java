package com.notrika.gympin.persistence.entity.rating;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.User;
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
@Table(name = "user_rate")
public class UserRate extends BaseEntity<UserRate> {

    @ManyToOne
    private User judgerUser;

    @ManyToOne
    private User judgingUser;

    @Column(name = "rate")
    private Float rate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserRate userRate = (UserRate) o;
        return getId() != null && Objects.equals(getId(), userRate.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
