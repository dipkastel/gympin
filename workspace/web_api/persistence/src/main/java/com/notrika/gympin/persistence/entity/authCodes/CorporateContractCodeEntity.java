package com.notrika.gympin.persistence.entity.authCodes;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
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
@Table(name = "corporateContractCode")
public class CorporateContractCodeEntity extends BaseEntityWithCreateUpdate<CorporateContractCodeEntity> {

    //@Column(name = "userId")
    @OneToOne(cascade = CascadeType.ALL)
    private CorporateEntity corporate;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "senderId")
    private String senderId;

    @Column(name = "expiredDate", nullable = false)
    private Date expiredDate;

    public CorporateContractCodeEntity(CorporateEntity corporate, String phoneNumber, String code, String senderId, Date expiredDate) {
        this.corporate = corporate;
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.senderId = senderId;
        this.expiredDate = expiredDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporateContractCodeEntity that = (CorporateContractCodeEntity) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

