package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.TokenStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "userToken")
public class UserTokenEntity extends BaseEntity<UserTokenEntity> {

    @Enumerated(EnumType.STRING)
    private TokenStatus tokenStatus = TokenStatus.ACTIVE;

    @ManyToOne(cascade = CascadeType.ALL)
    private UserEntity user;

    @Column(updatable = false)
    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expireDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserTokenEntity userToken = (UserTokenEntity) o;

        return Objects.equals(this.getId(), userToken.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

