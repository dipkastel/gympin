package com.notrika.gympin.persistence.entity.finance.gateway;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "financeGateway")
public class FinanceGatewayEntity extends BaseEntityWithCreateUpdate<FinanceGatewayEntity> {


    @OneToMany(mappedBy = "gateway", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private List<FinanceApplicationGatewayEntity> applicationGateway;

    @Column(name = "name")
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private MultimediaEntity gatewayImage;

    @Column(name = "gatewayType")
    @Enumerated(EnumType.STRING)
    private GatewayType gatewayType;

    @Column(name = "description")
    private String description;

    @Column(name = "password")
    private String password;

    @Column(name = "token")
    private String token;

    @Column(name = "serial")
    private String serial;

    @Column(name = "data1")
    private String data1;

    @Column(name = "data2")
    private String data2;

    @Column(name = "data3")
    private String data3;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceGatewayEntity that = (FinanceGatewayEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
