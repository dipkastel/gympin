package com.notrika.gympin.persistence.entity.homePage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "homePageItem")
public class HomePageItemEntity extends BaseEntity<HomePageItemEntity> {


    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "data")
    private String data;

    @Column(name = "priority")
    private Integer priority;

    @ManyToOne
    @JoinTable(name = "HomeItemDestination", joinColumns = @JoinColumn(name = "homeItemId"), inverseJoinColumns = @JoinColumn(name = "destination_Id"))
    @ToString.Exclude
    private HomePageDestionationEntity destination;

    @Column(name = "type")
    private String type;


    @ManyToOne
    @JoinTable(name = "HomeImage", joinColumns = @JoinColumn(name = "homeItemId"), inverseJoinColumns = @JoinColumn(name = "multimedia_id"))
    @ToString.Exclude
    private MultimediaEntity multimedia;


    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    private HomePageItemEntity parent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<HomePageItemEntity> items;

    @JsonIgnore
    public Set<HomePageItemEntity> getItems() {
        return items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HomePageItemEntity entity = (HomePageItemEntity) o;
        return getId() != null && Objects.equals(getId(), entity.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
