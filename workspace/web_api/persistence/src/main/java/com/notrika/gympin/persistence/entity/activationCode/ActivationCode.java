package com.notrika.gympin.persistence.entity.activationCode;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.User;
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
@Table(name = "activation_code")
public class ActivationCode extends BaseEntity {

    //@Column(name = "user_id")
    @OneToOne
    private User user;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "code")
    private String code;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "expired_date")
    private Date expiredDate;

    public ActivationCode(User user, String phoneNumber, String code, String senderId, Date expiredDate) {
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
        ActivationCode that = (ActivationCode) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return 137237553;
    }
}
