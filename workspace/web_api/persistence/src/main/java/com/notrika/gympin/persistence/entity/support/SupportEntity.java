package com.notrika.gympin.persistence.entity.support;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "support")
public class SupportEntity extends BaseEntityWithCreateUpdate<SupportEntity> {

    @OneToMany(mappedBy = "support")
   @JsonIgnore
@ToString.Exclude
    private List<SupportMessagesEntity> supportMessages;

    @Column(name = "supportStatus")
    @Enumerated(EnumType.STRING)
    private SupportStatus supportStatus;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "supportPlaceId")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "supportUserId")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "CorporateId")
    private CorporateEntity corporate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SupportEntity that = (SupportEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
