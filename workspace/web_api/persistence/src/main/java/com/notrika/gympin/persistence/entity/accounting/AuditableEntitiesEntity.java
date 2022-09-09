package com.notrika.gympin.persistence.entity.accounting;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "auditable_entities")
public class AuditableEntitiesEntity<T> extends BaseEntityWithCreateUpdate<T> {

    @OneToMany
    @ToString.Exclude
    private List<AccountEntity> accounts;

}
