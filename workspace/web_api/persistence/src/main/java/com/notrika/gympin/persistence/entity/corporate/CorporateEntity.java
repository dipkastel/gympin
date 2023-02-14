package com.notrika.gympin.persistence.entity.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateTransactionTypesEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.location.LocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "corporate")
public class CorporateEntity extends BaseEntityWithCreateUpdate<CorporateEntity> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CorporateStatusEnum status;

    @Column(name = "address")
    private String address;

    @Column(name = "balance", nullable = false, columnDefinition = "BigDecimal default 0")
    private BigDecimal Balance;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private LocationEntity location;

    @OneToOne
    @ToString.Exclude
    private MultimediaEntity logo;

    @OneToMany(mappedBy = "corporate")
    @ToString.Exclude
    private List<NoteEntity> Comments;

    @OneToMany(mappedBy = "corporate")
    @ToString.Exclude
    private List<CorporatePersonnelEntity> personnel;

    @OneToMany(mappedBy = "corporate")
    @ToString.Exclude
    private List<TransactionEntity> transactions;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporateEntity place = (CorporateEntity) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
