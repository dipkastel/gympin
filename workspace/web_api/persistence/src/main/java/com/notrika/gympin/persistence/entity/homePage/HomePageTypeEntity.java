package com.notrika.gympin.persistence.entity.homePage;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.gympin.homePage.enums.HomePageElementsEnum;
import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "homePageType")
public class HomePageTypeEntity extends BaseEntity<HomePageTypeEntity> {

    @JsonProperty("name")
    private String name;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("canBeParent")
    private Boolean canBeParent;


    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    Collection<HomePageElementsEnum> elements;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HomePageTypeEntity entity = (HomePageTypeEntity) o;
        return getId() != null && Objects.equals(getId(), entity.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
