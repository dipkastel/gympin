package com.notrika.gympin.persistence.entity.management.gifts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageGiftCredit")
public class ManageGiftCreditEntity extends BaseEntityWithCreateUpdate<ManageGiftCreditEntity> {


    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "registerCode")
    private String registerCode;

    @Column(nullable = false,name = "canRegister")
    private Boolean canRegister;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "expireDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expireDate;

    @Column(name = "creditExpireDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creditExpireDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private GiftCreditStatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageGiftCreditEntity that = (ManageGiftCreditEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
