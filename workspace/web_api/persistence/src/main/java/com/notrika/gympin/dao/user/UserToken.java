package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.TokenStatus;
import com.notrika.gympin.dao.BaseEntity;
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
@Table(name = "user_token")
public class UserToken extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private TokenStatus tokenStatus = TokenStatus.ACTIVE;

    @ManyToOne
    private User user;

    @Column(updatable = false)
    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expireDate;


    @Override
    public void setUpdatedDate(Date UpdatedDate) {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserToken userToken = (UserToken) o;

        return Objects.equals(this.getId(), userToken.getId());
    }

    @Override
    public int hashCode() {
        return 424275703;
    }
}

