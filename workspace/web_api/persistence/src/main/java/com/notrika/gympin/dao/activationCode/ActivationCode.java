package com.notrika.gympin.dao.activationCode;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;
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
@Table(name = "activation_code")
public class ActivationCode extends BaseEntity {

    //@Column(name = "user_id")
    @ManyToOne
    private User user;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "code")
    private String code;

    @Column(name = "sender_id")
    private String senderId;

    public ActivationCode(User user, String phoneNumber, String code, String senderId) {
        this.user = user;
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.senderId = senderId;
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

