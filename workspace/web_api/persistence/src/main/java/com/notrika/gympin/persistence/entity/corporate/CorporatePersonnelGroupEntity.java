package com.notrika.gympin.persistence.entity.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "corporatePersonelGroup")
public class CorporatePersonnelGroupEntity extends BaseEntityWithCreateUpdate<CorporatePersonnelGroupEntity> {

    @Column(name = "Group_name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporateId")
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;

    @OneToMany(mappedBy = "personnelGroup",fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private List<CorporatePersonnelEntity> personels;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporatePersonnelGroupEntity that = (CorporatePersonnelGroupEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
