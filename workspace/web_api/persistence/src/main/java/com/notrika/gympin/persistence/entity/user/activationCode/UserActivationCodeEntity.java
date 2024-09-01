package com.notrika.gympin.persistence.entity.user.activationCode;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "userActivationCode")
public class UserActivationCodeEntity extends BaseEntityWithCreateUpdate<UserActivationCodeEntity> {

    //@Column(name = "userId")
    @OneToOne(cascade = CascadeType.ALL)
    private UserEntity user;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "senderId")
    private String senderId;

    @Column(name = "expiredDate", nullable = false)
    private Date expiredDate;

    public UserActivationCodeEntity(UserEntity user, String phoneNumber, String code, String senderId, Date expiredDate) {
        this.user = user;
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.senderId = senderId;
        this.expiredDate = expiredDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserActivationCodeEntity that = (UserActivationCodeEntity) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

