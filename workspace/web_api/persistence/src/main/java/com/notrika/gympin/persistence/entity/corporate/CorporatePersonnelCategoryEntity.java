package com.notrika.gympin.persistence.entity.corporate;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "corporatePersonelCategory")
public class CorporatePersonnelCategoryEntity extends BaseEntityWithCreateUpdate<CorporatePersonnelCategoryEntity> {

    @Column(name = "category_name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporate_id")
    private CorporateEntity corporate;

    @OneToMany(mappedBy = "PersonnelCategory")
    @ToString.Exclude
    private List<CorporatePersonnelEntity> personels;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporatePersonnelCategoryEntity that = (CorporatePersonnelCategoryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
