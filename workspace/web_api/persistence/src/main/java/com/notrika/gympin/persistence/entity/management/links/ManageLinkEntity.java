package com.notrika.gympin.persistence.entity.management.links;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageLinks")
public class ManageLinkEntity extends BaseEntityWithCreateUpdate<ManageLinkEntity> {

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "value1")
    private String value1;

    @Column(name = "value2")
    private String value2;

    @Column(name = "value3")
    private String value3;

    @Column(name = "description")
    private String description;

    @Column(nullable = false,name = "isActive", columnDefinition = "boolean default true")
    private Boolean isActive;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageLinkEntity that = (ManageLinkEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
